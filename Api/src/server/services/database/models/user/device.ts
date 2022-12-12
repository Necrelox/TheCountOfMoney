/**
 * Local Modules
 */
import { DatabaseKnex, ErrorDatabase, Transaction } from '../../DatabaseKnex';
import { IDevice, IDeviceFKUser } from '../../../../models';
import { transformColumnsToArray } from '../columnSelectorBuilder';
import { IColumnsUser, tableName as userTable } from './user';

/**
 * IColumnDevice
 */
export interface IColumnsDevice {
    device: boolean;
    createdAt: boolean | string;
    active: boolean;
    userUuid: boolean;
    uuid: boolean | string;
}

/**
 * IColumnDeviceFKUser
 */
export interface IColumnsDeviceFKUser extends IColumnsDevice, IColumnsUser {}
/**
 * Table Name
 */
export const tableName = 'USER_DEVICE';

/**
 * Device class : is the class that contains the queries for the table USER_DEVICE
 * @class Device
 */
export class Device {
    /**
     * Get device
     * @param deviceReflectToFind
     * @param columns
     * @return {Promise<IDevice[]>}
     */
    public static async get(deviceReflectToFind: Partial<IDevice>, columns: Partial<IColumnsDevice>) : Promise<IDevice[]> {
        return DatabaseKnex.getInstance()
            .select(transformColumnsToArray(columns))
            .where(deviceReflectToFind).from(tableName)
            .then((rows: IDevice[]) => rows)
            .catch((err: ErrorDatabase) => {
                throw {
                    code: err?.code,
                    message: DatabaseKnex.createBetterSqlMessageError(err?.code as string, err?.sqlMessage as string),
                    sql: err?.sql,
                };
            });
    }

    /**
     * Get device FK user
     * @param deviceReflectToFind
     * @param columns
     * @return {Promise<IDeviceFKUser[]>}
     */
    public static async getFKUser(deviceReflectToFind: Partial<IDevice>, columns: Partial<IColumnsDeviceFKUser>) : Promise<IDeviceFKUser[]> {
        return DatabaseKnex.getInstance()
            .select(transformColumnsToArray(columns))
            .where(deviceReflectToFind).from(tableName)
            .join(userTable, `${tableName}.userUuid`, '=', `${userTable}.uuid`)
            .then((rows: IDeviceFKUser[]) => rows)
            .catch((err: ErrorDatabase) => {
                throw {
                    code: err?.code,
                    message: DatabaseKnex.createBetterSqlMessageError(err?.code as string, err?.sqlMessage as string),
                    sql: err?.sql,
                };
            });
    }

    /**
     * Update a device
     * @param deviceReflectToUpdate
     * @param deviceReflectToFind
     * @static
     */
    public static async update(deviceReflectToUpdate: Partial<IDevice>, deviceReflectToFind: Partial<IDevice>) {
        DatabaseKnex.getInstance()
            .update(deviceReflectToUpdate)
            .where(deviceReflectToFind)
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
     * Create a device
     * @param deviceReflectToCreate
     * @static
     */
    public static async create(deviceReflectToCreate: Partial<IDevice>) {
        return DatabaseKnex.getInstance()
            .insert(deviceReflectToCreate)
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
     * Delete a device
     * @param deviceReflectToFind
     * @static
     */
    public static async delete(deviceReflectToFind: Partial<IDevice>) {
        DatabaseKnex.getInstance()
            .delete()
            .where(deviceReflectToFind)
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
     * Transaction Get device
     * @param deviceReflectToFind
     * @param columns
     * @param trx
     * @return {Promise<IDevice[]>}
     */
    public static async transactionGet(deviceReflectToFind: Partial<IDevice>, columns: Partial<IColumnsDevice>, trx: Transaction) : Promise<IDevice[]> {
        return DatabaseKnex.getInstance()
            .select(transformColumnsToArray(columns))
            .where(deviceReflectToFind).from(tableName)
            .transacting(trx);
    }

    /**
     * Transaction Get device FK user
     * @param deviceReflectToFind
     * @param columns
     * @param trx
     * @return {Promise<IDeviceFKUser[]>}
     */
    public static async transactionGetFKUser(deviceReflectToFind: Partial<IDevice>, columns: Partial<IColumnsDeviceFKUser>, trx: Transaction) : Promise<IDeviceFKUser[]> {
        return DatabaseKnex.getInstance()
            .select(transformColumnsToArray(columns))
            .where(deviceReflectToFind).from(tableName)
            .join(userTable, `${tableName}.userUuid`, '=', `${userTable}.uuid`)
            .transacting(trx);
    }

    /**
     * Transaction Update a device
     * @param deviceReflectToUpdate
     * @param deviceReflectToFind
     * @param trx
     */
    public static async transactionUpdate(deviceReflectToUpdate: Partial<IDevice>, deviceReflectToFind: Partial<IDevice>, trx: Transaction) {
        return DatabaseKnex.getInstance()
            .update(deviceReflectToUpdate)
            .where(deviceReflectToFind)
            .from(tableName)
            .transacting(trx);
    }

    /**
     * Transaction Create a device
     * @param deviceReflectToCreate
     * @param trx
     */
    public static async transactionCreate(deviceReflectToCreate: Partial<IDevice>, trx: Transaction) {
        return DatabaseKnex.getInstance()
            .insert(deviceReflectToCreate)
            .into(tableName)
            .transacting(trx);
    }

    /**
     * Transaction Delete a device
     * @param deviceReflectToFind
     * @param trx
     */
    public static async transactionDelete(deviceReflectToFind: Partial<IDevice>, trx: Transaction) {
        return DatabaseKnex.getInstance()
            .delete()
            .where(deviceReflectToFind)
            .from(tableName)
            .transacting(trx);
    }
}


