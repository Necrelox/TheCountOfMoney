/**
 * Local Modules
 */
import { randomBytes, scryptSync } from 'crypto';
import { ErrorEntity, MessageError } from '@/utils';


/**
 * PasswordEncrypt class : is the class that encrypt password
 */
export class PasswordEncrypt {

    /**
     * Encrypt password with scryptSync using salt and keylen 128
     * @param password
     */
    public static encrypt(password: string): Buffer {
        const salt: Buffer = randomBytes(32);
        const hash: Buffer = scryptSync(password, salt, 128);
        return Buffer.concat([salt, hash]);
    }

    /**
     * Check if password is correct
     * @param password
     * @param hashedPassword
     */
    public static verifyPassword(password: string, hashedPassword: Buffer) {
        const salt: Buffer = hashedPassword.subarray(0, 32);
        const hash: Buffer = hashedPassword.subarray(32, 160);
        const newBuff: Buffer = scryptSync(password, salt, 128);
        if (!(hash.compare(newBuff) === 0))
            throw new ErrorEntity(MessageError.CLIENT_USER_INVALID_PASSWORD);
    }
}
