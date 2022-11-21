/**
 * TABLE NAME: ROOM_USER
 */
export interface IRoomUser {
    createdAt: Date;
    isRoomMaster: boolean;
    userUuid: Buffer;
    roomUuid: Buffer;
    uuid: Buffer;
}
