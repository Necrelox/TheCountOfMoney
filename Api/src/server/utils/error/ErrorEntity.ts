export enum MessageError {
    CLIENT_TOKEN_NOT_GIVEN = 'Token not given',
    CLIENT_TOKEN_EXPIRED = 'Token expired.',
    CLIENT_TOKEN_INVALID_SIGNATURE = 'Token invalid signature.',
    CLIENT_TOKEN_NOT_FOUND = 'Token not found.',
    CLIENT_TOKEN_FK_USER_NOT_FOUND = 'Token foreign key user not found.',
    CLIENT_PERMISSION_DENIED = 'Permission denied.',
    CLIENT_EMAIL_BAD_SYNTAX = 'Email has bad syntax.',
    CLIENT_EMAIL_IS_TEMPORARY = 'Email is temporary mail.',
    CLIENT_USER_IS_BLACKLISTED = 'User is blacklisted.',
    CLIENT_USER_NOT_FOUND = 'User not found.',
    CLIENT_USER_INVALID_PASSWORD = 'Invalid password.',
    SERVER_ROLE_NOT_FOUND = 'Role not found.',
    SERVER_INTERNAL_ERROR = 'Internal Server error.',
    SERVER_DATABASE_ERROR = 'Database error.',
    CLIENT_PASSWORD_IS_THE_SAME = 'Password is the same.',
}

export class ErrorEntity extends Error {
    /**
     * The code of the error
     * @type number
     */
    private readonly code: number;
    /**
     * Collection of error messages
     */
    private readonly MessageAndCode = {
        [MessageError.CLIENT_TOKEN_NOT_GIVEN]: 400,
        [MessageError.CLIENT_TOKEN_EXPIRED]: 400,
        [MessageError.CLIENT_TOKEN_INVALID_SIGNATURE]: 400,
        [MessageError.CLIENT_TOKEN_NOT_FOUND]: 400,
        [MessageError.CLIENT_TOKEN_FK_USER_NOT_FOUND]: 400,
        [MessageError.CLIENT_PERMISSION_DENIED]: 403,
        [MessageError.CLIENT_EMAIL_BAD_SYNTAX]: 400,
        [MessageError.CLIENT_EMAIL_IS_TEMPORARY]: 400,
        [MessageError.CLIENT_USER_IS_BLACKLISTED]: 403,
        [MessageError.CLIENT_USER_NOT_FOUND]: 500,
        [MessageError.CLIENT_USER_INVALID_PASSWORD]: 400,
        [MessageError.SERVER_ROLE_NOT_FOUND]: 500,
        [MessageError.SERVER_INTERNAL_ERROR]: 500,
        [MessageError.SERVER_DATABASE_ERROR]: 500,
        [MessageError.CLIENT_PASSWORD_IS_THE_SAME]: 400,
    };

    private static createBetterSqlMessageError(sqlCode: string, sqlMessage: string): string {
        if (sqlCode === 'ER_DUP_ENTRY') {
            const messageSplit = sqlMessage.split('\'');
            const value = messageSplit[1];
            const column = (messageSplit[3]?.split('.')[1])?.split('_')[0];
            return `This ${column} : ${value} is already used.`;
        }
        return sqlMessage;
    }

    /**
     * Create an error manager
     * @param message
     * @param sqlMessage
     * @param sqlCode
     */
    constructor(message: MessageError, sqlMessage?: string, sqlCode?: string) {
        super(message);
        this.code = this.MessageAndCode[message];
        if (sqlMessage && sqlCode)
            this.message = ErrorEntity.createBetterSqlMessageError(sqlCode.toString(), sqlMessage);

    }

    public getCode(): number {
        return this.code;
    }

    public getMessage(): string {
        return this.message;
    }
}
