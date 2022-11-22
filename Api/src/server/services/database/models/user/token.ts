/**
 * Local Modules
 */
import { DatabaseKnex, ErrorDatabase, Transaction } from '../../DatabaseKnex';
import { transformColumnsToArray } from '../columnSelectorBuilder';
import { IToken, ITokenFKUser } from '../../../../models';
import { IColumnsUser, tableName as userTable } from './user';

/**
 * IColumnToken
 */
export interface IColumnsToken {
    createdAt: boolean;
    expireAt: boolean;
    salt: boolean;
    token: boolean;
    userUuid: boolean;
    uuid: string | boolean;
}

/**
 * IColumnTokenFKUser
 */
export interface IColumnsTokenFKUser extends IColumnsToken, IColumnsUser {}

/**
 * Table Name
 */
export const tableName = 'USER_TOKEN';

/**
 * Token class : is the class that contains the queries for the table USER_TOKEN
 */
export class Token {

    /**
     * Get Token
     * @param tokenReflectToFind
     * @param columns
     * @return Promise<IToken[]>
     */
    public static async get(tokenReflectToFind: Partial<IToken>, columns: Partial<IColumnsToken>) : Promise<IToken[]> {
        return DatabaseKnex.getInstance()
            .select(transformColumnsToArray(columns))
            .where(tokenReflectToFind).from(tableName)
            .then((rows: IToken[]) => rows).catch((err: ErrorDatabase) => {
                throw {
                    code: err?.code,
                    message: DatabaseKnex.createBetterSqlMessageError(err?.code as string, err?.sqlMessage as string),
                    sql: err?.sql,
                };
            });
    }

    /**
     * Get Token FK user
     * @param tokenReflectToFind
     * @param columns
     * @return Promise<IToken[]>
     */
    public static async getFKUser(tokenReflectToFind: Partial<IToken>, columns: Partial<IColumnsTokenFKUser>) : Promise<ITokenFKUser[]> {
        return DatabaseKnex.getInstance()
            .select(transformColumnsToArray(columns))
            .where(tokenReflectToFind).from(tableName)
            .join(userTable, tableName + '.userUuid', '=', userTable + '.uuid')
            .then((rows: ITokenFKUser[]) => {
                return rows;
            }).catch((err: ErrorDatabase) => {
                throw {
                    code: err?.code,
                    message: DatabaseKnex.createBetterSqlMessageError(err?.code as string, err?.sqlMessage as string),
                    sql: err?.sql,
                };
            });
    }

    /**
     * Update Token
     * @param tokenReflectToUpdate
     * @param tokenReflectToFind
     */
    public static async update(tokenReflectToUpdate: Partial<IToken>, tokenReflectToFind: Partial<IToken>) {
        return DatabaseKnex.getInstance()
            .update(tokenReflectToUpdate)
            .where(tokenReflectToFind)
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
     * Create Token
     * @param tokenReflectToCreate
     */
    public static async create(tokenReflectToCreate: Partial<IToken>) {
        return DatabaseKnex.getInstance()
            .insert(tokenReflectToCreate)
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
     * Delete Token
     * @param tokenReflectToFind
     */
    public static async delete(tokenReflectToFind: Partial<IToken>) {
        return DatabaseKnex.getInstance()
            .delete()
            .where(tokenReflectToFind)
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
     * Transaction Get Token
     * @param tokenReflectToFind
     * @param columns
     * @param trx
     * @return Promise<IToken[]>
     */
    public static async transactionGet(tokenReflectToFind: Partial<IToken>, columns: Partial<IColumnsToken>, trx: Transaction) : Promise<IToken[]> {
        return DatabaseKnex.getInstance()
            .select(transformColumnsToArray(columns))
            .where(tokenReflectToFind).from(tableName)
            .transacting(trx);
    }

    /**
     * Transaction Get Token with User
     * @param tokenReflectToFind
     * @param columns
     * @param trx
     * @return Promise<ITokenFKUser[]>
     */
    public static async transactionGetFKUser(tokenReflectToFind: Partial<IToken>, columns: Partial<IColumnsTokenFKUser>, trx: Transaction) : Promise<ITokenFKUser[]> {
        return DatabaseKnex.getInstance()
            .select(transformColumnsToArray(columns))
            .where(tokenReflectToFind).from(tableName)
            .join(userTable, tableName + '.userUuid', '=', userTable + '.uuid')
            .transacting(trx);
    }

    /**
     * Transaction Update Token
     * @param tokenReflectToUpdate
     * @param tokenReflectToFind
     * @param trx
     */
    public static async transactionUpdate(tokenReflectToUpdate: Partial<IToken>, tokenReflectToFind: Partial<IToken>, trx: Transaction) {
        return DatabaseKnex.getInstance()
            .update(tokenReflectToUpdate)
            .where(tokenReflectToFind)
            .from(tableName)
            .transacting(trx);
    }

    /**
     * Transaction Create Token
     * @param tokenReflectToCreate
     * @param trx
     */
    public static async transactionCreate(tokenReflectToCreate: Partial<IToken>, trx: Transaction) {
        return DatabaseKnex.getInstance()
            .insert(tokenReflectToCreate)
            .into(tableName)
            .transacting(trx)
            .catch((err: ErrorDatabase) => {
                throw {
                    code: err?.code,
                    message: DatabaseKnex.createBetterSqlMessageError(err?.code as string, err?.sqlMessage as string),
                    sql: err?.sql,
                };
            });
    }

    /**
     * Transaction Delete Token
     * @param tokenReflectToFind
     * @param trx
     */
    public static async transactionDelete(tokenReflectToFind: Partial<IToken>, trx: Transaction)  {
        return DatabaseKnex.getInstance()
            .delete()
            .where(tokenReflectToFind)
            .from(tableName)
            .transacting(trx);
    }
}


