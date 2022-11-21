export interface IRoomMessageFile {
    path: string;
    seed: number;
    createdAt: Date;
    sizeMo: number;
    roomMessageUuid: Buffer;
    uuid: Buffer;
}
