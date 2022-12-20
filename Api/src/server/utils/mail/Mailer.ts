/**
 * Local Modules
 */
import emailTempo from './emailTempo.json';

/**
 * Dependencies
 */
import { ErrorEntity, MessageError } from '@/utils';

export class Mailer {
    public static async checkEmailIsTemporary(email: string) {
        if (emailTempo.includes(email.split('@')[1] as string))
            throw new ErrorEntity(MessageError.CLIENT_EMAIL_IS_TEMPORARY);
    }
}


