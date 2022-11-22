/**
 * TABLE NAME: USER_HISTORY
 */
export interface IHistory {
    log: string;
    createdAt: Date;
    userUuid: Buffer;
    uuid: Buffer;
}
