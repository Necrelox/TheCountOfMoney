/**
 * Local Modules
 */
import { DatabaseKnex, ErrorDatabase, Transaction } from '../../DatabaseKnex';
import { IHistory, IHistoryFKUser } from '../../../../models';
import { transformColumnsToArray } from '../columnSelectorBuilder';
import { IColumnsUser, tableName as userTable } from './user';

/**
 * IColumnHistory
 */
export interface IColumnsHistory {
    log: boolean;
    createdAt: boolean | string;
    userUuid: boolean | string;
    uuid: boolean | string;
}

/**
 * IColumnHistoryFKUser
 */
export interface IColumnsHistoryFKUser extends IColumnsHistory, IColumnsUser {}

/**
 * Table Name
 */
export const tableName = 'USER_HISTORY';

/**
 * History class : is the class that contains the queries for the table USER_HISTORY
 * @class History
 */
export class History {
    /**
     * Get history
     * @param historyReflectToFind
     * @param columns
     * @return {Promise<IHistory[]>}
     */
    public static async get(historyReflectToFind: Partial<IHistory>, columns: Partial<IColumnsHistory>) : Promise<IHistory[]> {
        return DatabaseKnex.getInstance()
            .select(transformColumnsToArray(columns))
            .where(historyReflectToFind).from(tableName)
            .then((rows: IHistory[]) => rows)
            .catch((err: ErrorDatabase) => {
                throw {
                    code: err?.code,
                    message: DatabaseKnex.createBetterSqlMessageError(err?.code as string, err?.sqlMessage as string),
                    sql: err?.sql,
                };
            });
    }

    /**
     * Get history FK user
     * @param historyReflectToFind
     * @param columns
     * @return {Promise<IHistoryFKUser[]>}
     */
    public static async getFKUser(historyReflectToFind: Partial<IHistory>, columns: Partial<IColumnsHistoryFKUser>) : Promise<IHistoryFKUser[]> {
        return DatabaseKnex.getInstance()
            .select(transformColumnsToArray(columns))
            .where(historyReflectToFind).from(tableName)
            .join(userTable, `${tableName}.userUuid`, '=', `${userTable}.uuid`)
            .then((rows: IHistoryFKUser[]) => rows)
            .catch((err: ErrorDatabase) => {
                throw {
                    code: err?.code,
                    message: DatabaseKnex.createBetterSqlMessageError(err?.code as string, err?.sqlMessage as string),
                    sql: err?.sql,
                };
            });
    }

    /**
     * Update a history
     * @param historyReflectToUpdate
     * @param historyReflectToFind
     */
    public static async update(historyReflectToUpdate: Partial<IHistory>, historyReflectToFind: Partial<IHistory>)  {
        return DatabaseKnex.getInstance()
            .update(historyReflectToUpdate)
            .where(historyReflectToFind)
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
     * Create a history
     * @param historyReflectToCreate
     */
    public static async create(historyReflectToCreate: Partial<IHistory>) {
        return DatabaseKnex.getInstance()
            .insert(historyReflectToCreate)
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
     * Delete a history
     * @param historyReflectToFind
     */
    public static async delete(historyReflectToFind: Partial<IHistory>) {
        return DatabaseKnex.getInstance()
            .delete()
            .where(historyReflectToFind)
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
     * Transaction get history
     * @param historyReflectToFind
     * @param columns
     * @param trx
     * @return {Promise<IHistory[]>}
     */
    public static async transactionGet(historyReflectToFind: Partial<IHistory>, columns: Partial<IColumnsHistory>, trx: Transaction) : Promise<IHistory[]> {
        return DatabaseKnex.getInstance()
            .select(transformColumnsToArray(columns))
            .where(historyReflectToFind).from(tableName)
            .transacting(trx);
    }

    /**
     * Transaction get history FK user
     * @param historyReflectToFind
     * @param columns
     * @param trx
     * @return {Promise<IHistoryFKUser[]>}
     */
    public static async transactionGetFKUser(historyReflectToFind: Partial<IHistory>, columns: Partial<IColumnsHistoryFKUser>, trx: Transaction) : Promise<IHistoryFKUser[]> {
        return DatabaseKnex.getInstance()
            .select(transformColumnsToArray(columns))
            .where(historyReflectToFind).from(tableName)
            .join(userTable, `${tableName}.userUuid`, '=', `${userTable}.uuid`)
            .transacting(trx);
    }

    /**
     * Transaction update a history
     * @param historyReflectToUpdate
     * @param historyReflectToFind
     * @param trx
     */
    public static async transactionUpdate(historyReflectToUpdate: Partial<IHistory>, historyReflectToFind: Partial<IHistory>, trx: Transaction) {
        return DatabaseKnex.getInstance()
            .update(historyReflectToUpdate)
            .where(historyReflectToFind)
            .from(tableName)
            .transacting(trx);
    }

    /**
     * Transaction create a history
     * @param historyReflectToCreate
     * @param trx
     */
    public static async transactionCreate(historyReflectToCreate: Partial<IHistory>, trx: Transaction) {
        return DatabaseKnex.getInstance()
            .insert(historyReflectToCreate)
            .into(tableName)
            .transacting(trx);
    }

    /**
     * Transaction delete a history
     * @param historyReflectToFind
     * @param trx
     */
    public static async transactionDelete(historyReflectToFind: Partial<IHistory>, trx: Transaction) {
        return DatabaseKnex.getInstance()
            .delete()
            .where(historyReflectToFind)
            .from(tableName)
            .transacting(trx);
    }
}


