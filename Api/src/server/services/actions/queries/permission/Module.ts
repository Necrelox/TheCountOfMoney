/**
 * Local Modules
 */
import { DatabaseKnex, ErrorDatabase, Transaction } from '@/services';
import { transformColumnsToArray } from '@/services/actions/queries/ColumnSelectorBuilder';
import { IModule } from '@/models';
import { ErrorEntity, MessageError } from '@/utils';

/**
 * IColumnsModule
 */
export interface IColumnsModule {
    moduleName: boolean,
    id: boolean | string,
}
/**
 * Table Name
 */
export const tableName = 'MODULE';

/**
 * Module class : is the class that contains the queries for the table MODULE
 */
export class Module {
    /**
     * Get Module
     * @param moduleReflectToFind
     * @param columns
     * @return Promise<IModule[]>
     */
    public static async get(moduleReflectToFind: Partial<IModule>, columns: Partial<IColumnsModule>) : Promise<IModule[]> {
        return DatabaseKnex.getInstance()
            .select(transformColumnsToArray(columns))
            .where(moduleReflectToFind).from(tableName)
            .catch((err: ErrorDatabase) => {
                throw new ErrorEntity(MessageError.SERVER_DATABASE_ERROR, err?.sqlMessage as string, err?.code as string);
            });
    }

    /**
     * Update Module
     * @param moduleReflectToUpdate
     * @param moduleReflectToFind
     */
    public static async update(moduleReflectToUpdate: Partial<IModule>, moduleReflectToFind: Partial<IModule>) {
        return DatabaseKnex.getInstance()
            .update(moduleReflectToUpdate)
            .where(moduleReflectToFind)
            .from(tableName)
            .catch((err: ErrorDatabase) => {
                throw new ErrorEntity(MessageError.SERVER_DATABASE_ERROR, err?.sqlMessage as string, err?.code as string);
            });
    }

    /**
     * Create Module
     * @param moduleReflectToCreate
     */
    public static async create(moduleReflectToCreate: Partial<IModule>) {
        return DatabaseKnex.getInstance()
            .insert(moduleReflectToCreate)
            .into(tableName)
            .catch((err: ErrorDatabase) => {
                throw new ErrorEntity(MessageError.SERVER_DATABASE_ERROR, err?.sqlMessage as string, err?.code as string);
            });
    }

    /**
     * Delete Module
     * @param moduleReflectToFind
     */
    public static async delete(moduleReflectToFind: Partial<IModule>) {
        return DatabaseKnex.getInstance()
            .delete()
            .where(moduleReflectToFind)
            .from(tableName)
            .catch((err: ErrorDatabase) => {
                throw new ErrorEntity(MessageError.SERVER_DATABASE_ERROR, err?.sqlMessage as string, err?.code as string);
            });
    }

    /**
     * Transaction Get Module
     * @param moduleReflectToFind
     * @param columns
     * @param trx
     * @return Promise<IModule[]>
     */
    public static async transactionGet(moduleReflectToFind: Partial<IModule>, columns: Partial<IColumnsModule>, trx: Transaction) : Promise<IModule[]> {
        return DatabaseKnex.getInstance()
            .select(transformColumnsToArray(columns))
            .where(moduleReflectToFind).from(tableName)
            .transacting(trx)
            .catch((err: ErrorDatabase) => {
                throw new ErrorEntity(MessageError.SERVER_DATABASE_ERROR, err?.sqlMessage as string, err?.code as string);
            });
    }

    /**
     * Transaction Update Module
     * @param moduleReflectToUpdate
     * @param moduleReflectToFind
     * @param trx
     */
    public static async transactionUpdate(moduleReflectToUpdate: Partial<IModule>, moduleReflectToFind: Partial<IModule>, trx: Transaction) {
        return DatabaseKnex.getInstance()
            .update(moduleReflectToUpdate)
            .where(moduleReflectToFind)
            .from(tableName)
            .transacting(trx)
            .catch((err: ErrorDatabase) => {
                throw new ErrorEntity(MessageError.SERVER_DATABASE_ERROR, err?.sqlMessage as string, err?.code as string);
            });
    }

    /**
     * Transaction Create Module
     * @param moduleReflectToCreate
     * @param trx
     */
    public static async transactionCreate(moduleReflectToCreate: Partial<IModule>, trx: Transaction) {
        return DatabaseKnex.getInstance()
            .insert(moduleReflectToCreate)
            .into(tableName)
            .transacting(trx)
            .catch((err: ErrorDatabase) => {
                throw new ErrorEntity(MessageError.SERVER_DATABASE_ERROR, err?.sqlMessage as string, err?.code as string);
            });
    }

    /**
     * Transaction Delete Module
     * @param moduleReflectToFind
     * @param trx
     */
    public static async transactionDelete(moduleReflectToFind: Partial<IModule>, trx: Transaction)  {
        return DatabaseKnex.getInstance()
            .delete()
            .where(moduleReflectToFind)
            .from(tableName)
            .transacting(trx)
            .catch((err: ErrorDatabase) => {
                throw new ErrorEntity(MessageError.SERVER_DATABASE_ERROR, err?.sqlMessage as string, err?.code as string);
            });
    }
}


