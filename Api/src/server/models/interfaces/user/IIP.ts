/**
 * TABLE NAME: USER_IP
 */
export interface IIP {
    ip: string;
    createdAt: Date;
    active: boolean;
    userUuid: Buffer;
    uuid: Buffer;
}
