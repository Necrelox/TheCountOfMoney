import { DatabaseKnex, Transaction, ErrorDatabase } from '../../DatabaseKnex';
import { MessageError } from '../../../../enum/messageError';
import { IDevice, IIP, IMacAddress, IToken, IUser, IRole } from '../../../../models';
import { Token, User, History, Ip, MacAddress, Device, Role, URole } from '../../../';
import { PasswordEncrypt, Token as tokenTools } from '../../../../tools';

export class AccountControllerQueries {

    /**
     * Add or update the ip of the user
     * @param ipReflect
     * @param trx
     */
    private static async addOrUpdateIpTransaction(ipReflect: Pick<IIP, 'ip' | 'active' | 'userUuid'>, trx: Transaction) {
        const [ipUser]: Pick<IIP, 'ip'>[] = await Ip.transactionGet({
            ip: ipReflect.ip,
        }, {
            ip: true
        }, trx);
        if (!ipUser) {
            await Ip.transactionCreate(ipReflect, trx);
        } else {
            await Ip.transactionUpdate({ active: true }, {
                ip: ipReflect.ip,
            }, trx);
        }
    }

    /**
     * Add or update the mac address of the user
     * @param macAddressReflect
     * @param trx
     */
    private static async addMacAddressOrUpdateTransaction(macAddressReflect: Partial<IMacAddress>, trx: Transaction) {
        const [macAddressUser]: Pick<IMacAddress, 'macAddress'>[] = await MacAddress.transactionGet({
            macAddress: macAddressReflect.macAddress,
        }, {
            macAddress: true
        }, trx);
        if (!macAddressUser) {
            await MacAddress.transactionCreate(macAddressReflect, trx);
        } else {
            await MacAddress.transactionUpdate({ active: true }, {
                macAddress: macAddressReflect.macAddress,
            }, trx);
        }
    }

    /**
     * Add or update the device of the user
     * @param deviceReflect
     * @param trx
     */
    private static async addDeviceOrUpdateTransaction(deviceReflect: Partial<IDevice>, trx: Transaction) {
        const [deviceUser]: Pick<IDevice, 'device'>[] = await Device.transactionGet({
            device: deviceReflect.device,
            userUuid: deviceReflect.userUuid,
        }, {
            device: true
        }, trx);
        if (!deviceUser) {
            await Device.transactionCreate(deviceReflect, trx);
        } else {
            await Device.transactionUpdate({ active: true }, {
                device: deviceReflect.device,
                userUuid: deviceReflect.userUuid,
            }, trx);
        }
    }

    /**
     * Create a new user and return the token
     * @param userReflect
     */
    public static async createAccountTransaction(userReflect: Pick<IUser, 'email' | 'username' | 'password'>) {
        return DatabaseKnex.getInstance().transaction(async (trx: Transaction) => {
            await User.transactionCreate({
                username: userReflect.username,
                email: userReflect.email,
                password: userReflect.password,
            }, trx);
            const [user]: Pick<IUser, 'uuid'>[] = await User.transactionGet({
                email: userReflect.email,
                username: userReflect.username,
            }, {
                uuid: true
            }, trx);
            if (!user)
                throw {
                    code: 500,
                    message: MessageError.USER_NOT_FOUND
                };
            const [role]: Pick<IRole, 'id'>[] = await Role.transactionGet({
                name: 'guest'
            }, {
                id: true
            }, trx);
            if (!role)
                throw {
                    code: 500,
                    message: MessageError.ROLE_NOT_FOUND
                };
            await Promise.all([
                URole.transactionCreate({
                    roleId: role.id,
                    userUuid: user.uuid,
                }, trx),
                History.transactionCreate({
                    log: `Account created successfully, for user: ${userReflect.username}`,
                    userUuid: user.uuid,
                }, trx),
            ]);
        }).catch((err: ErrorDatabase) => {
            const message = DatabaseKnex.createBetterSqlMessageError(err?.code as string, err?.sqlMessage as string) ?? err?.message;
            throw {
                code: typeof err.code === 'number' ? err.code : 500,
                message,
            };
        });
    }

    /**
     * Login the user and return the token
     * @param userReflect
     * @param password
     * @param cli
     * @returns Promise<Pick<IToken, 'token' | 'expireAt'>>
     */
    public static async loginAndGetTokenTransaction(
        userReflect: Pick<IUser, 'email' | 'username' | 'password'>,
        password: string,
        cli: { ip: string, macAddress: string, device: string } | undefined = undefined): Promise<Pick<IToken, 'token' | 'expireAt'>> {
        return DatabaseKnex.getInstance().transaction(async (trx: Transaction) => {
            const [user]: Pick<IUser, 'username' | 'password' | 'isBlackListed' | 'uuid'>[] = await User.get(
                userReflect.username ? { username: userReflect.username } : { email: userReflect.email }, {
                    username: true,
                    password: true,
                    isBlackListed: true,
                    uuid: true,
                });
            if (!user)
                throw {
                    code: 500,
                    message: MessageError.USER_NOT_FOUND
                };
            PasswordEncrypt.verifyPassword(password, user.password);

            if (user.isBlackListed)
                throw {
                    code: 403,
                    message: MessageError.USER_IS_BLACKLISTED
                };

            if (cli !== undefined) {
                // Add or update the ip, mac address and device of the user
                await Promise.all([
                    this.addOrUpdateIpTransaction({
                        ip: cli.ip,
                        userUuid: user.uuid,
                        active: true,
                    }, trx),
                    this.addMacAddressOrUpdateTransaction({
                        macAddress: cli.macAddress,
                        userUuid: user.uuid,
                        active: true,
                    }, trx),
                    this.addDeviceOrUpdateTransaction({
                        device: cli.device,
                        userUuid: user.uuid,
                        active: true,
                    }, trx)
                ]);
            }

            // Update the user to isConnected = true and Delete all the tokens of the user
            await Promise.all([
                User.transactionUpdate({
                    isConnected: true
                }, {
                    uuid: user.uuid,
                }, trx),
                Token.transactionDelete({
                    userUuid: user.uuid,
                }, trx)
            ]);

            const expireAt = new Date(Date.now() + (1000 * 60 * 60));
            const tokenGenerated: Pick<IToken, 'token' | 'salt'> = await tokenTools.generateToken(user, expireAt);

            await Promise.all([
                Token.transactionCreate({
                    token: tokenGenerated.token,
                    salt: tokenGenerated.salt,
                    userUuid: user.uuid,
                    expireAt,
                }, trx),
                History.transactionCreate({
                    log: `User: ${userReflect.username} logged in successfully`,
                    userUuid: user.uuid,
                }, trx),
            ]);
            return {
                token: tokenGenerated.token,
                expireAt,
            };
        })
            .then((token: Pick<IToken, 'token' | 'expireAt'>) => token)
            .catch((err: ErrorDatabase) => {
                const message = DatabaseKnex.createBetterSqlMessageError(err?.code as string, err?.sqlMessage as string) ?? err?.message;
                throw {
                    code: typeof err.code === 'number' ? err.code : 500,
                    message,
                };
            });
    }

    public static async logoutUserTransaction(bearerToken: string) {
        return (await DatabaseKnex.getInstance()).transaction(async (trx: Transaction) => {
            const [token]: Pick<IToken, 'userUuid'>[] = await Token.transactionGet({
                token: bearerToken,
            }, {
                userUuid: true,
            }, trx);
            if (!token)
                throw {
                    code: 500,
                    message: MessageError.TOKEN_NOT_FOUND
                };

            await Promise.all([
                User.transactionUpdate({
                    isConnected: false
                }, {
                    uuid: token.userUuid
                }, trx),
                Ip.transactionUpdate({
                    active: false
                }, {
                    userUuid: token.userUuid,
                    active: true,
                }, trx),
                Device.transactionUpdate({
                    active: false
                }, {
                    userUuid: token.userUuid,
                    active: true,
                }, trx),
                MacAddress.transactionUpdate({
                    active: false
                }, {
                    userUuid: token.userUuid,
                    active: true,
                }, trx),
                Token.transactionDelete({
                    userUuid: token.userUuid
                }, trx)
            ]);
            await History.transactionCreate({
                log: 'User logged out successfully',
                userUuid: token.userUuid,
            }, trx);
        }).catch((err: ErrorDatabase) => {
            const message = DatabaseKnex.createBetterSqlMessageError(err?.code as string, err?.sqlMessage as string) ?? err?.message;
            throw {
                code: typeof err.code === 'number' ? err.code : 500,
                message,
            };
        });
    }


}
