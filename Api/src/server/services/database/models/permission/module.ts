/**
 * Local Modules
 */
import { DatabaseKnex, ErrorDatabase, Transaction } from '../../DatabaseKnex';
import { transformColumnsToArray } from '../columnSelectorBuilder';
import { IModule } from '../../../../models';

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
            .then((rows: IModule[]) => rows)
            .catch((err: ErrorDatabase) => {
                throw {
                    code: err?.code,
                    message: DatabaseKnex.createBetterSqlMessageError(err?.code as string, err?.sqlMessage as string),
                    sql: err?.sql,
                };
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
                throw {
                    code: err?.code,
                    message: DatabaseKnex.createBetterSqlMessageError(err?.code as string, err?.sqlMessage as string),
                    sql: err?.sql,
                };
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
                throw {
                    code: err?.code,
                    message: DatabaseKnex.createBetterSqlMessageError(err?.code as string, err?.sqlMessage as string),
                    sql: err?.sql,
                };
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
                throw {
                    code: err?.code,
                    message: DatabaseKnex.createBetterSqlMessageError(err?.code as string, err?.sqlMessage as string),
                    sql: err?.sql,
                };
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
            .transacting(trx);
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
            .transacting(trx);
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
            .transacting(trx);
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
            .transacting(trx);
    }
}


