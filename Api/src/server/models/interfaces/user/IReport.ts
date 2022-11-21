/**
 * TABLE NAME: USER_REPORT
 */
export interface IReport {
    createdAt: Date;
    reason: string;
    userSendReport: Buffer;
    userReported: Buffer;
    uuid: Buffer;
}
