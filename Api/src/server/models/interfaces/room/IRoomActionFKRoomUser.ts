/**
 * Local Modules
 */
import { IRoomAction } from './IRoomAction';
import { IRoomUser } from './IRoomUser';

/**
 * TABLE NAME: ROOM_ACTION FOREIGN KEY ROOM_USER
 */
export interface IRoomActionFKRoomUser extends IRoomAction, IRoomUser {}
