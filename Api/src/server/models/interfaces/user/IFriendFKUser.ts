/**
 * Local modules
 */
import { IFriend } from './IFriend';
import { IUser } from './IUser';

/** TABLE: USER_FRIEND FOREIGN KEY USER */
export interface IFriendFKUser extends IFriend, IUser {}
