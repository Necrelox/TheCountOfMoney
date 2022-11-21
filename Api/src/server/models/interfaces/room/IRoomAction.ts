/**
 * TABLE NAME: ROOM_ACTION
 */
export interface IRoomAction {
    createdAt: Date;
    action: string;
    roomUserUuid: Buffer;
    uuid: Buffer;
}
