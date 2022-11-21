/** TABLE: USER_FRIEND */
export interface IFriend {
    createdAt: Date;
    acceptedAt: Date;
    isAccepted: boolean;
    user: Buffer;
    friend: Buffer;
    uuid: Buffer;
}
