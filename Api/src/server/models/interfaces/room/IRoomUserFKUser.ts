/**
 * Local Modules
 */
import { IRoomUser } from './IRoomUser';
import { IUser } from '../user';

/**
 * TABLE NAME: ROOM_USER FOREIGN KEY USER
 */
export interface IRoomUserFKUser extends IRoomUser, IUser {}
