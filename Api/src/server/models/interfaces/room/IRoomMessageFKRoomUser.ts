/**
 * Local Modules
 */
import { IRoomMessage } from './IRoomMessage';
import { IRoomUser } from './IRoomUser';

/**
 * TABLE NAME: ROOM_MESSAGE FOREIGN KEY ROOM_USER
 */
export interface IRoomMessageFKRoomUser extends IRoomMessage, IRoomUser {}
