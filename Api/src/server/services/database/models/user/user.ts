/**
 * Local Modules
 */
import { DatabaseKnex, ErrorDatabase, Transaction } from '../../DatabaseKnex';
import { transformColumnsToArray } from '../columnSelectorBuilder';
import { IUser } from '../../../../models/';

/**
 * IColumnUser
 */
export interface IColumnsUser {
    email: boolean;
    username: boolean;
    password: boolean;
    activityMessage: boolean;
    isConnected: boolean;
    isBlackListed: boolean;
    createdAt: boolean | string;
    uuid: boolean | string;
}

/**
 * Table Name
 */
export const tableName = 'USER';

export class User {
    /**
     * Get User
     * @param userReflectToFind
     * @param columns
     * @return Promise<IUser[]>
     */
    public static async get(userReflectToFind: Partial<IUser>, columns: Partial<IColumnsUser>) : Promise<IUser[]> {
        return DatabaseKnex.getInstance()
            .select(transformColumnsToArray(columns))
            .where(userReflectToFind).from(tableName)
            .then((rows: IUser[]) => rows).catch((err: ErrorDatabase) => {
                throw {
                    code: err?.code,
                    message: DatabaseKnex.createBetterSqlMessageError(err?.code as string, err?.sqlMessage as string),
                    sql: err?.sql,
                };
            });
    }

    /**
     * Update User
     * @param userReflectToUpdate
     * @param userReflectToFind
     */
    public static async update(userReflectToUpdate: Partial<IUser>, userReflectToFind: Partial<IUser>) {
        return DatabaseKnex.getInstance()
            .update(userReflectToUpdate)
            .where(userReflectToFind)
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
     * Create User
     * @param userReflectToCreate
     */
    public static async create(userReflectToCreate: Partial<IUser>) {
        return DatabaseKnex.getInstance()
            .insert(userReflectToCreate)
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
     * Delete User
     * @param userReflectToFind
     */
    public static async delete(userReflectToFind: Partial<IUser>) {
        return DatabaseKnex.getInstance()
            .delete()
            .where(userReflectToFind)
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
     * Transaction Get User
     * @param userReflectToFind
     * @param columns
     * @param trx
     * @return Promise<IUser[]>
     */
    public static async transactionGet(userReflectToFind: Partial<IUser>, columns: Partial<IColumnsUser>, trx: Transaction) : Promise<IUser[]> {
        return DatabaseKnex.getInstance()
            .select(transformColumnsToArray(columns))
            .where(userReflectToFind).from(tableName)
            .transacting(trx);
    }

    /**
     * Transaction Update User
     * @param userReflectToUpdate
     * @param userReflectToFind
     * @param trx
     */
    public static async transactionUpdate(userReflectToUpdate: Partial<IUser>, userReflectToFind: Partial<IUser>, trx: Transaction) {
        return DatabaseKnex.getInstance()
            .update(userReflectToUpdate)
            .into(tableName)
            .where(userReflectToFind)
            .transacting(trx);
    }

    /**
     * Transaction Create User
     * @param userReflectToCreate
     * @param trx
     */
    public static async transactionCreate(userReflectToCreate: Partial<IUser>, trx: Transaction) {
        return DatabaseKnex.getInstance()
            .insert(userReflectToCreate)
            .into(tableName)
            .transacting(trx);
    }

    /**
     * Transaction Delete User
     * @param userReflectToFind
     * @param trx
     */
    public static async transactionDelete(userReflectToFind: Partial<IUser>, trx: Transaction) {
        return DatabaseKnex.getInstance()
            .delete()
            .where(userReflectToFind)
            .from(tableName)
            .transacting(trx);
    }

}


