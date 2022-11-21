/**
 * Local Modules
 */
import { DatabaseKnex, ErrorDatabase, Transaction } from '../../DatabaseKnex';
import { transformColumnsToArray } from '../columnSelectorBuilder';
import { IColumnsUser, tableName as userTable } from '../user/user';
import { IColumnsRoom, tableName as roomTable } from './room';
import { IRoomUser, IRoomUserFKRoom, IRoomUserFKUser } from '../../../../models';

/**
 * IColumnsRoomUser
 */
export interface IColumnsRoomUser {
    createdAt: boolean;
    isRoomMaster: boolean;
    userUuid: boolean;
    roomUserUuid: boolean;
    uuid: string | boolean;
}

/**
 * IColumnsRoomUserFKUser
 */
export interface IColumnsRoomUserFKUser extends IColumnsRoomUser, IColumnsUser {}

/**
 * IColumnsRoomUserFKRoom
 */
export interface IColumnsRoomUserFKRoom extends IColumnsRoomUser, IColumnsRoom {}

/**
 * Table Name
 */
export const tableName = 'ROOM_USER';

/**
 * RoomUser class : is the class that contains the queries for the table ROOM_USER
 */
export class RoomUser {
    /**
     * Get RoomUser
     * @param roomUserReflectToFind
     * @param columns
     * @return Promise<IRoomUser[]>
     */
    public static async get(roomUserReflectToFind: Partial<IRoomUser>, columns: Partial<IColumnsRoomUser>) : Promise<IRoomUser[]> {
        return DatabaseKnex.getInstance()
            .select(transformColumnsToArray(columns))
            .where(roomUserReflectToFind).from(tableName)
            .then((rows: IRoomUser[]) => rows)
            .catch((err: ErrorDatabase) => {
                throw {
                    code: err?.code,
                    message: DatabaseKnex.createBetterSqlMessageError(err?.code as string, err?.sqlMessage as string),
                    sql: err?.sql,
                };
            });
    }

    /**
     * Get RoomUser FK user
     * @param roomUserReflectToFind
     * @param columns
     * @return Promise<IRoomUserFKUser[]>
     */
    public static async getFKUser(roomUserReflectToFind: Partial<IRoomUser>, columns: Partial<IColumnsRoomUserFKUser>) : Promise<IRoomUserFKUser[]> {
        return DatabaseKnex.getInstance()
            .select(transformColumnsToArray(columns))
            .where(roomUserReflectToFind).from(tableName)
            .join(userTable, tableName + '.userUuid', '=', userTable + '.uuid')
            .then((rows: IRoomUserFKUser[]) => rows)
            .catch((err: ErrorDatabase) => {
                throw {
                    code: err?.code,
                    message: DatabaseKnex.createBetterSqlMessageError(err?.code as string, err?.sqlMessage as string),
                    sql: err?.sql,
                };
            });
    }

    /**
     * Get RoomUser FK room
     * @param roomUserReflectToFind
     * @param columns
     * @return Promise<IRoomUserFKRoom[]>
     */
    public static async getFKRoom(roomUserReflectToFind: Partial<IRoomUser>, columns: Partial<IColumnsRoomUserFKRoom>) : Promise<IRoomUserFKRoom[]> {
        return DatabaseKnex.getInstance()
            .select(transformColumnsToArray(columns))
            .where(roomUserReflectToFind).from(tableName)
            .join(userTable, tableName + '.roomUuid', '=', roomTable + '.uuid')
            .then((rows: IRoomUserFKRoom[]) => rows)
            .catch((err: ErrorDatabase) => {
                throw {
                    code: err?.code,
                    message: DatabaseKnex.createBetterSqlMessageError(err?.code as string, err?.sqlMessage as string),
                    sql: err?.sql,
                };
            });
    }

    /**
     * Update RoomUser
     * @param roomUserReflectToUpdate
     * @param roomUserReflectToFind
     */
    public static async update(roomUserReflectToUpdate: Partial<IRoomUser>, roomUserReflectToFind: Partial<IRoomUser>) {
        return DatabaseKnex.getInstance()
            .update(roomUserReflectToUpdate)
            .where(roomUserReflectToFind)
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
     * Create RoomUser
     * @param roomUserReflectToCreate
     */
    public static async create(roomUserReflectToCreate: Partial<IRoomUser>) {
        return DatabaseKnex.getInstance()
            .insert(roomUserReflectToCreate)
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
     * Delete RoomUser
     * @param roomUserReflectToFind
     */
    public static async delete(roomUserReflectToFind: Partial<IRoomUser>) {
        return DatabaseKnex.getInstance()
            .delete()
            .where(roomUserReflectToFind)
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
     * Transaction Get RoomUser
     * @param roomUserReflectToFind
     * @param columns
     * @param trx
     * @return Promise<IRoomUser[]>
     */
    public static async transactionGet(roomUserReflectToFind: Partial<IRoomUser>, columns: Partial<IColumnsRoomUser>, trx: Transaction) : Promise<IRoomUser[]> {
        return DatabaseKnex.getInstance()
            .select(transformColumnsToArray(columns))
            .where(roomUserReflectToFind).from(tableName)
            .transacting(trx);
    }

    /**
     * Transaction Get RoomUser FK user
     * @param roomUserReflectToFind
     * @param columns
     * @return Promise<IRoomUserFKUser[]>
     */
    public static async transactionGetFKUser(roomUserReflectToFind: Partial<IRoomUser>, columns: Partial<IColumnsRoomUserFKUser>, trx: Transaction) : Promise<IRoomUserFKUser[]> {
        return DatabaseKnex.getInstance()
            .select(transformColumnsToArray(columns))
            .where(roomUserReflectToFind).from(tableName)
            .join(userTable, tableName + '.userUuid', '=', userTable + '.uuid')
            .transacting(trx);
    }

    /**
     * Transaction Get RoomUser FK room
     * @param roomUserReflectToFind
     * @param columns
     * @return Promise<IRoomUserFKRoom[]>
     */
    public static async transactionGetFKRoom(roomUserReflectToFind: Partial<IRoomUser>, columns: Partial<IColumnsRoomUserFKRoom>, trx: Transaction) : Promise<IRoomUserFKRoom[]> {
        return DatabaseKnex.getInstance()
            .select(transformColumnsToArray(columns))
            .where(roomUserReflectToFind).from(tableName)
            .join(userTable, tableName + '.roomUuid', '=', roomTable + '.uuid')
            .transacting(trx);
    }

    /**
     * Transaction Update RoomUser
     * @param roomUserReflectToUpdate
     * @param roomUserReflectToFind
     * @param trx
     */
    public static async transactionUpdate(roomUserReflectToUpdate: Partial<IRoomUser>, roomUserReflectToFind: Partial<IRoomUser>, trx: Transaction) {
        return DatabaseKnex.getInstance()
            .update(roomUserReflectToUpdate)
            .where(roomUserReflectToFind)
            .from(tableName)
            .transacting(trx);
    }

    /**
     * Transaction Create RoomUser
     * @param roomUserReflectToCreate
     * @param trx
     */
    public static async transactionCreate(roomUserReflectToCreate: Partial<IRoomUser>, trx: Transaction) {
        return DatabaseKnex.getInstance()
            .insert(roomUserReflectToCreate)
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
     * Transaction Delete RoomUser
     * @param roomUserReflectToFind
     * @param trx
     */
    public static async transactionDelete(roomUserReflectToFind: Partial<IRoomUser>, trx: Transaction)  {
        return DatabaseKnex.getInstance()
            .delete()
            .where(roomUserReflectToFind)
            .from(tableName)
            .transacting(trx);
    }
}


