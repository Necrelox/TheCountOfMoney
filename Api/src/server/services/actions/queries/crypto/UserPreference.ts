/**
 * Local Modules
 */
import { transformColumnsToArray } from '@/services/actions/queries/ColumnSelectorBuilder';
import { IPreference, IUserPreference } from '@/models';
import { DatabaseKnex, ErrorDatabase, Transaction } from '@/services';
import { ErrorEntity, MessageError } from '@/utils';

/**
 * IColumnsUserPreference
 */
export interface IColumnsUserPreference {
    name: boolean;
    symbol: boolean;
    id: boolean | string,
}
/**
 * Table Name
 */
export const tableName = 'USER_PREFERENCE';

/**
 * UserPreference class : is the class that contains the queries for the table PREFRENCE
 */
export class UserPreference {
    /**
     * Get UserPreference
     * @param userPreferenceReflectToFind
     * @param columns
     * @return Promise<IUserPreference[]>
     */
    public static async get(userPreferenceReflectToFind: Partial<IUserPreference>, columns: Partial<IColumnsUserPreference>) : Promise<IUserPreference[]> {
        return DatabaseKnex.getInstance()
            .select(transformColumnsToArray(columns))
            .where(userPreferenceReflectToFind).from(tableName)
            .catch((err: ErrorDatabase) => {
                throw new ErrorEntity(MessageError.SERVER_DATABASE_ERROR, err?.sqlMessage as string, err?.code as string);
            });
    }

    /**
     * Update UserPreference
     * @param userPreferenceReflectToUpdate
     * @param userPreferenceReflectToFind
     */
    public static async update(userPreferenceReflectToUpdate: Partial<IUserPreference>, userPreferenceReflectToFind: Partial<IUserPreference>) {
        return DatabaseKnex.getInstance()
            .update(userPreferenceReflectToUpdate)
            .where(userPreferenceReflectToFind)
            .from(tableName)
            .catch((err: ErrorDatabase) => {
                throw new ErrorEntity(MessageError.SERVER_DATABASE_ERROR, err?.sqlMessage as string, err?.code as string);
            });
    }
    /**
     * Create UserPreference
     * @param userPreferenceReflectToCreate
     */
    public static async create(userPreferenceReflectToCreate: Partial<IUserPreference>) {
        return DatabaseKnex.getInstance()
            .insert(userPreferenceReflectToCreate)
            .into(tableName)
            .catch((err: ErrorDatabase) => {
                throw new ErrorEntity(MessageError.SERVER_DATABASE_ERROR, err?.sqlMessage as string, err?.code as string);
            });
    }

    /**
     * Delete UserPreference
     * @param userPreferenceReflectToFind
     */
    public static async delete(userPreferenceReflectToFind: Partial<IUserPreference>) {
        return DatabaseKnex.getInstance()
            .delete()
            .where(userPreferenceReflectToFind)
            .from(tableName)
            .catch((err: ErrorDatabase) => {
                throw new ErrorEntity(MessageError.SERVER_DATABASE_ERROR, err?.sqlMessage as string, err?.code as string);
            });
    }

    /**
     * Transaction Get UserPreference
     * @param userPreferenceReflectToFind
     * @param columns
     * @param trx
     * @return Promise<IUserPreference[]>
     */
    public static async transactionGet(userPreferenceReflectToFind: Partial<IUserPreference>, columns: Partial<IColumnsUserPreference>, trx: Transaction) : Promise<IUserPreference[]> {
        return DatabaseKnex.getInstance()
            .select(transformColumnsToArray(columns))
            .where(userPreferenceReflectToFind).from(tableName)
            .transacting(trx)
            .catch((err: ErrorDatabase) => {
                throw new ErrorEntity(MessageError.SERVER_DATABASE_ERROR, err?.sqlMessage as string, err?.code as string);
            });
    }

    public static async transactionGetAll(columns: Partial<IColumnsUserPreference>, trx: Transaction) : Promise<IUserPreference[]> {
        return DatabaseKnex.getInstance()
            .select(transformColumnsToArray(columns))
            .from(tableName)
            .transacting(trx)
            .catch((err: ErrorDatabase) => {
                throw new ErrorEntity(MessageError.SERVER_DATABASE_ERROR, err?.sqlMessage as string, err?.code as string);
            });
    }

    public static async transactionGetFKPreference(columns: Partial<IColumnsUserPreference>, trx: Transaction) : Promise<IPreference[]> {
        return DatabaseKnex.getInstance()
            .select(transformColumnsToArray(columns))
            .from(tableName)
            .leftJoin('PREFERENCE', 'USER_PREFERENCE.preferenceId', 'PREFERENCE.id')
            .transacting(trx)
            .catch((err: ErrorDatabase) => {
                throw new ErrorEntity(MessageError.SERVER_DATABASE_ERROR, err?.sqlMessage as string, err?.code as string);
            });
    }

    /**
     * Transaction Update UserPreference
     * @param userPreferenceReflectToUpdate
     * @param userPreferenceReflectToFind
     * @param trx
     */
    public static async transactionUpdate(userPreferenceReflectToUpdate: Partial<IUserPreference>, userPreferenceReflectToFind: Partial<IUserPreference>, trx: Transaction) {
        return DatabaseKnex.getInstance()
            .update(userPreferenceReflectToUpdate)
            .where(userPreferenceReflectToFind)
            .from(tableName)
            .transacting(trx)
            .catch((err: ErrorDatabase) => {
                throw new ErrorEntity(MessageError.SERVER_DATABASE_ERROR, err?.sqlMessage as string, err?.code as string);
            });
    }

    /**
     * Transaction Create UserPreference
     * @param userPreferenceReflectToCreate
     * @param trx
     */
    public static async transactionCreate(userPreferenceReflectToCreate: Partial<IUserPreference> | Partial<IUserPreference>[], trx: Transaction) {
        return DatabaseKnex.getInstance()
            .insert(userPreferenceReflectToCreate)
            .into(tableName)
            .transacting(trx)
            .catch((err: ErrorDatabase) => {
                throw new ErrorEntity(MessageError.SERVER_DATABASE_ERROR, err?.sqlMessage as string, err?.code as string);
            });
    }

    /**
     * Transaction Delete UserPreference
     * @param userPreferenceReflectToFind
     * @param trx
     */
    public static async transactionDelete(userPreferenceReflectToFind: Partial<IUserPreference>, trx: Transaction)  {
        return DatabaseKnex.getInstance()
            .delete()
            .where(userPreferenceReflectToFind)
            .from(tableName)
            .transacting(trx)
            .catch((err: ErrorDatabase) => {
                throw new ErrorEntity(MessageError.SERVER_DATABASE_ERROR, err?.sqlMessage as string, err?.code as string);
            });
    }
}


