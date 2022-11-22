/**
 * Local Modules
 */
import { IURole } from './IURole';
import { IRole } from '../permission';

/**
 * TABLE NAME: USER_ROLE FOREIGN KEY ROLE
 */
export interface IURoleFKRole extends IURole, IRole {}
