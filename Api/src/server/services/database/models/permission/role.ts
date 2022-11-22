/**
 * Local Modules
 */
import { DatabaseKnex, ErrorDatabase, Transaction } from '../../DatabaseKnex';
import { transformColumnsToArray } from '../columnSelectorBuilder';
import { IRole } from '../../../../models';

/**
 * IColumnsRole
 */
export interface IColumnsRole {
    name: boolean,
    id: boolean | string,
}
/**
 * Table Name
 */
export const tableName = 'ROLE';

/**
 * Role class : is the class that contains the queries for the table ROLE
 */
export class Role {
    /**
     * Get Role
     * @param roleReflectToFind
     * @param columns
     * @return Promise<IRole[]>
     */
    public static async get(roleReflectToFind: Partial<IRole>, columns: Partial<IColumnsRole>) : Promise<IRole[]> {
        return DatabaseKnex.getInstance()
            .select(transformColumnsToArray(columns))
            .where(roleReflectToFind).from(tableName)
            .then((rows: IRole[]) => rows)
            .catch((err: ErrorDatabase) => {
                throw {
                    code: err?.code,
                    message: DatabaseKnex.createBetterSqlMessageError(err?.code as string, err?.sqlMessage as string),
                    sql: err?.sql,
                };
            });
    }

    /**
     * Update Role
     * @param roleReflectToUpdate
     * @param roleReflectToFind
     */
    public static async update(roleReflectToUpdate: Partial<IRole>, roleReflectToFind: Partial<IRole>) {
        return DatabaseKnex.getInstance()
            .update(roleReflectToUpdate)
            .where(roleReflectToFind)
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
     * Create Role
     * @param roleReflectToCreate
     */
    public static async create(roleReflectToCreate: Partial<IRole>) {
        return DatabaseKnex.getInstance()
            .insert(roleReflectToCreate)
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
     * Delete Role
     * @param roleReflectToFind
     */
    public static async delete(roleReflectToFind: Partial<IRole>) {
        return DatabaseKnex.getInstance()
            .delete()
            .where(roleReflectToFind)
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
     * Transaction Get Role
     * @param roleReflectToFind
     * @param columns
     * @param trx
     * @return Promise<IRole[]>
     */
    public static async transactionGet(roleReflectToFind: Partial<IRole>, columns: Partial<IColumnsRole>, trx: Transaction) : Promise<IRole[]> {
        return DatabaseKnex.getInstance()
            .select(transformColumnsToArray(columns))
            .where(roleReflectToFind).from(tableName)
            .transacting(trx);
    }

    /**
     * Transaction Update Role
     * @param roleReflectToUpdate
     * @param roleReflectToFind
     * @param trx
     */
    public static async transactionUpdate(roleReflectToUpdate: Partial<IRole>, roleReflectToFind: Partial<IRole>, trx: Transaction) {
        return DatabaseKnex.getInstance()
            .update(roleReflectToUpdate)
            .where(roleReflectToFind)
            .from(tableName)
            .transacting(trx);
    }

    /**
     * Transaction Create Role
     * @param roleReflectToCreate
     * @param trx
     */
    public static async transactionCreate(roleReflectToCreate: Partial<IRole>, trx: Transaction) {
        return DatabaseKnex.getInstance()
            .insert(roleReflectToCreate)
            .into(tableName)
            .transacting(trx);
    }

    /**
     * Transaction Delete Role
     * @param roleReflectToFind
     * @param trx
     */
    public static async transactionDelete(roleReflectToFind: Partial<IRole>, trx: Transaction)  {
        return DatabaseKnex.getInstance()
            .delete()
            .where(roleReflectToFind)
            .from(tableName)
            .transacting(trx);
    }
}


