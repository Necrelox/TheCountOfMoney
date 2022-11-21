/**
 * TABLE NAME: USER
 */
export interface IUser {
    email: string;
    username: string;
    password: Buffer;
    activityMessage: string;
    isConnected: boolean;
    isBlackListed: boolean;
    createdAt: Date;
    uuid: Buffer;
}
