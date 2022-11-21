/**
 * Local Modules
 */
import { DatabaseKnex, ErrorDatabase, Transaction } from '../../DatabaseKnex';
import { transformColumnsToArray } from '../columnSelectorBuilder';
import { IURole, IURoleFKUser, IURoleFKRole, IURoleFKRoleFKRoleModuleFKModule } from '../../../../models';
import { IColumnsRole, tableName as roleTable } from '../permission/role';
import { IColumnsModule, tableName as mmoduleTable } from '../permission/module';
import { IColumnsRoleModule, tableName as roleModuleTable } from '../permission/roleModule';
import { IColumnsUser, tableName as userTable } from './user';

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
export interface IColumnsURoleFKUser extends IColumnsURole, IColumnsUser {}

/**
 * IColumnsURoleFKRole
 */
export interface IColumnsURoleFKRole extends IColumnsURole, IColumnsRole {}

/** IColumnsURoleFKRoleFKRoleModuleFKModule */
export interface IColumnsURoleFKRoleFKRoleModuleFKModule extends IColumnsURole, IColumnsRole, IColumnsRoleModule, IColumnsModule {}

/**
 * Table Name
 */
export const tableName = 'USER_ROLE';

/**
 * Role class : is the class that contains the queries for the table ROLE
 */
export class URole {

    /**
     * Get URole
     * @param uRoleReflectToFind
     * @param columns
     * @return Promise<IURole[]>
     */
    public static async get(uRoleReflectToFind: Partial<IURole>, columns: Partial<IColumnsURole>) : Promise<IURole[]> {
        return DatabaseKnex.getInstance()
            .select(transformColumnsToArray(columns))
            .where(uRoleReflectToFind).from(tableName)
            .then((rows: IURole[]) => rows)
            .catch((err: ErrorDatabase) => {
                throw {
                    code: err?.code,
                    message: DatabaseKnex.createBetterSqlMessageError(err?.code as string, err?.sqlMessage as string),
                    sql: err?.sql,
                };
            });
    }

    /**
     * Get URole FK User
     * @param uRoleReflectToFind
     * @param columns
     * @return Promise<IURoleFKUser[]>
     */
    public static async getFKUser(uRoleReflectToFind: Partial<IURole>, columns: Partial<IColumnsURoleFKUser>) : Promise<IURoleFKUser[]> {
        return DatabaseKnex.getInstance()
            .select(transformColumnsToArray(columns))
            .where(uRoleReflectToFind).from(tableName)
            .join(userTable, tableName + '.userUuid', '=', userTable + '.uuid')
            .then((rows: IURoleFKUser[]) => rows)
            .catch((err: ErrorDatabase) => {
                throw {
                    code: err?.code,
                    message: DatabaseKnex.createBetterSqlMessageError(err?.code as string, err?.sqlMessage as string),
                    sql: err?.sql,
                };
            });
    }

    /**
     * Get URole FK Role
     * @param uRoleReflectToFind
     * @param columns
     * @return Promise<IURoleFKRole[]>
     */
    public static async getFKRole(uRoleReflectToFind: Partial<IURole>, columns: Partial<IColumnsURoleFKUser>) : Promise<IURoleFKRole[]> {
        return DatabaseKnex.getInstance()
            .select(transformColumnsToArray(columns))
            .where(uRoleReflectToFind).from(tableName)
            .join(roleTable, tableName + '.roleId', '=', roleTable + '.id')
            .then((rows: IURoleFKRole[]) => rows)
            .catch((err: ErrorDatabase) => {
                throw {
                    code: err?.code,
                    message: DatabaseKnex.createBetterSqlMessageError(err?.code as string, err?.sqlMessage as string),
                    sql: err?.sql,
                };
            });
    }

    /** Get URole FK Role FK RoleModule FK Module */
    public static async getFKRoleFKRoleModuleFKModule(uRoleReflectToFind: Partial<IURole>, columns: Partial<IColumnsURoleFKRoleFKRoleModuleFKModule>) : Promise<IURoleFKRoleFKRoleModuleFKModule[]> {
        return DatabaseKnex.getInstance()
            .select(transformColumnsToArray(columns))
            .where(uRoleReflectToFind).from(tableName)
            .join(roleTable, tableName + '.roleId', '=', roleTable + '.id')
            .join(roleModuleTable, roleTable + '.id', '=', roleModuleTable + '.roleId')
            .join(mmoduleTable, roleModuleTable + '.moduleId', '=', mmoduleTable + '.id')
            .then((rows: IURoleFKRoleFKRoleModuleFKModule[]) => rows)
            .catch((err: ErrorDatabase) => {
                throw {
                    code: err?.code,
                    message: DatabaseKnex.createBetterSqlMessageError(err?.code as string, err?.sqlMessage as string),
                    sql: err?.sql,
                };
            });
    }

    /**
     * Update URole
     * @param roleReflectToUpdate
     * @param uRoleReflectToFind
     */
    public static async update(roleReflectToUpdate: Partial<IURole>, uRoleReflectToFind: Partial<IURole>) {
        return DatabaseKnex.getInstance()
            .update(roleReflectToUpdate)
            .where(uRoleReflectToFind)
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
     * Create URole
     * @param roleReflectToCreate
     */
    public static async create(roleReflectToCreate: Partial<IURole>) {
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
     * Delete URole
     * @param uRoleReflectToFind
     */
    public static async delete(uRoleReflectToFind: Partial<IURole>) {
        return DatabaseKnex.getInstance()
            .delete()
            .where(uRoleReflectToFind)
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
     * Transaction Get URole
     * @param uRoleReflectToFind
     * @param columns
     * @param trx
     * @return Promise<IURole[]>
     */
    public static async transactionGet(uRoleReflectToFind: Partial<IURole>, columns: Partial<IColumnsURole>, trx: Transaction) : Promise<IURole[]> {
        return DatabaseKnex.getInstance()
            .select(transformColumnsToArray(columns))
            .where(uRoleReflectToFind).from(tableName)
            .transacting(trx);
    }

    /**
     * Transaction Get URole FK User
     * @param uRoleReflectToFind
     * @param columns
     * @param trx
     * @return Promise<IURoleFKUser[]>
     */
    public static async transactionGetFKUser(uRoleReflectToFind: Partial<IURole>, columns: Partial<IColumnsURoleFKUser>, trx: Transaction) : Promise<IURoleFKUser[]> {
        return DatabaseKnex.getInstance()
            .select(transformColumnsToArray(columns))
            .where(uRoleReflectToFind).from(tableName)
            .join(userTable, tableName + '.userUuid', '=', userTable + '.uuid')
            .transacting(trx);
    }

    /**
     * Transaction Get URole FK User
     * @param uRoleReflectToFind
     * @param columns
     * @param trx
     * @return Promise<IURoleFKRole[]>
     */
    public static async transactionGetFKRole(uRoleReflectToFind: Partial<IURole>, columns: Partial<IColumnsURoleFKUser>, trx: Transaction) : Promise<IURoleFKRole[]> {
        return DatabaseKnex.getInstance()
            .select(transformColumnsToArray(columns))
            .where(uRoleReflectToFind).from(tableName)
            .join(roleTable, tableName + '.roleId', '=', roleTable + '.id')
            .transacting(trx);
    }

    /** Transaction Get URole FK Role FK RoleModule FK Module */
    public static async transactionGetFKRoleFKRoleModuleFKModule(uRoleReflectToFind: Partial<IURole>, columns: Partial<IColumnsURoleFKRoleFKRoleModuleFKModule>, trx: Transaction) : Promise<IURoleFKRoleFKRoleModuleFKModule[]> {
        return DatabaseKnex.getInstance()
            .select(transformColumnsToArray(columns))
            .where(uRoleReflectToFind).from(tableName)
            .join(roleTable, tableName + '.roleId', '=', roleTable + '.id')
            .join(roleModuleTable, roleTable + '.id', '=', roleModuleTable + '.roleId')
            .join(mmoduleTable, roleModuleTable + '.moduleId', '=', mmoduleTable + '.id')
            .transacting(trx);
    }

    /**
     * Transaction Update URole
     * @param roleReflectToUpdate
     * @param uRoleReflectToFind
     * @param trx
     */
    public static async transactionUpdate(roleReflectToUpdate: Partial<IURole>, uRoleReflectToFind: Partial<IURole>, trx: Transaction) {
        return DatabaseKnex.getInstance()
            .update(roleReflectToUpdate)
            .where(uRoleReflectToFind)
            .from(tableName)
            .transacting(trx);
    }

    /**
     * Transaction Create URole
     * @param roleReflectToCreate
     * @param trx
     */
    public static async transactionCreate(roleReflectToCreate: Partial<IURole>, trx: Transaction) {
        return DatabaseKnex.getInstance()
            .insert(roleReflectToCreate)
            .into(tableName)
            .transacting(trx)
            .catch((err: ErrorDatabase) => {
                throw {
                    code: err?.code,
                    message: DatabaseKnex.createBetterSqlMessageError(err?.code as string, err?.sqlMessage as string),
                    sql: err?.sql,
                };
            });
    }

    /**
     * Transaction Delete URole
     * @param uRoleReflectToFind
     * @param trx
     */
    public static async transactionDelete(uRoleReflectToFind: Partial<IURole>, trx: Transaction)  {
        return DatabaseKnex.getInstance()
            .delete()
            .where(uRoleReflectToFind)
            .from(tableName)
            .transacting(trx);
    }
}


