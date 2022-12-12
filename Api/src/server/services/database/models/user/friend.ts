/**
 * Local Modules
 */
import { DatabaseKnex, ErrorDatabase, Transaction } from '../../DatabaseKnex';
import { IFriend, IFriendFKUser } from '../../../../models';
import { transformColumnsToArray } from '../columnSelectorBuilder';
import { IColumnsUser, tableName as userTable } from './user';

/**
 * IColumnFriend
 */
export interface IColumnsFriend {
    createdAt: boolean | string;
    acceptedAt: boolean;
    isAccepted: boolean;
    user: boolean;
    friend: boolean;
    uuid: boolean | string;
}

/**
 * IColumnFriendFKUser
 */
export interface IColumnsFriendFKUser extends IColumnsFriend, IColumnsUser {}
/**
 * Table Name
 */
export const tableName = 'USER_FRIEND';

/**
 * Friend class : is the class that contains the queries for the table USER_FRIEND
 * @class Friend
 */
export class Friend {
    /**
     * Get friend
     * @param friendReflectToFind
     * @param columns
     * @return {Promise<IFriend[]>}
     */
    public static async get(friendReflectToFind: Partial<IFriend>, columns: Partial<IColumnsFriend>) : Promise<IFriend[]> {
        return DatabaseKnex.getInstance()
            .select(transformColumnsToArray(columns))
            .where(friendReflectToFind).from(tableName)
            .then((rows: IFriend[]) => rows)
            .catch((err: ErrorDatabase) => {
                throw {
                    code: err?.code,
                    message: DatabaseKnex.createBetterSqlMessageError(err?.code as string, err?.sqlMessage as string),
                    sql: err?.sql,
                };
            });
    }

    /**
     * Get friend col user FK user
     * @param friendReflectToFind
     * @param columns
     * @return {Promise<IFriendFKUser[]>}
     */
    public static async getUserFKUser(friendReflectToFind: Partial<IFriend>, columns: Partial<IColumnsFriendFKUser>) : Promise<IFriendFKUser[]> {
        return DatabaseKnex.getInstance()
            .select(transformColumnsToArray(columns))
            .where(friendReflectToFind).from(tableName)
            .join(userTable, `${tableName}.user`, '=', `${userTable}.uuid`)
            .then((rows: IFriendFKUser[]) => rows)
            .catch((err: ErrorDatabase) => {
                throw {
                    code: err?.code,
                    message: DatabaseKnex.createBetterSqlMessageError(err?.code as string, err?.sqlMessage as string),
                    sql: err?.sql,
                };
            });
    }

    /**
     * Get friend col friend FK user
     * @param friendReflectToFind
     * @param columns
     * @return {Promise<IFriendFKUser[]>}
     */
    public static async getFriendFKUser(friendReflectToFind: Partial<IFriend>, columns: Partial<IColumnsFriendFKUser>) : Promise<IFriendFKUser[]> {
        return DatabaseKnex.getInstance()
            .select(transformColumnsToArray(columns))
            .where(friendReflectToFind).from(tableName)
            .join(userTable, `${tableName}.friend`, '=', `${userTable}.uuid`)
            .then((rows: IFriendFKUser[]) => rows)
            .catch((err: ErrorDatabase) => {
                throw {
                    code: err?.code,
                    message: DatabaseKnex.createBetterSqlMessageError(err?.code as string, err?.sqlMessage as string),
                    sql: err?.sql,
                };
            });
    }

    /**
     * Update a friend
     * @param friendReflectToUpdate
     * @param friendReflectToFind
     * @static
     */
    public static async update(friendReflectToUpdate: Partial<IFriend>, friendReflectToFind: Partial<IFriend>) {
        DatabaseKnex.getInstance()
            .update(friendReflectToUpdate)
            .where(friendReflectToFind)
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
     * Create a friend
     * @param friendReflectToCreate
     * @static
     */
    public static async create(friendReflectToCreate: Partial<IFriend>) {
        return DatabaseKnex.getInstance()
            .insert(friendReflectToCreate)
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
     * Delete a friend
     * @param friendReflectToFind
     * @static
     */
    public static async delete(friendReflectToFind: Partial<IFriend>) {
        DatabaseKnex.getInstance()
            .delete()
            .where(friendReflectToFind)
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
     * Transaction Get friend
     * @param friendReflectToFind
     * @param columns
     * @param trx
     * @return {Promise<IFriend[]>}
     */
    public static async transactionGet(friendReflectToFind: Partial<IFriend>, columns: Partial<IColumnsFriend>, trx: Transaction) : Promise<IFriend[]> {
        return DatabaseKnex.getInstance()
            .select(transformColumnsToArray(columns))
            .where(friendReflectToFind).from(tableName)
            .transacting(trx);
    }

    /**
     * Transaction Get friend col user FK user
     * @param friendReflectToFind
     * @param columns
     * @param trx
     * @return {Promise<IFriendFKUser[]>}
     */
    public static async transactionGetUserFKUser(friendReflectToFind: Partial<IFriend>, columns: Partial<IColumnsFriendFKUser>, trx: Transaction) : Promise<IFriendFKUser[]> {
        return DatabaseKnex.getInstance()
            .select(transformColumnsToArray(columns))
            .where(friendReflectToFind).from(tableName)
            .join(userTable, `${tableName}.user`, '=', `${userTable}.uuid`)
            .transacting(trx);
    }

    /**
     * Transaction Get friend col friend FK user
     * @param friendReflectToFind
     * @param columns
     * @param trx
     * @return {Promise<IFriendFKUser[]>}
     */
    public static async transactionGetFriendFKUser(friendReflectToFind: Partial<IFriend>, columns: Partial<IColumnsFriendFKUser>, trx: Transaction) : Promise<IFriendFKUser[]> {
        return DatabaseKnex.getInstance()
            .select(transformColumnsToArray(columns))
            .where(friendReflectToFind).from(tableName)
            .join(userTable, `${tableName}.friend`, '=', `${userTable}.uuid`)
            .transacting(trx);
    }

    /**
     * Transaction Update a friend
     * @param friendReflectToUpdate
     * @param friendReflectToFind
     * @param trx
     */
    public static async transactionUpdate(friendReflectToUpdate: Partial<IFriend>, friendReflectToFind: Partial<IFriend>, trx: Transaction) {
        return DatabaseKnex.getInstance()
            .update(friendReflectToUpdate)
            .where(friendReflectToFind)
            .from(tableName)
            .transacting(trx);
    }

    /**
     * Transaction Create a friend
     * @param friendReflectToCreate
     * @param trx
     */
    public static async transactionCreate(friendReflectToCreate: Partial<IFriend>, trx: Transaction) {
        return DatabaseKnex.getInstance()
            .insert(friendReflectToCreate)
            .into(tableName)
            .transacting(trx);
    }

    /**
     * Transaction Delete a friend
     * @param friendReflectToFind
     * @param trx
     */
    public static async transactionDelete(friendReflectToFind: Partial<IFriend>, trx: Transaction) {
        return DatabaseKnex.getInstance()
            .delete()
            .where(friendReflectToFind)
            .from(tableName)
            .transacting(trx);
    }
}


