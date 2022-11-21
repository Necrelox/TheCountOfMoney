/**
 * Local Modules
 */
import { DatabaseKnex, ErrorDatabase, Transaction } from '../../DatabaseKnex';
import { transformColumnsToArray } from '../columnSelectorBuilder';
import { IRoomHasTag, IRoomHasTagFKTag, IRoomHasTagFKRoom } from '../../../../models';
import { IColumnsTag, tableName as tagTable } from './tag';
import { IColumnsRoom, tableName as roomTable } from './room';

/**
 * IColumnsRoomHasTag
 */
export interface IColumnsRoomHasTag {
    tagUuid: boolean;
    roomUuid: boolean;
    uuid: string | boolean;
}

/**
 * IColumnsRoomHasTagFKTag
 */
export interface IColumnsRoomHasTagFKTag extends IColumnsRoomHasTag, IColumnsTag {
}

/**
 * IColumnsRoomHasTagFKRoom
 */
export interface IColumnsRoomHasTagFKRoom extends IColumnsRoomHasTag, IColumnsRoom {
}

/**
 * Table Name
 */
export const tableName = 'ROOM_HAS_TAG';

/**
 * RoomHasTag class : is the class that contains the queries for the table ROOM_HAS_TAG
 */
export class RoomHasTag {
    /**
     * Get RoomHasTag
     * @param roomHasTagReflectToFind
     * @param columns
     * @return Promise<IRoomHasTag[]>
     */
    public static async get(roomHasTagReflectToFind: Partial<IRoomHasTag>, columns: Partial<IColumnsRoomHasTag>): Promise<IRoomHasTag[]> {
        return DatabaseKnex.getInstance()
            .select(transformColumnsToArray(columns))
            .where(roomHasTagReflectToFind).from(tableName)
            .then((rows: IRoomHasTag[]) => rows)
            .catch((err: ErrorDatabase) => {
                throw {
                    code: err?.code,
                    message: DatabaseKnex.createBetterSqlMessageError(err?.code as string, err?.sqlMessage as string),
                    sql: err?.sql,
                };
            });
    }

    /**
     * Get RoomHasTag FK Tag
     * @param roomHasTagReflectToFind
     * @param columns
     * @return Promise<IRoomHasTagFKTag[]>
     */
    public static async getFKTag(roomHasTagReflectToFind: Partial<IRoomHasTag>, columns: Partial<IColumnsRoomHasTagFKTag>): Promise<IRoomHasTagFKTag[]> {
        return DatabaseKnex.getInstance()
            .select(transformColumnsToArray(columns))
            .where(roomHasTagReflectToFind).from(tableName)
            .join(tagTable, `${tableName}.tagUuid`, `${tagTable}.uuid`)
            .then((rows: IRoomHasTagFKTag[]) => rows)
            .catch((err: ErrorDatabase) => {
                throw {
                    code: err?.code,
                    message: DatabaseKnex.createBetterSqlMessageError(err?.code as string, err?.sqlMessage as string),
                    sql: err?.sql,
                };
            });
    }

    /**
     * Get RoomHasTag FK Room
     * @param roomHasTagReflectToFind
     * @param columns
     * @return Promise<IRoomHasTagFKRoom[]>
     */
    public static async getFKRoom(roomHasTagReflectToFind: Partial<IRoomHasTag>, columns: Partial<IColumnsRoomHasTagFKRoom>): Promise<IRoomHasTagFKRoom[]> {
        return DatabaseKnex.getInstance()
            .select(transformColumnsToArray(columns))
            .where(roomHasTagReflectToFind).from(tableName)
            .join(roomTable, `${tableName}.roomUuid`, `${roomTable}.uuid`)
            .then((rows: IRoomHasTagFKRoom[]) => rows)
            .catch((err: ErrorDatabase) => {
                throw {
                    code: err?.code,
                    message: DatabaseKnex.createBetterSqlMessageError(err?.code as string, err?.sqlMessage as string),
                    sql: err?.sql,
                };
            });
    }

    /**
     * Update RoomHasTag
     * @param roomHasTagReflectToUpdate
     * @param roomHasTagReflectToFind
     */
    public static async update(roomHasTagReflectToUpdate: Partial<IRoomHasTag>, roomHasTagReflectToFind: Partial<IRoomHasTag>) {
        return DatabaseKnex.getInstance()
            .update(roomHasTagReflectToUpdate)
            .where(roomHasTagReflectToFind)
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
     * Create RoomHasTag
     * @param roomHasTagReflectToCreate
     */
    public static async create(roomHasTagReflectToCreate: Partial<IRoomHasTag>) {
        return DatabaseKnex.getInstance()
            .insert(roomHasTagReflectToCreate)
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
     * Delete RoomHasTag
     * @param roomHasTagReflectToFind
     */
    public static async delete(roomHasTagReflectToFind: Partial<IRoomHasTag>) {
        return DatabaseKnex.getInstance()
            .delete()
            .where(roomHasTagReflectToFind)
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
     * Transaction Get RoomHasTag
     * @param roomHasTagReflectToFind
     * @param columns
     * @param trx
     * @return Promise<IRoomHasTag[]>
     */
    public static async transactionGet(roomHasTagReflectToFind: Partial<IRoomHasTag>, columns: Partial<IColumnsRoomHasTag>, trx: Transaction): Promise<IRoomHasTag[]> {
        return DatabaseKnex.getInstance()
            .select(transformColumnsToArray(columns))
            .where(roomHasTagReflectToFind).from(tableName)
            .transacting(trx);
    }

    /**
     * Transaction Get RoomHasTag FK Tag
     * @param roomHasTagReflectToFind
     * @param columns
     * @return Promise<IRoomHasTagFKTag[]>
     */
    public static async transactionGetFKTag(roomHasTagReflectToFind: Partial<IRoomHasTag>, columns: Partial<IColumnsRoomHasTagFKTag>, trx: Transaction): Promise<IRoomHasTagFKTag[]> {
        return DatabaseKnex.getInstance()
            .select(transformColumnsToArray(columns))
            .where(roomHasTagReflectToFind).from(tableName)
            .join(tagTable, `${tableName}.tagUuid`, `${tagTable}.uuid`)
            .transacting(trx);
    }

    /**
     * Transaction Get RoomHasTag FK Room
     * @param roomHasTagReflectToFind
     * @param columns
     * @return Promise<IRoomHasTagFKRoom[]>
     */
    public static async transactionGetFKRoom(roomHasTagReflectToFind: Partial<IRoomHasTag>, columns: Partial<IColumnsRoomHasTagFKRoom>, trx: Transaction): Promise<IRoomHasTagFKRoom[]> {
        return DatabaseKnex.getInstance()
            .select(transformColumnsToArray(columns))
            .where(roomHasTagReflectToFind).from(tableName)
            .join(roomTable, `${tableName}.roomUuid`, `${roomTable}.uuid`)
            .transacting(trx);
    }

    /**
     * Transaction Update RoomHasTag
     * @param roomHasTagReflectToUpdate
     * @param roomHasTagReflectToFind
     * @param trx
     */
    public static async transactionUpdate(roomHasTagReflectToUpdate: Partial<IRoomHasTag>, roomHasTagReflectToFind: Partial<IRoomHasTag>, trx: Transaction) {
        return DatabaseKnex.getInstance()
            .update(roomHasTagReflectToUpdate)
            .where(roomHasTagReflectToFind)
            .from(tableName)
            .transacting(trx);
    }

    /**
     * Transaction Create RoomHasTag
     * @param roomHasTagReflectToCreate
     * @param trx
     */
    public static async transactionCreate(roomHasTagReflectToCreate: Partial<IRoomHasTag>, trx: Transaction) {
        return DatabaseKnex.getInstance()
            .insert(roomHasTagReflectToCreate)
            .into(tableName)
            .transacting(trx);
    }

    /**
     * Transaction Delete RoomHasTag
     * @param roomHasTagReflectToFind
     * @param trx
     */
    public static async transactionDelete(roomHasTagReflectToFind: Partial<IRoomHasTag>, trx: Transaction) {
        return DatabaseKnex.getInstance()
            .delete()
            .where(roomHasTagReflectToFind)
            .from(tableName)
            .transacting(trx);
    }
}


