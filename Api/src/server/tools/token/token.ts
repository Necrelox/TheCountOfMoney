import { createHmac, randomBytes } from 'crypto';
import { IToken, IURoleFKRoleFKRoleModuleFKModule, IUser } from '../../models';
import { URole } from '../../services';

export class Token {
    public static async generateToken(user: Pick<IUser, 'uuid' | 'username'>, expireAt: Date): Promise<Pick<IToken, 'token' | 'salt'>> {
        const header: string = Buffer.from(JSON.stringify({
            alg: 'sha512',
            exp: expireAt,
        })).toString('base64');

        let rawRolePermission: Pick<IURoleFKRoleFKRoleModuleFKModule, 'name' | 'moduleName'>[] = await URole.getFKRoleFKRoleModuleFKModule({
            userUuid: user.uuid
        }, {
            name: true,
            moduleName: true
        });
        const sanitizeRolePermission: { [key: string]: string[] } = {};

        while (rawRolePermission.length > 0) {
            const element: Pick<IURoleFKRoleFKRoleModuleFKModule, 'name' | 'moduleName'> = rawRolePermission[0] ? rawRolePermission[0] : { name: '', moduleName: '' };
            const tmp: Pick<IURoleFKRoleFKRoleModuleFKModule, 'name' | 'moduleName'>[] =
                rawRolePermission.filter((e: Pick<IURoleFKRoleFKRoleModuleFKModule, 'name' | 'moduleName'>) => e.name === element.name);
            sanitizeRolePermission[element.name] = tmp.map((e: Pick<IURoleFKRoleFKRoleModuleFKModule, 'name' | 'moduleName'>) => e.moduleName);
            rawRolePermission = rawRolePermission.filter((e: Pick<IURoleFKRoleFKRoleModuleFKModule, 'name' | 'moduleName'>) => e.name !== element.name);
        }

        const payload: string = Buffer.from(JSON.stringify({
            username: user.username,
            permissions: sanitizeRolePermission,
        })).toString(   'base64');
        const saltSignature: Buffer = randomBytes(128);
        const signature: string = createHmac('sha512', saltSignature)
            .update(header + payload)
            .digest('hex');
        return {
            token: header + '.' + payload + '.' + signature,
            salt: saltSignature,
        };
    }

    public static signatureChecker(token: string, salt: Buffer): boolean {
        const [header, body, signature]: string[] = token.split('.');
        if (!header || !body || !signature)
            return false;
        return createHmac('sha512', salt)
            .update(header + body)
            .digest('hex') === signature;
    }
}
