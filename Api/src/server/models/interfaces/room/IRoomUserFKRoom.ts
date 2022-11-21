/**
 * Local Modules
 */
import { IRoomUser } from './IRoomUser';
import { IRoom } from './IRoom';

/**
 * TABLE NAME: ROOM_USER FOREIGN KEY ROOM
 */
export interface IRoomUserFKRoom extends IRoomUser, IRoom {}
