/**
 * Local modules
 */
import { IUser } from './IUser';
import { IReport } from './IReport';

/**
 * TABLE NAME: USER_REPORT FOREIGN KEY USER
 */
export interface IReportFKUser extends IReport, IUser {}
