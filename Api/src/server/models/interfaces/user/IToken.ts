/**
 * TABLE NAME: USER_TOKEN
 */
export interface IToken {
    createdAt: Date;
    expireAt: Date;
    salt: Buffer;
    token: string;
    userUuid: Buffer;
    uuid: Buffer;
}
