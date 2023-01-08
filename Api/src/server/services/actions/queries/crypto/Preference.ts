/**
 * Local Modules
 */
import { transformColumnsToArray } from '@/services/actions/queries/ColumnSelectorBuilder';
import { IPreference } from '@/models';
import { DatabaseKnex, ErrorDatabase, Transaction } from '@/services';
import { ErrorEntity, MessageError } from '@/utils';

/**
 * IColumnsPreference
 */
export interface IColumnsPreference {
    name: boolean;
    symbol: boolean;
    id: boolean,
}
/**
 * Table Name
 */
export const tableName = 'PREFERENCE';

/**
 * Preference class : is the class that contains the queries for the table PREFRENCE
 */
export class Preference {
    /**
     * Get Preference
     * @param preferenceReflectToFind
     * @param columns
     * @return Promise<IPreference[]>
     */
    public static async get(preferenceReflectToFind: Partial<IPreference>, columns: Partial<IColumnsPreference>) : Promise<IPreference[]> {
        return DatabaseKnex.getInstance()
            .select(transformColumnsToArray(columns))
            .where(preferenceReflectToFind).from(tableName)
            .catch((err: ErrorDatabase) => {
                throw new ErrorEntity(MessageError.SERVER_DATABASE_ERROR, err?.sqlMessage as string, err?.code as string);
            });
    }

    /**
     * Update Preference
     * @param preferenceReflectToUpdate
     * @param preferenceReflectToFind
     */
    public static async update(preferenceReflectToUpdate: Partial<IPreference>, preferenceReflectToFind: Partial<IPreference>) {
        return DatabaseKnex.getInstance()
            .update(preferenceReflectToUpdate)
            .where(preferenceReflectToFind)
            .from(tableName)
            .catch((err: ErrorDatabase) => {
                throw new ErrorEntity(MessageError.SERVER_DATABASE_ERROR, err?.sqlMessage as string, err?.code as string);
            });
    }
    /**
     * Create Preference
     * @param preferenceReflectToCreate
     */
    public static async create(preferenceReflectToCreate: Partial<IPreference>) {
        return DatabaseKnex.getInstance()
            .insert(preferenceReflectToCreate)
            .into(tableName)
            .catch((err: ErrorDatabase) => {
                throw new ErrorEntity(MessageError.SERVER_DATABASE_ERROR, err?.sqlMessage as string, err?.code as string);
            });
    }

    /**
     * Delete Preference
     * @param preferenceReflectToFind
     */
    public static async delete(preferenceReflectToFind: Partial<IPreference>) {
        return DatabaseKnex.getInstance()
            .delete()
            .where(preferenceReflectToFind)
            .from(tableName)
            .catch((err: ErrorDatabase) => {
                throw new ErrorEntity(MessageError.SERVER_DATABASE_ERROR, err?.sqlMessage as string, err?.code as string);
            });
    }

    /**
     * Transaction Get Preference
     * @param preferenceReflectToFind
     * @param columns
     * @param trx
     * @return Promise<IPreference[]>
     */
    public static async transactionGet(preferenceReflectToFind: Partial<IPreference>, columns: Partial<IColumnsPreference>, trx: Transaction) : Promise<IPreference[]> {
        return DatabaseKnex.getInstance()
            .select(transformColumnsToArray(columns))
            .where(preferenceReflectToFind).from(tableName)
            .transacting(trx)
            .catch((err: ErrorDatabase) => {
                throw new ErrorEntity(MessageError.SERVER_DATABASE_ERROR, err?.sqlMessage as string, err?.code as string);
            });
    }

    public static async transactionGetAll(columns: Partial<IColumnsPreference>, trx: Transaction) : Promise<IPreference[]> {
        return DatabaseKnex.getInstance()
            .select(transformColumnsToArray(columns))
            .from(tableName)
            .transacting(trx)
            .catch((err: ErrorDatabase) => {
                throw new ErrorEntity(MessageError.SERVER_DATABASE_ERROR, err?.sqlMessage as string, err?.code as string);
            });
    }

    /**
     * Transaction Update Preference
     * @param preferenceReflectToUpdate
     * @param preferenceReflectToFind
     * @param trx
     */
    public static async transactionUpdate(preferenceReflectToUpdate: Partial<IPreference>, preferenceReflectToFind: Partial<IPreference>, trx: Transaction) {
        return DatabaseKnex.getInstance()
            .update(preferenceReflectToUpdate)
            .where(preferenceReflectToFind)
            .from(tableName)
            .transacting(trx)
            .catch((err: ErrorDatabase) => {
                throw new ErrorEntity(MessageError.SERVER_DATABASE_ERROR, err?.sqlMessage as string, err?.code as string);
            });
    }

    /**
     * Transaction Create Preference
     * @param preferenceReflectToCreate
     * @param trx
     */
    public static async transactionCreate(preferenceReflectToCreate: Partial<IPreference> | Partial<IPreference>[], trx: Transaction) {
        return DatabaseKnex.getInstance()
            .insert(preferenceReflectToCreate)
            .into(tableName)
            .transacting(trx)
            .catch((err: ErrorDatabase) => {
                throw new ErrorEntity(MessageError.SERVER_DATABASE_ERROR, err?.sqlMessage as string, err?.code as string);
            });
    }

    /**
     * Transaction Delete Preference
     * @param preferenceReflectToFind
     * @param trx
     */
    public static async transactionDelete(preferenceReflectToFind: Partial<IPreference>, trx: Transaction)  {
        return DatabaseKnex.getInstance()
            .delete()
            .where(preferenceReflectToFind)
            .from(tableName)
            .transacting(trx)
            .catch((err: ErrorDatabase) => {
                throw new ErrorEntity(MessageError.SERVER_DATABASE_ERROR, err?.sqlMessage as string, err?.code as string);
            });
    }
}


