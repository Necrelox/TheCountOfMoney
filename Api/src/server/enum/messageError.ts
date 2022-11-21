export enum MessageError {

    TOKEN_NOT_GIVEN = 'Token not given',
    TOKEN_EXPIRED = 'Token expired.',
    TOKEN_INVALID_SIGNATURE = 'Token invalid signature.',
    TOKEN_NOT_FOUND = 'Token not found.',
    TOKEN_FK_USER_NOT_FOUND = 'Token foreign key user not found.',

    /** EMAIL */
    EMAIL_BAD_SYNTAX = 'Email has bad syntax.',
    EMAIL_IS_TEMPORARY = 'Email is temporary mail.',

    /** USER */
    USER_IS_BLACKLISTED = 'User is blacklisted.',
    USER_NOT_FOUND = 'User not found.',
    USER_INVALID_PASSWORD = 'Invalid password.',

    /** ACTIVITY */

    /** BODY */


}
