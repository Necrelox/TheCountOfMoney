/**
 * Local modules
 */
import { ILogo } from './ILogo';
import { IUser } from './IUser';

/**
 * TABLE NAME: USER_LOGO FOREIGN KEY USER
 */
export interface ILogoFKUser extends ILogo, IUser {}
