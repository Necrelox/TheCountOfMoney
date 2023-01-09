/**
 * Local Modules
 */
import { ILogo, ILogoFKUser } from '@/models';
import { transformColumnsToArray } from '@/services/actions/queries/ColumnSelectorBuilder';
import { IColumnsUser, tableName as userTable } from './User';
import { DatabaseKnex, ErrorDatabase, Transaction } from '@/services';
import { ErrorEntity, MessageError } from '@/utils';

/**
 * IColumnLogo
 */
export interface IColumnsLogo {
    path: boolean;
    createdAt: boolean | string;
    seed: boolean;
    sizeMo: boolean;
    active: boolean;
    userUuid: boolean;
    uuid: boolean | string;
}

/**
 * IColumnLogoFKUser
 */
export interface IColumnsLogoFKUser extends IColumnsLogo, IColumnsUser {}

/**
 * Table Name
 */
export const tableName = 'USER_LOGO';

/**
 * Logo class : is the class that contains the queries for the table USER_LOGO
 */
export class Logo {
    /**
     * Get Logo
     * @param logoReflectToFind
     * @param columns
     */
    public static async get(logoReflectToFind: Partial<ILogo>, columns: Partial<IColumnsLogo>) : Promise<ILogo[]> {
        return DatabaseKnex.getInstance()
            .select(transformColumnsToArray(columns))
            .where(logoReflectToFind).from(tableName)
            .catch((err: ErrorDatabase) => {
                throw new ErrorEntity(MessageError.SERVER_DATABASE_ERROR, err?.sqlMessage as string, err?.code as string);
            });
    }

    /**
     * Get Logo FK user
     * @param logoReflectToFind
     * @param columns
     * @return Promise<ILogoFKUser[]>
     */
    public static async getFKUser(logoReflectToFind: Partial<ILogo>, columns: Partial<IColumnsLogoFKUser>) : Promise<ILogoFKUser[]> {
        return DatabaseKnex.getInstance()
            .select(transformColumnsToArray(columns))
            .where(logoReflectToFind).from(tableName)
            .join(userTable, `${tableName}.userUuid`, '=', `${userTable}.uuid`)
            .catch((err: ErrorDatabase) => {
                throw new ErrorEntity(MessageError.SERVER_DATABASE_ERROR, err?.sqlMessage as string, err?.code as string);
            });
    }

    /**
     * Update Logo
     * @param logoReflectToUpdate
     * @param logoReflectToFind
     */
    public static async update(logoReflectToUpdate: Partial<ILogo>, logoReflectToFind: Partial<ILogo>) {
        return DatabaseKnex.getInstance()
            .update(logoReflectToUpdate)
            .where(logoReflectToFind)
            .from(tableName)
            .catch((err: ErrorDatabase) => {
                throw new ErrorEntity(MessageError.SERVER_DATABASE_ERROR, err?.sqlMessage as string, err?.code as string);
            });
    }

    /**
     * Create Logo
     * @param logoReflectToCreate
     */
    public static async create(logoReflectToCreate: Partial<ILogo>) {
        return DatabaseKnex.getInstance()
            .insert(logoReflectToCreate)
            .into(tableName)
            .catch((err: ErrorDatabase) => {
                throw new ErrorEntity(MessageError.SERVER_DATABASE_ERROR, err?.sqlMessage as string, err?.code as string);
            });
    }

    /**
     * Delete Logo
     * @param logoReflectToFind
     */
    public static async delete(logoReflectToFind: Partial<ILogo>) {
        return DatabaseKnex.getInstance()
            .delete()
            .where(logoReflectToFind)
            .from(tableName)
            .catch((err: ErrorDatabase) => {
                throw new ErrorEntity(MessageError.SERVER_DATABASE_ERROR, err?.sqlMessage as string, err?.code as string);
            });
    }

    /**
     * Transaction get Logo
     * @param logoReflectToFind
     * @param columns
     * @param trx
     * @return Promise<ILogo[]>
     */
    public static async transactionGet(logoReflectToFind: Partial<ILogo>, columns: Partial<IColumnsLogo>, trx: Transaction) : Promise<ILogo[]> {
        return DatabaseKnex.getInstance()
            .select(transformColumnsToArray(columns))
            .where(logoReflectToFind).from(tableName)
            .transacting(trx)
            .catch((err: ErrorDatabase) => {
                throw new ErrorEntity(MessageError.SERVER_DATABASE_ERROR, err?.sqlMessage as string, err?.code as string);
            });
    }

    /**
     * Transaction get Logo FK user
     * @param logoReflectToFind
     * @param columns
     * @param trx
     * @return Promise<ILogoFKUser[]>
     */
    public static async transactionGetFKUser(logoReflectToFind: Partial<ILogo>, columns: Partial<IColumnsLogoFKUser>, trx: Transaction) : Promise<ILogoFKUser[]> {
        return DatabaseKnex.getInstance()
            .select(transformColumnsToArray(columns))
            .where(logoReflectToFind).from(tableName)
            .join(userTable, `${tableName}.userUuid`, '=', `${userTable}.uuid`)
            .transacting(trx)
            .catch((err: ErrorDatabase) => {
                throw new ErrorEntity(MessageError.SERVER_DATABASE_ERROR, err?.sqlMessage as string, err?.code as string);
            });
    }

    /**
     * Transaction update Logo
     * @param logoReflectToUpdate
     * @param logoReflectToFind
     * @param trx
     */
    public static async transactionUpdate(logoReflectToUpdate: Partial<ILogo>, logoReflectToFind: Partial<ILogo>, trx: Transaction) {
        return DatabaseKnex.getInstance()
            .update(logoReflectToUpdate)
            .where(logoReflectToFind)
            .from(tableName)
            .transacting(trx)
            .catch((err: ErrorDatabase) => {
                throw new ErrorEntity(MessageError.SERVER_DATABASE_ERROR, err?.sqlMessage as string, err?.code as string);
            });
    }

    /**
     * Transaction create Logo
     * @param logoReflectToCreate
     * @param trx
     */
    public static async transactionCreate(logoReflectToCreate: Partial<ILogo>, trx: Transaction) {
        return DatabaseKnex.getInstance()
            .insert(logoReflectToCreate)
            .into(tableName)
            .transacting(trx)
            .catch((err: ErrorDatabase) => {
                throw new ErrorEntity(MessageError.SERVER_DATABASE_ERROR, err?.sqlMessage as string, err?.code as string);
            });
    }

    /**
     * Transaction delete Logo
     * @param logoReflectToFind
     * @param trx
     */
    public static async transactionDelete(logoReflectToFind: Partial<ILogo>, trx: Transaction) {
        return DatabaseKnex.getInstance()
            .delete()
            .where(logoReflectToFind)
            .from(tableName)
            .transacting(trx)
            .catch((err: ErrorDatabase) => {
                throw new ErrorEntity(MessageError.SERVER_DATABASE_ERROR, err?.sqlMessage as string, err?.code as string);
            });
    }
}


