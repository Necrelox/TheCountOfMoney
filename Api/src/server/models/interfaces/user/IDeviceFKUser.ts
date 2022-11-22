/**
 * Local modules
 */
import { IDevice } from './IDevice';
import { IUser } from './IUser';

/**
 * TABLE NAME: USER_DEVICE FOREIGN KEY USER
 */
export interface IDeviceFKUser extends IDevice, IUser {}
