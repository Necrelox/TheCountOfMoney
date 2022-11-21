/**
 * Local Modules
 */
import { IRoomMessageFile } from './IRoomMessageFile';
import { IRoomMessage } from './IRoomMessage';

/**
 * TABLE NAME: ROOM_MESSAGE_FILE FOREIGN KEY ROOM_MESSAGE
 */
export interface IRoomMessageFileFKRoomMessage extends IRoomMessageFile, IRoomMessage {}
