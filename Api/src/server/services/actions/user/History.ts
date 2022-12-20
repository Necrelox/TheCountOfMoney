/**
 * Local Modules
 */
import { transformColumnsToArray } from '@/services/actions/ColumnSelectorBuilder';
import { IHistory, IHistoryFKUser } from '@/models';
import { ErrorEntity, MessageError } from '@/utils';
import { DatabaseKnex, ErrorDatabase, Transaction } from '@/services';
import { IColumnsUser, tableName as userTable } from './User';

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
            .catch((err: ErrorDatabase) => {
                throw new ErrorEntity(MessageError.SERVER_DATABASE_ERROR, err?.sqlMessage as string, err?.code as string);
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
            .catch((err: ErrorDatabase) => {
                throw new ErrorEntity(MessageError.SERVER_DATABASE_ERROR, err?.sqlMessage as string, err?.code as string);
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
                throw new ErrorEntity(MessageError.SERVER_DATABASE_ERROR, err?.sqlMessage as string, err?.code as string);
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
                throw new ErrorEntity(MessageError.SERVER_DATABASE_ERROR, err?.sqlMessage as string, err?.code as string);
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
                throw new ErrorEntity(MessageError.SERVER_DATABASE_ERROR, err?.sqlMessage as string, err?.code as string);
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
            .transacting(trx)
            .catch((err: ErrorDatabase) => {
                throw new ErrorEntity(MessageError.SERVER_DATABASE_ERROR, err?.sqlMessage as string, err?.code as string);
            });
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
            .transacting(trx)
            .catch((err: ErrorDatabase) => {
                throw new ErrorEntity(MessageError.SERVER_DATABASE_ERROR, err?.sqlMessage as string, err?.code as string);
            });
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
            .transacting(trx)
            .catch((err: ErrorDatabase) => {
                throw new ErrorEntity(MessageError.SERVER_DATABASE_ERROR, err?.sqlMessage as string, err?.code as string);
            });
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
            .transacting(trx)
            .catch((err: ErrorDatabase) => {
                throw new ErrorEntity(MessageError.SERVER_DATABASE_ERROR, err?.sqlMessage as string, err?.code as string);
            });
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
            .transacting(trx)
            .catch((err: ErrorDatabase) => {
                throw new ErrorEntity(MessageError.SERVER_DATABASE_ERROR, err?.sqlMessage as string, err?.code as string);
            });
    }
}


