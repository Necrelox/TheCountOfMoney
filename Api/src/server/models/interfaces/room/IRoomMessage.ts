/**
 * TABLE NAME: ROOM_MESSAGE
 */
export interface IRoomMessage {
    message: string;
    createdAt: Date;
    roomUserUuid: Buffer;
    uuid: Buffer;
}
