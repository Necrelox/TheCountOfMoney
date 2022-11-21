/**
 * Local Modules
 */
import { DatabaseKnex, ErrorDatabase, Transaction } from '../../DatabaseKnex';
import { transformColumnsToArray } from '../columnSelectorBuilder';
import { IRoleModule } from '../../../../models';

/**
 * IColumnsRoleModule
 */
export interface IColumnsRoleModule {
    moduleId: boolean,
    roleId: boolean,
    id: boolean | string,
}
/**
 * Table Name
 */
export const tableName = 'ROLE_MODULE';

/**
 * RoleModule class : is the class that contains the queries for the table ROLE_MODULE
 */
export class RoleModule {
    /**
     * Get RoleModule
     * @param roleModuleReflectToFind
     * @param columns
     * @return Promise<IRoleModule[]>
     */
    public static async get(roleModuleReflectToFind: Partial<IRoleModule>, columns: Partial<IColumnsRoleModule>) : Promise<IRoleModule[]> {
        return DatabaseKnex.getInstance()
            .select(transformColumnsToArray(columns))
            .where(roleModuleReflectToFind).from(tableName)
            .then((rows: IRoleModule[]) => rows)
            .catch((err: ErrorDatabase) => {
                throw {
                    code: err?.code,
                    message: DatabaseKnex.createBetterSqlMessageError(err?.code as string, err?.sqlMessage as string),
                    sql: err?.sql,
                };
            });
    }

    /**
     * Update RoleModule
     * @param roleModuleReflectToUpdate
     * @param roleModuleReflectToFind
     */
    public static async update(roleModuleReflectToUpdate: Partial<IRoleModule>, roleModuleReflectToFind: Partial<IRoleModule>) {
        return DatabaseKnex.getInstance()
            .update(roleModuleReflectToUpdate)
            .where(roleModuleReflectToFind)
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
     * Create RoleModule
     * @param roleModuleReflectToCreate
     */
    public static async create(roleModuleReflectToCreate: Partial<IRoleModule>) {
        return DatabaseKnex.getInstance()
            .insert(roleModuleReflectToCreate)
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
     * Delete RoleModule
     * @param roleModuleReflectToFind
     */
    public static async delete(roleModuleReflectToFind: Partial<IRoleModule>) {
        return DatabaseKnex.getInstance()
            .delete()
            .where(roleModuleReflectToFind)
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
     * Transaction Get RoleModule
     * @param roleModuleReflectToFind
     * @param columns
     * @param trx
     * @return Promise<IRoleModule[]>
     */
    public static async transactionGet(roleModuleReflectToFind: Partial<IRoleModule>, columns: Partial<IColumnsRoleModule>, trx: Transaction) : Promise<IRoleModule[]> {
        return DatabaseKnex.getInstance()
            .select(transformColumnsToArray(columns))
            .where(roleModuleReflectToFind).from(tableName)
            .transacting(trx);
    }

    /**
     * Transaction Update RoleModule
     * @param roleModuleReflectToUpdate
     * @param roleModuleReflectToFind
     * @param trx
     */
    public static async transactionUpdate(roleModuleReflectToUpdate: Partial<IRoleModule>, roleModuleReflectToFind: Partial<IRoleModule>, trx: Transaction) {
        return DatabaseKnex.getInstance()
            .update(roleModuleReflectToUpdate)
            .where(roleModuleReflectToFind)
            .from(tableName)
            .transacting(trx);
    }

    /**
     * Transaction Create RoleModule
     * @param roleModuleReflectToCreate
     * @param trx
     */
    public static async transactionCreate(roleModuleReflectToCreate: Partial<IRoleModule>, trx: Transaction) {
        return DatabaseKnex.getInstance()
            .insert(roleModuleReflectToCreate)
            .into(tableName)
            .transacting(trx);
    }

    /**
     * Transaction Delete RoleModule
     * @param roleModuleReflectToFind
     * @param trx
     */
    public static async transactionDelete(roleModuleReflectToFind: Partial<IRoleModule>, trx: Transaction)  {
        return DatabaseKnex.getInstance()
            .delete()
            .where(roleModuleReflectToFind)
            .from(tableName)
            .transacting(trx);
    }
}


