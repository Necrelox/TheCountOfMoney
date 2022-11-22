/**
 * Local Modules
 */
import { IToken } from './IToken';
import { IUser } from './IUser';

/**
 * TABLE NAME: USER_TOKEN FOREIGN KEY USER
 */
export interface ITokenFKUser extends IToken, IUser {}
