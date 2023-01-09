/**
 * Local Modules
 */
import { transformColumnsToArray } from '@/services/actions/queries/ColumnSelectorBuilder';
import { IRole } from '@/models';
import { DatabaseKnex, ErrorDatabase, Transaction } from '@/services';
import { ErrorEntity, MessageError } from '@/utils';

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
            .catch((err: ErrorDatabase) => {
                throw new ErrorEntity(MessageError.SERVER_DATABASE_ERROR, err?.sqlMessage as string, err?.code as string);
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
                throw new ErrorEntity(MessageError.SERVER_DATABASE_ERROR, err?.sqlMessage as string, err?.code as string);
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
                throw new ErrorEntity(MessageError.SERVER_DATABASE_ERROR, err?.sqlMessage as string, err?.code as string);
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
                throw new ErrorEntity(MessageError.SERVER_DATABASE_ERROR, err?.sqlMessage as string, err?.code as string);
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
            .transacting(trx)
            .catch((err: ErrorDatabase) => {
                throw new ErrorEntity(MessageError.SERVER_DATABASE_ERROR, err?.sqlMessage as string, err?.code as string);
            });
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
            .transacting(trx)
            .catch((err: ErrorDatabase) => {
                throw new ErrorEntity(MessageError.SERVER_DATABASE_ERROR, err?.sqlMessage as string, err?.code as string);
            });
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
            .transacting(trx)
            .catch((err: ErrorDatabase) => {
                throw new ErrorEntity(MessageError.SERVER_DATABASE_ERROR, err?.sqlMessage as string, err?.code as string);
            });
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
            .transacting(trx)
            .catch((err: ErrorDatabase) => {
                throw new ErrorEntity(MessageError.SERVER_DATABASE_ERROR, err?.sqlMessage as string, err?.code as string);
            });
    }
}


