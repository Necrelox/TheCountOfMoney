/**
 * Local modules
 */
import { IIP } from './IIP';
import { IUser } from './IUser';

/**
 * TABLE NAME: USER_IP FOREIGN KEY USER
 */
export interface IIPFKUser extends IIP, IUser {}
