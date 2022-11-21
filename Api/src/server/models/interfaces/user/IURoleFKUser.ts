/**
 * Local Modules
 */
import { IURole } from './IURole';
import { IUser } from './IUser';

/**
 * TABLE NAME: USER_ROLE FOREIGN KEY USER
 */
export interface IURoleFKUser extends IURole, IUser {}
