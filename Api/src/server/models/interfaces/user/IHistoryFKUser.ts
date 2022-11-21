/**
 * Local modules
 */
import { IHistory } from './IHistory';
import { IUser } from './IUser';

/**
 * TABLE NAME: USER_HISTORY FOREIGN KEY USER
 */
export interface IHistoryFKUser extends IHistory, IUser {}
