/**
 * Local Modules
 */
import { transformColumnsToArray } from '@/services/actions/queries/ColumnSelectorBuilder';
import { IUser } from '@/models';
import { DatabaseKnex, ErrorDatabase, Transaction } from '@/services';
import { ErrorEntity, MessageError } from '@/utils';

/**
 * IColumnUser
 */
export interface IColumnsUser {
    email: boolean;
    username: boolean;
    password: boolean;
    activityMessage: boolean;
    isConnected: boolean;
    isBlackListed: boolean;
    createdAt: boolean | string;
    uuid: boolean | string;
}

/**
 * Table Name
 */
export const tableName = 'USER';

export class User {
    /**
     * Get User
     * @param userReflectToFind
     * @param columns
     * @return Promise<IUser[]>
     */
    public static async get(userReflectToFind: Partial<IUser>, columns: Partial<IColumnsUser>): Promise<IUser[]> {
        return DatabaseKnex.getInstance()
            .select(transformColumnsToArray(columns))
            .where(userReflectToFind).from(tableName)
            .catch((err: ErrorDatabase) => {
                throw new ErrorEntity(MessageError.SERVER_DATABASE_ERROR, err?.sqlMessage as string, err?.code as string);
            });
    }

    /**
     * Update User
     * @param userReflectToUpdate
     * @param userReflectToFind
     */
    public static async update(userReflectToUpdate: Partial<IUser>, userReflectToFind: Partial<IUser>) {
        return DatabaseKnex.getInstance()
            .update(userReflectToUpdate)
            .where(userReflectToFind)
            .from(tableName)
            .catch((err: ErrorDatabase) => {
                throw new ErrorEntity(MessageError.SERVER_DATABASE_ERROR, err?.sqlMessage as string, err?.code as string);
            });
    }

    /**
     * Create User
     * @param userReflectToCreate
     */
    public static async create(userReflectToCreate: Partial<IUser>) {
        return DatabaseKnex.getInstance()
            .insert(userReflectToCreate)
            .into(tableName)
            .catch((err: ErrorDatabase) => {
                throw new ErrorEntity(MessageError.SERVER_DATABASE_ERROR, err?.sqlMessage as string, err?.code as string);
            });
    }

    /**
     * Delete User
     * @param userReflectToFind
     */
    public static async delete(userReflectToFind: Partial<IUser>) {
        return DatabaseKnex.getInstance()
            .delete()
            .where(userReflectToFind)
            .from(tableName)
            .catch((err: ErrorDatabase) => {
                throw new ErrorEntity(MessageError.SERVER_DATABASE_ERROR, err?.sqlMessage as string, err?.code as string);
            });
    }

    /**
     * Transaction Get User
     * @param userReflectToFind
     * @param columns
     * @param trx
     * @return Promise<IUser[]>
     */
    public static async transactionGet(userReflectToFind: Partial<IUser>, columns: Partial<IColumnsUser>, trx: Transaction): Promise<IUser[]> {
        return DatabaseKnex.getInstance()
            .select(transformColumnsToArray(columns))
            .where(userReflectToFind).from(tableName)
            .transacting(trx)
            .catch((err: ErrorDatabase) => {
                throw new ErrorEntity(MessageError.SERVER_DATABASE_ERROR, err?.sqlMessage as string, err?.code as string);
            });
    }

    /**
     * Transaction Update User
     * @param userReflectToUpdate
     * @param userReflectToFind
     * @param trx
     */
    public static async transactionUpdate(userReflectToUpdate: Partial<IUser>, userReflectToFind: Partial<IUser>, trx: Transaction) {
        return DatabaseKnex.getInstance()
            .update(userReflectToUpdate)
            .into(tableName)
            .where(userReflectToFind)
            .transacting(trx)
            .catch((err: ErrorDatabase) => {
                throw new ErrorEntity(MessageError.SERVER_DATABASE_ERROR, err?.sqlMessage as string, err?.code as string);
            });
    }

    /**
     * Transaction Create User
     * @param userReflectToCreate
     * @param trx
     */
    public static async transactionCreate(userReflectToCreate: Partial<IUser>, trx: Transaction) {
        return DatabaseKnex.getInstance()
            .insert(userReflectToCreate)
            .into(tableName)
            .transacting(trx)
            .catch((err: ErrorDatabase) => {
                throw new ErrorEntity(MessageError.SERVER_DATABASE_ERROR, err?.sqlMessage as string, err?.code as string);
            });
    }

    /**
     * Transaction Delete User
     * @param userReflectToFind
     * @param trx
     */
    public static async transactionDelete(userReflectToFind: Partial<IUser>, trx: Transaction) {
        return DatabaseKnex.getInstance()
            .delete()
            .where(userReflectToFind)
            .from(tableName)
            .transacting(trx)
            .catch((err: ErrorDatabase) => {
                throw new ErrorEntity(MessageError.SERVER_DATABASE_ERROR, err?.sqlMessage as string, err?.code as string);
            });
    }
}


