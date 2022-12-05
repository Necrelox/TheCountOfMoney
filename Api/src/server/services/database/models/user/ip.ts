/**
 * Local Modules
 */
import { DatabaseKnex, ErrorDatabase, Transaction } from '../../DatabaseKnex';
import { IIP, IIPFKUser } from '../../../../models';
import { transformColumnsToArray } from '../columnSelectorBuilder';
import { IColumnsUser, tableName as userTable } from './user';

/**
 * IColumnIP
 */
export interface IColumnsIp {
    ip: boolean;
    createdAt: boolean | string;
    active: boolean;
    userUuid: boolean;
    uuid: boolean | string;
}

/**
 * IColumnIPFKUser
 */
export interface IColumnsIpFKUser extends IColumnsIp, IColumnsUser {}

/**
 * Table Name
 */
export const tableName = 'USER_IP';

/**
 * IP class : is the class that contains the queries for the table USER_IP
 * @class IP
 */
export class Ip {
    /**
     * Get ip
     * @param ipReflectToFind
     * @param columns
     * @return {Promise<IIP[]>}
     */
    public static async get(ipReflectToFind: Partial<IIP>, columns: Partial<IColumnsIp>) : Promise<IIP[]> {
        return DatabaseKnex.getInstance()
            .select(transformColumnsToArray(columns))
            .where(ipReflectToFind).from(tableName)
            .then((rows: IIP[]) => rows)
            .catch((err: ErrorDatabase) => {
                throw {
                    code: err?.code,
                    message: DatabaseKnex.createBetterSqlMessageError(err?.code as string, err?.sqlMessage as string),
                    sql: err?.sql,
                };
            });
    }

    /**
     * Get ip FK user
     * @param ipReflectToFind
     * @param columns
     * @return {Promise<IIPFKUser[]>}
     */
    public static async getFKUser(ipReflectToFind: Partial<IIP>, columns: Partial<IColumnsIpFKUser>) : Promise<IIPFKUser[]> {
        return DatabaseKnex.getInstance()
            .select(transformColumnsToArray(columns))
            .where(ipReflectToFind).from(tableName)
            .join(userTable, `${tableName}.userUuid`, '=' ,`${userTable}.uuid`)
            .then((rows: IIPFKUser[]) => rows)
            .catch((err: ErrorDatabase) => {
                throw {
                    code: err?.code,
                    message: DatabaseKnex.createBetterSqlMessageError(err?.code as string, err?.sqlMessage as string),
                    sql: err?.sql,
                };
            });
    }

    /**
     * Update ip
     * @param ipReflectToUpdate
     * @param ipReflectToFind
     */
    public static async update(ipReflectToUpdate: Partial<IIP>, ipReflectToFind: Partial<IIP>) {
        return DatabaseKnex.getInstance()
            .update(ipReflectToUpdate)
            .where(ipReflectToFind)
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
     * Create ip
     * @param ipReflectToCreate
     */
    public static async create(ipReflectToCreate: Partial<IIP>) {
        return DatabaseKnex.getInstance()
            .insert(ipReflectToCreate)
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
     * Delete ip
     * @param ipReflectToFind
     */
    public static async delete(ipReflectToFind: Partial<IIP>) {
        return DatabaseKnex.getInstance()
            .delete()
            .where(ipReflectToFind)
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
     * Transaction get ip
     * @param ipReflectToFind
     * @param columns
     * @param trx
     * @return {Promise<IIP[]>}
     */
    public static async transactionGet(ipReflectToFind: Partial<IIP>, columns: Partial<IColumnsIp>, trx: Transaction) : Promise<IIP[]> {
        return DatabaseKnex.getInstance()
            .select(transformColumnsToArray(columns))
            .where(ipReflectToFind).from(tableName)
            .transacting(trx);
    }

    /**
     * Transaction get ip FK user
     * @param ipReflectToFind
     * @param columns
     * @param trx
     * @return {Promise<IIPFKUser[]>}
     */
    public static async transactionGetFKUser(ipReflectToFind: Partial<IIP>, columns: Partial<IColumnsIpFKUser>, trx: Transaction) : Promise<IIPFKUser[]> {
        return DatabaseKnex.getInstance()
            .select(transformColumnsToArray(columns))
            .where(ipReflectToFind).from(tableName)
            .join(userTable, `${tableName}.userUuid`, '=', `${userTable}.uuid`)
            .transacting(trx);
    }

    /**
     * Transaction update ip
     * @param ipReflectToUpdate
     * @param ipReflectToFind
     * @param trx
     */
    public static async transactionUpdate(ipReflectToUpdate: Partial<IIP>, ipReflectToFind: Partial<IIP>, trx: Transaction) {
        return DatabaseKnex.getInstance()
            .update(ipReflectToUpdate)
            .where(ipReflectToFind)
            .from(tableName)
            .transacting(trx);
    }

    /**
     * Transaction create ip
     * @param ipReflectToCreate
     * @param trx
     */
    public static async transactionCreate(ipReflectToCreate: Partial<IIP>, trx: Transaction) {
        return DatabaseKnex.getInstance()
            .insert(ipReflectToCreate)
            .into(tableName)
            .transacting(trx);
    }

    /**
     * Transaction delete ip
     * @param ipReflectToFind
     * @param trx
     */
    public static async transactionDelete(ipReflectToFind: Partial<IIP>, trx: Transaction) {
        return DatabaseKnex.getInstance()
            .delete()
            .where(ipReflectToFind)
            .from(tableName)
            .transacting(trx);
    }
}


