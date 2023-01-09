/**
 * Local Modules
 */
import { transformColumnsToArray } from '@/services/actions/queries/ColumnSelectorBuilder';
import { IRoleModule } from '@/models';
import { DatabaseKnex, ErrorDatabase, Transaction } from '@/services';
import { ErrorEntity, MessageError } from '@/utils';

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
            .catch((err: ErrorDatabase) => {
                throw new ErrorEntity(MessageError.SERVER_DATABASE_ERROR, err?.sqlMessage as string, err?.code as string);
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
                throw new ErrorEntity(MessageError.SERVER_DATABASE_ERROR, err?.sqlMessage as string, err?.code as string);
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
                throw new ErrorEntity(MessageError.SERVER_DATABASE_ERROR, err?.sqlMessage as string, err?.code as string);
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
                throw new ErrorEntity(MessageError.SERVER_DATABASE_ERROR, err?.sqlMessage as string, err?.code as string);
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
            .transacting(trx)
            .catch((err: ErrorDatabase) => {
                throw new ErrorEntity(MessageError.SERVER_DATABASE_ERROR, err?.sqlMessage as string, err?.code as string);
            });
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
            .transacting(trx)
            .catch((err: ErrorDatabase) => {
                throw new ErrorEntity(MessageError.SERVER_DATABASE_ERROR, err?.sqlMessage as string, err?.code as string);
            });
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
            .transacting(trx)
            .catch((err: ErrorDatabase) => {
                throw new ErrorEntity(MessageError.SERVER_DATABASE_ERROR, err?.sqlMessage as string, err?.code as string);
            });
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
            .transacting(trx)
            .catch((err: ErrorDatabase) => {
                throw new ErrorEntity(MessageError.SERVER_DATABASE_ERROR, err?.sqlMessage as string, err?.code as string);
            });
    }
}


