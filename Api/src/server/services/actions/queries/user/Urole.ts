/**
 * Local Modules
 */
import { transformColumnsToArray } from '@/services/actions/queries/ColumnSelectorBuilder';
import { IURole, IURoleFKUser, IURoleFKRole, IURoleFKRoleFKRoleModuleFKModule } from '@/models';
import { IColumnsRole, tableName as roleTable } from '../permission/Role';
import { IColumnsModule, tableName as moduleTable } from '../permission/Module';
import { IColumnsRoleModule, tableName as roleModuleTable } from '../permission/RoleModule';
import { DatabaseKnex, ErrorDatabase, Transaction } from '@/services';
import { IColumnsUser, tableName as userTable } from './User';
import { ErrorEntity, MessageError } from '@/utils';

/**
 * IColumnsURole
 */
export interface IColumnsURole {
    role: boolean;
    userUuid: boolean;
    id: boolean | string;
}

/**
 * IColumnsURoleFKUser
 */
export interface IColumnsURoleFKUser extends IColumnsURole, IColumnsUser {
}

/**
 * IColumnsURoleFKRole
 */
export interface IColumnsURoleFKRole extends IColumnsURole, IColumnsRole {
}

/** IColumnsURoleFKRoleFKRoleModuleFKModule */
export interface IColumnsURoleFKRoleFKRoleModuleFKModule extends IColumnsURole, IColumnsRole, IColumnsRoleModule, IColumnsModule {
}

/**
 * Table Name
 */
export const tableName = 'USER_ROLE';

/**
 * Role class : is the class that contains the queries for the table ROLE
 */
export class Urole {

    /**
     * Get Urole
     * @param uRoleReflectToFind
     * @param columns
     * @return Promise<IURole[]>
     */
    public static async get(uRoleReflectToFind: Partial<IURole>, columns: Partial<IColumnsURole>): Promise<IURole[]> {
        return DatabaseKnex.getInstance()
            .select(transformColumnsToArray(columns))
            .where(uRoleReflectToFind).from(tableName)
            .catch((err: ErrorDatabase) => {
                throw new ErrorEntity(MessageError.SERVER_DATABASE_ERROR, err?.sqlMessage as string, err?.code as string);
            });
    }

    /**
     * Get Urole FK User
     * @param uRoleReflectToFind
     * @param columns
     * @return Promise<IURoleFKUser[]>
     */
    public static async getFKUser(uRoleReflectToFind: Partial<IURole>, columns: Partial<IColumnsURoleFKUser>): Promise<IURoleFKUser[]> {
        return DatabaseKnex.getInstance()
            .select(transformColumnsToArray(columns))
            .where(uRoleReflectToFind).from(tableName)
            .join(userTable, tableName + '.userUuid', '=', userTable + '.uuid')
            .catch((err: ErrorDatabase) => {
                throw new ErrorEntity(MessageError.SERVER_DATABASE_ERROR, err?.sqlMessage as string, err?.code as string);
            });
    }

    /**
     * Get Urole FK Role
     * @param uRoleReflectToFind
     * @param columns
     * @return Promise<IURoleFKRole[]>
     */
    public static async getFKRole(uRoleReflectToFind: Partial<IURole>, columns: Partial<IColumnsURoleFKUser>): Promise<IURoleFKRole[]> {
        return DatabaseKnex.getInstance()
            .select(transformColumnsToArray(columns))
            .where(uRoleReflectToFind).from(tableName)
            .join(roleTable, tableName + '.roleId', '=', roleTable + '.id')
            .catch((err: ErrorDatabase) => {
                throw new ErrorEntity(MessageError.SERVER_DATABASE_ERROR, err?.sqlMessage as string, err?.code as string);
            });
    }

    /** Get Urole FK Role FK RoleModule FK Module */
    public static async getFKRoleFKRoleModuleFKModule(uRoleReflectToFind: Partial<IURole>, columns: Partial<IColumnsURoleFKRoleFKRoleModuleFKModule>): Promise<IURoleFKRoleFKRoleModuleFKModule[]> {
        return DatabaseKnex.getInstance()
            .select(transformColumnsToArray(columns))
            .where(uRoleReflectToFind).from(tableName)
            .join(roleTable, tableName + '.roleId', '=', roleTable + '.id')
            .join(roleModuleTable, roleTable + '.id', '=', roleModuleTable + '.roleId')
            .join(moduleTable, roleModuleTable + '.moduleId', '=', moduleTable + '.id')
            .catch((err: ErrorDatabase) => {
                throw new ErrorEntity(MessageError.SERVER_DATABASE_ERROR, err?.sqlMessage as string, err?.code as string);
            });
    }

    /**
     * Update Urole
     * @param roleReflectToUpdate
     * @param uRoleReflectToFind
     */
    public static async update(roleReflectToUpdate: Partial<IURole>, uRoleReflectToFind: Partial<IURole>) {
        return DatabaseKnex.getInstance()
            .update(roleReflectToUpdate)
            .where(uRoleReflectToFind)
            .from(tableName)
            .catch((err: ErrorDatabase) => {
                throw new ErrorEntity(MessageError.SERVER_DATABASE_ERROR, err?.sqlMessage as string, err?.code as string);
            });
    }

    /**
     * Create Urole
     * @param roleReflectToCreate
     */
    public static async create(roleReflectToCreate: Partial<IURole>) {
        return DatabaseKnex.getInstance()
            .insert(roleReflectToCreate)
            .into(tableName)
            .catch((err: ErrorDatabase) => {
                throw new ErrorEntity(MessageError.SERVER_DATABASE_ERROR, err?.sqlMessage as string, err?.code as string);
            });
    }

    /**
     * Delete Urole
     * @param uRoleReflectToFind
     */
    public static async delete(uRoleReflectToFind: Partial<IURole>) {
        return DatabaseKnex.getInstance()
            .delete()
            .where(uRoleReflectToFind)
            .from(tableName)
            .catch((err: ErrorDatabase) => {
                throw new ErrorEntity(MessageError.SERVER_DATABASE_ERROR, err?.sqlMessage as string, err?.code as string);
            });
    }

    /**
     * Transaction Get Urole
     * @param uRoleReflectToFind
     * @param columns
     * @param trx
     * @return Promise<IURole[]>
     */
    public static async transactionGet(uRoleReflectToFind: Partial<IURole>, columns: Partial<IColumnsURole>, trx: Transaction): Promise<IURole[]> {
        return DatabaseKnex.getInstance()
            .select(transformColumnsToArray(columns))
            .where(uRoleReflectToFind).from(tableName)
            .transacting(trx)
            .catch((err: ErrorDatabase) => {
                throw new ErrorEntity(MessageError.SERVER_DATABASE_ERROR, err?.sqlMessage as string, err?.code as string);
            });
    }

    /**
     * Transaction Get Urole FK User
     * @param uRoleReflectToFind
     * @param columns
     * @param trx
     * @return Promise<IURoleFKUser[]>
     */
    public static async transactionGetFKUser(uRoleReflectToFind: Partial<IURole>, columns: Partial<IColumnsURoleFKUser>, trx: Transaction): Promise<IURoleFKUser[]> {
        return DatabaseKnex.getInstance()
            .select(transformColumnsToArray(columns))
            .where(uRoleReflectToFind).from(tableName)
            .join(userTable, tableName + '.userUuid', '=', userTable + '.uuid')
            .transacting(trx)
            .catch((err: ErrorDatabase) => {
                throw new ErrorEntity(MessageError.SERVER_DATABASE_ERROR, err?.sqlMessage as string, err?.code as string);
            });
    }

    /**
     * Transaction Get Urole FK User
     * @param uRoleReflectToFind
     * @param columns
     * @param trx
     * @return Promise<IURoleFKRole[]>
     */
    public static async transactionGetFKRole(uRoleReflectToFind: Partial<IURole>, columns: Partial<IColumnsURoleFKUser>, trx: Transaction): Promise<IURoleFKRole[]> {
        return DatabaseKnex.getInstance()
            .select(transformColumnsToArray(columns))
            .where(uRoleReflectToFind).from(tableName)
            .join(roleTable, tableName + '.roleId', '=', roleTable + '.id')
            .transacting(trx)
            .catch((err: ErrorDatabase) => {
                throw new ErrorEntity(MessageError.SERVER_DATABASE_ERROR, err?.sqlMessage as string, err?.code as string);
            });
    }

    /** Transaction Get Urole FK Role FK RoleModule FK Module */
    public static async transactionGetFKRoleFKRoleModuleFKModule(uRoleReflectToFind: Partial<IURole>, columns: Partial<IColumnsURoleFKRoleFKRoleModuleFKModule>, trx: Transaction): Promise<IURoleFKRoleFKRoleModuleFKModule[]> {
        return DatabaseKnex.getInstance()
            .select(transformColumnsToArray(columns))
            .where(uRoleReflectToFind).from(tableName)
            .join(roleTable, tableName + '.roleId', '=', roleTable + '.id')
            .join(roleModuleTable, roleTable + '.id', '=', roleModuleTable + '.roleId')
            .join(moduleTable, roleModuleTable + '.moduleId', '=', moduleTable + '.id')
            .transacting(trx)
            .catch((err: ErrorDatabase) => {
                throw new ErrorEntity(MessageError.SERVER_DATABASE_ERROR, err?.sqlMessage as string, err?.code as string);
            });
    }

    /**
     * Transaction Update Urole
     * @param roleReflectToUpdate
     * @param uRoleReflectToFind
     * @param trx
     */
    public static async transactionUpdate(roleReflectToUpdate: Partial<IURole>, uRoleReflectToFind: Partial<IURole>, trx: Transaction) {
        return DatabaseKnex.getInstance()
            .update(roleReflectToUpdate)
            .where(uRoleReflectToFind)
            .from(tableName)
            .transacting(trx)
            .catch((err: ErrorDatabase) => {
                throw new ErrorEntity(MessageError.SERVER_DATABASE_ERROR, err?.sqlMessage as string, err?.code as string);
            });
    }

    /**
     * Transaction Create Urole
     * @param roleReflectToCreate
     * @param trx
     */
    public static async transactionCreate(roleReflectToCreate: Partial<IURole>, trx: Transaction) {
        return DatabaseKnex.getInstance()
            .insert(roleReflectToCreate)
            .into(tableName)
            .transacting(trx)
            .catch((err: ErrorDatabase) => {
                throw new ErrorEntity(MessageError.SERVER_DATABASE_ERROR, err?.sqlMessage as string, err?.code as string);
            });
    }

    /**
     * Transaction Delete Urole
     * @param uRoleReflectToFind
     * @param trx
     */
    public static async transactionDelete(uRoleReflectToFind: Partial<IURole>, trx: Transaction) {
        return DatabaseKnex.getInstance()
            .delete()
            .where(uRoleReflectToFind)
            .from(tableName)
            .transacting(trx)
            .catch((err: ErrorDatabase) => {
                throw new ErrorEntity(MessageError.SERVER_DATABASE_ERROR, err?.sqlMessage as string, err?.code as string);
            });
    }
}
