/**
 * Local Modules
 */
import { IIP, IIPFKUser } from '@/models';
import { transformColumnsToArray } from '@/services/actions/ColumnSelectorBuilder';
import { IColumnsUser, tableName as userTable } from './User';
import { DatabaseKnex, ErrorDatabase, Transaction } from '@/services';
import { ErrorEntity, MessageError } from '@/utils';

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
            .catch((err: ErrorDatabase) => {
                throw new ErrorEntity(MessageError.SERVER_DATABASE_ERROR, err?.sqlMessage as string, err?.code as string);
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
            .catch((err: ErrorDatabase) => {
                throw new ErrorEntity(MessageError.SERVER_DATABASE_ERROR, err?.sqlMessage as string, err?.code as string);
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
                throw new ErrorEntity(MessageError.SERVER_DATABASE_ERROR, err?.sqlMessage as string, err?.code as string);
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
                throw new ErrorEntity(MessageError.SERVER_DATABASE_ERROR, err?.sqlMessage as string, err?.code as string);
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
                throw new ErrorEntity(MessageError.SERVER_DATABASE_ERROR, err?.sqlMessage as string, err?.code as string);
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
            .transacting(trx)
            .catch((err: ErrorDatabase) => {
                throw new ErrorEntity(MessageError.SERVER_DATABASE_ERROR, err?.sqlMessage as string, err?.code as string);
            });
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
            .transacting(trx)
            .catch((err: ErrorDatabase) => {
                throw new ErrorEntity(MessageError.SERVER_DATABASE_ERROR, err?.sqlMessage as string, err?.code as string);
            });
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
            .transacting(trx)
            .catch((err: ErrorDatabase) => {
                throw new ErrorEntity(MessageError.SERVER_DATABASE_ERROR, err?.sqlMessage as string, err?.code as string);
            });
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
            .transacting(trx)
            .catch((err: ErrorDatabase) => {
                throw new ErrorEntity(MessageError.SERVER_DATABASE_ERROR, err?.sqlMessage as string, err?.code as string);
            });
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
            .transacting(trx)
            .catch((err: ErrorDatabase) => {
                throw new ErrorEntity(MessageError.SERVER_DATABASE_ERROR, err?.sqlMessage as string, err?.code as string);
            });
    }
}


