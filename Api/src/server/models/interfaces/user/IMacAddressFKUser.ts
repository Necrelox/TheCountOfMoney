/**
 * Local modules
 */
import { IUser } from './IUser';
import { IMacAddress } from './IMacAddress';

/**
 * TABLE NAME: USER_MAC_ADDRESS FOREIGN KEY USER
 */
export interface IMacAddressFKUser extends IMacAddress, IUser {}
