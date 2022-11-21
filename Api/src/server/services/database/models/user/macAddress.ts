/**
 * Local Modules
 */
import { DatabaseKnex, ErrorDatabase, Transaction } from '../../DatabaseKnex';
import { IMacAddress, IMacAddressFKUser } from '../../../../models';
import { transformColumnsToArray } from '../columnSelectorBuilder';
import { IColumnsUser, tableName as userTable } from './user';

/**
 * IColumnMacAddress
 */
export interface IColumnsMacAddress {
    macAddress: boolean;
    createdAt: boolean;
    active: boolean;
    userUuid: boolean;
    uuid: boolean | string;
}

/**
 * IColumnMacAddressFKUser
 */
export interface IColumnsMacAddressFKUser extends IColumnsMacAddress, IColumnsUser {}

/**
 * Table Name
 */
export const tableName = 'USER_MAC_ADDRESS';

/**
 * MacAddress class : is the class that contains the queries for the table USER_MACADDRESS
 */
export class MacAddress {

    /**
     * Get Mac Address
     * @param macAddressReflectToFind
     * @param columns
     * @return Promise<IMacAddress[]>
     */
    public static async get(macAddressReflectToFind: Partial<IMacAddress>, columns: Partial<IColumnsMacAddress>) : Promise<IMacAddress[]> {
        return DatabaseKnex.getInstance()
            .select(transformColumnsToArray(columns))
            .where(macAddressReflectToFind).from(tableName)
            .then((rows: IMacAddress[]) => rows)
            .catch((err: ErrorDatabase) => {
                throw {
                    code: err?.code,
                    message: DatabaseKnex.createBetterSqlMessageError(err?.code as string, err?.sqlMessage as string),
                    sql: err?.sql,
                };
            });
    }

    /**
     * Get Mac Address FK User
     * @param macAddressReflectToFind
     * @param columns
     * @return Promise<IMacAddressFKUser[]>
     */
    public static async getFKUser(macAddressReflectToFind: Partial<IMacAddress>, columns: Partial<IColumnsMacAddressFKUser>) : Promise<IMacAddressFKUser[]> {
        return DatabaseKnex.getInstance()
            .select(transformColumnsToArray(columns))
            .where(macAddressReflectToFind).from(tableName)
            .join(userTable, `${tableName}.userUuid`, '=', `${userTable}.uuid`)
            .then((rows: IMacAddressFKUser[]) => rows)
            .catch((err: ErrorDatabase) => {
                throw {
                    code: err?.code,
                    message: DatabaseKnex.createBetterSqlMessageError(err?.code as string, err?.sqlMessage as string),
                    sql: err?.sql,
                };
            });
    }

    /**
     * Update Mac Address
     * @param macAddressReflectToUpdate
     * @param macAddressReflectToFind
     */
    public static async update(macAddressReflectToUpdate: Partial<IMacAddress>, macAddressReflectToFind: Partial<IMacAddress>) {
        return DatabaseKnex.getInstance()
            .update(macAddressReflectToUpdate)
            .where(macAddressReflectToFind)
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
     * Create Mac Address
     * @param macAddressReflectToCreate
     */
    public static async create(macAddressReflectToCreate: Partial<IMacAddress>) {
        return DatabaseKnex.getInstance()
            .insert(macAddressReflectToCreate)
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
     * Delete Mac Address
     * @param macAddressReflectToFind
     */
    public static async delete(macAddressReflectToFind: Partial<IMacAddress>) {
        return DatabaseKnex.getInstance()
            .delete()
            .where(macAddressReflectToFind)
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
     * Transaction Get Mac Address
     * @param macAddressReflectToFind
     * @param columns
     * @param trx
     * @return Promise<IMacAddress[]>
     */
    public static async transactionGet(macAddressReflectToFind: Partial<IMacAddress>, columns: Partial<IColumnsMacAddress>, trx: Transaction) : Promise<IMacAddress[]> {
        return DatabaseKnex.getInstance()
            .select(transformColumnsToArray(columns))
            .where(macAddressReflectToFind).from(tableName)
            .transacting(trx);
    }

    /**
     * Transaction Get Mac Address FK User
     * @param macAddressReflectToFind
     * @param columns
     * @param trx
     * @return Promise<IMacAddressFKUser[]>
     */
    public static async transactionGetFKUser(macAddressReflectToFind: Partial<IMacAddress>, columns: Partial<IColumnsMacAddressFKUser>, trx: Transaction) : Promise<IMacAddressFKUser[]> {
        return DatabaseKnex.getInstance()
            .select(transformColumnsToArray(columns))
            .where(macAddressReflectToFind).from(tableName)
            .join(userTable, `${tableName}.userUuid`, '=', `${userTable}.uuid`)
            .transacting(trx);
    }

    /**
     * Transaction Update Mac Address
     * @param macAddressReflectToUpdate
     * @param macAddressReflectToFind
     * @param trx
     */
    public static async transactionUpdate(macAddressReflectToUpdate: Partial<IMacAddress>, macAddressReflectToFind: Partial<IMacAddress>, trx: Transaction) {
        return DatabaseKnex.getInstance()
            .update(macAddressReflectToUpdate)
            .where(macAddressReflectToFind)
            .from(tableName)
            .transacting(trx);
    }

    /**
     * Transaction Create Mac Address
     * @param macAddressReflectToCreate
     * @param trx
     */
    public static async transactionCreate(macAddressReflectToCreate: Partial<IMacAddress>, trx: Transaction) {
        return DatabaseKnex.getInstance()
            .insert(macAddressReflectToCreate)
            .into(tableName)
            .transacting(trx);
    }

    /**
     * Transaction Delete Mac Address
     * @param macAddressReflectToFind
     * @param trx
     */
    public static async transactionDelete(macAddressReflectToFind: Partial<IMacAddress>, trx: Transaction) {
        return DatabaseKnex.getInstance()
            .delete()
            .where(macAddressReflectToFind)
            .from(tableName)
            .transacting(trx);
    }
}


