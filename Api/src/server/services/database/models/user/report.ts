/**
 * Local Modules
 */
import { DatabaseKnex, ErrorDatabase, Transaction } from '../../DatabaseKnex';
import { IReport, IReportFKUser } from '../../../../models';
import { transformColumnsToArray } from '../columnSelectorBuilder';
import { IColumnsUser, tableName as userTable } from './user';

/**
 * IColumnReport
 */
export interface IColumnsReport {
    createdAt: boolean | string;
    reason: boolean;
    userSendReport: boolean;
    userReported: boolean;
    uuid: boolean | string;
}

/**
 * IColumnReportFKUser
 */
export interface IColumnsReportFKUser extends IColumnsReport, IColumnsUser {}

/**
 * Table Name
 */
export const tableName = 'USER_REPORT';

/**
 * Report class : is the class that contains the queries for the table USER_REPORT
 */
export class Report {
    /**
     * Get Report
     * @param reportReflectToFind
     * @param columns
     * @return Promise<IReport[]>
     */
    public static async get(reportReflectToFind: Partial<IReport>, columns: Partial<IColumnsReport>) : Promise<IReport[]> {
        return DatabaseKnex.getInstance()
            .select(transformColumnsToArray(columns))
            .where(reportReflectToFind).from(tableName)
            .then((rows: IReport[]) => rows)
            .catch((err: ErrorDatabase) => {
                throw {
                    code: err?.code,
                    message: DatabaseKnex.createBetterSqlMessageError(err?.code as string, err?.sqlMessage as string),
                    sql: err?.sql,
                };
            });
    }

    /**
     * Get Report FK User
     * @param reportReflectToFind
     * @param columns
     * @return Promise<IReportFKUser[]>
     */
    public static async getFKUserSendReport(reportReflectToFind: Partial<IReport>, columns: Partial<IColumnsReportFKUser>) : Promise<IReportFKUser[]> {
        return DatabaseKnex.getInstance()
            .select(transformColumnsToArray(columns))
            .where(reportReflectToFind).from(tableName)
            .join(userTable, `${tableName}.userSendReport`, '=', `${userTable}.uuid`)
            .then((rows: IReportFKUser[]) => rows)
            .catch((err: ErrorDatabase) => {
                throw {
                    code: err?.code,
                    message: DatabaseKnex.createBetterSqlMessageError(err?.code as string, err?.sqlMessage as string),
                    sql: err?.sql,
                };
            });
    }

    /**
     * Get Report FK User
     * @param reportReflectToFind
     * @param columns
     * @return Promise<IReportFKUser[]>
     */
    public static async getFKUserReported(reportReflectToFind: Partial<IReport>, columns: Partial<IColumnsReportFKUser>) : Promise<IReportFKUser[]> {
        return DatabaseKnex.getInstance()
            .select(transformColumnsToArray(columns))
            .where(reportReflectToFind).from(tableName)
            .join(userTable, `${tableName}.userReported`, '=', `${userTable}.uuid`)
            .then((rows: IReportFKUser[]) => rows)
            .catch((err: ErrorDatabase) => {
                throw {
                    code: err?.code,
                    message: DatabaseKnex.createBetterSqlMessageError(err?.code as string, err?.sqlMessage as string),
                    sql: err?.sql,
                };
            });
    }

    /**
     * Update Report
     * @param reportReflectToUpdate
     * @param reportReflectToFind
     */
    public static async update(reportReflectToUpdate: Partial<IReport>, reportReflectToFind: Partial<IReport>) {
        return DatabaseKnex.getInstance()
            .update(reportReflectToUpdate)
            .where(reportReflectToFind)
            .from(tableName)
            .catch((err: ErrorDatabase) => {
                throw {
                    code: err?.code,
                    message: DatabaseKnex.createBetterSqlMessageError(err?.code as string, err?.sqlMessage as string),
                    sql: err?.sql,
                };
            });
    }

    /**
     * Create Report
     * @param reportReflectToCreate
     */
    public static async create(reportReflectToCreate: Partial<IReport>) {
        return DatabaseKnex.getInstance()
            .insert(reportReflectToCreate)
            .into(tableName)
            .catch((err: ErrorDatabase) => {
                throw {
                    code: err?.code,
                    message: DatabaseKnex.createBetterSqlMessageError(err?.code as string, err?.sqlMessage as string),
                    sql: err?.sql,
                };
            });
    }

    /**
     * Delete Report
     * @param reportReflectToFind
     */
    public static async delete(reportReflectToFind: Partial<IReport>) {
        return DatabaseKnex.getInstance()
            .delete()
            .where(reportReflectToFind)
            .from(tableName)
            .catch((err: ErrorDatabase) => {
                throw {
                    code: err?.code,
                    message: DatabaseKnex.createBetterSqlMessageError(err?.code as string, err?.sqlMessage as string),
                    sql: err?.sql,
                };
            });
    }

    /**
     * Transaction Get Report
     * @param reportReflectToFind
     * @param columns
     * @param trx
     * @return Promise<IReport[]>
     */
    public static async transactionGet(reportReflectToFind: Partial<IReport>, columns: Partial<IColumnsReport>, trx: Transaction) : Promise<IReport[]> {
        return DatabaseKnex.getInstance()
            .select(transformColumnsToArray(columns))
            .where(reportReflectToFind).from(tableName)
            .transacting(trx);
    }

    /**
     * Transaction Get Report FK User
     * @param reportReflectToFind
     * @param columns
     * @param trx
     * @return Promise<IReportFKUser[]>
     */
    public static async transactionGetFKUserSendReport(reportReflectToFind: Partial<IReport>, columns: Partial<IColumnsReportFKUser>, trx: Transaction) : Promise<IReportFKUser[]> {
        return DatabaseKnex.getInstance()
            .select(transformColumnsToArray(columns))
            .where(reportReflectToFind).from(tableName)
            .join(userTable, `${tableName}.userSendReport`, '=', `${userTable}.uuid`)
            .transacting(trx);
    }

    /**
     * Transaction Get Report FK User
     * @param reportReflectToFind
     * @param columns
     * @param trx
     * @return Promise<IReportFKUser[]>
     */
    public static async transactionGetFKUserReported(reportReflectToFind: Partial<IReport>, columns: Partial<IColumnsReportFKUser>, trx: Transaction) : Promise<IReportFKUser[]> {
        return DatabaseKnex.getInstance()
            .select(transformColumnsToArray(columns))
            .where(reportReflectToFind).from(tableName)
            .join(userTable, `${tableName}.userReported`, '=', `${userTable}.uuid`)
            .transacting(trx);
    }

    /**
     * Transaction Update Report
     * @param reportReflectToUpdate
     * @param reportReflectToFind
     * @param trx
     */
    public static async transactionUpdate(reportReflectToUpdate: Partial<IReport>, reportReflectToFind: Partial<IReport>, trx: Transaction) {
        return DatabaseKnex.getInstance()
            .update(reportReflectToUpdate)
            .where(reportReflectToFind)
            .from(tableName)
            .transacting(trx);
    }

    /**
     * Transaction Create Report
     * @param reportReflectToCreate
     * @param trx
     */
    public static async transactionCreate(reportReflectToCreate: Partial<IReport>, trx: Transaction) {
        return DatabaseKnex.getInstance()
            .insert(reportReflectToCreate)
            .into(tableName)
            .transacting(trx);
    }

    /**
     * Transaction Delete Report
     * @param reportReflectToFind
     * @param trx
     */
    public static async transactionDelete(reportReflectToFind: Partial<IReport>, trx: Transaction)  {
        return DatabaseKnex.getInstance()
            .delete()
            .where(reportReflectToFind)
            .from(tableName)
            .transacting(trx);
    }
}


