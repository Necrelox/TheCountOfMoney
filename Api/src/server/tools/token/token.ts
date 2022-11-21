import { createHmac, randomBytes } from 'crypto';
import { IToken, IUser } from '../../models';
import { URole } from '../../services';

export class Token {
    public static async generateToken(user: Pick<IUser, 'uuid' | 'username'>, expireAt: Date): Promise<Pick<IToken, 'token' | 'salt'>> {
        const header: string = Buffer.from(JSON.stringify({
            alg: 'sha512',
            exp: expireAt,
        })).toString('base64');

        const payload: string = Buffer.from(JSON.stringify({
            username: user.username,
            permissions: await URole.getFKRoleFKRoleModuleFKModule({ userUuid: user.uuid }, { name: true, url: true }),
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
