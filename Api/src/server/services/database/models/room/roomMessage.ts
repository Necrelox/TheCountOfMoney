/**
 * Local Modules
 */
import { DatabaseKnex, ErrorDatabase, Transaction } from '../../DatabaseKnex';
import { transformColumnsToArray } from '../columnSelectorBuilder';
import { IRoomMessage, IRoomMessageFKRoomUser } from '../../../../models';
import { IColumnsRoomUser, tableName as roomUserTable } from './roomUser';

/**
 * IColumnsRoomMessage
 */
export interface IColumnsRoomMessage {
    tagUuid: boolean;
    roomUuid: boolean;
    uuid: string | boolean;
}

/**
 * IColumnsRoomMessageFKRoomUser
 */
export interface IColumnsRoomMessageFKRoomUser extends IColumnsRoomMessage, IColumnsRoomUser {}

/**
 * Table Name
 */
export const tableName = 'ROOM_MESSAGE';

/**
 * RoomMessage class : is the class that contains the queries for the table ROOM_MESSAGE
 */
export class RoomMessage {
    /**
     * Get RoomMessage
     * @param roomMessageReflectToFind
     * @param columns
     * @return Promise<IRoomMessage[]>
     */
    public static async get(roomMessageReflectToFind: Partial<IRoomMessage>, columns: Partial<IColumnsRoomMessage>): Promise<IRoomMessage[]> {
        return DatabaseKnex.getInstance()
            .select(transformColumnsToArray(columns))
            .where(roomMessageReflectToFind).from(tableName)
            .then((rows: IRoomMessage[]) => rows)
            .catch((err: ErrorDatabase) => {
                throw {
                    code: err?.code,
                    message: DatabaseKnex.createBetterSqlMessageError(err?.code as string, err?.sqlMessage as string),
                    sql: err?.sql,
                };
            });
    }

    /**
     * Get RoomMessage FK RoomUser
     * @param roomMessageReflectToFind
     * @param columns
     * @return Promise<IRoomMessageFKRoomUser[]>
     */
    public static async getFKRoomUser(roomMessageReflectToFind: Partial<IRoomMessage>, columns: Partial<IColumnsRoomMessageFKRoomUser>): Promise<IRoomMessageFKRoomUser[]> {
        return DatabaseKnex.getInstance()
            .select(transformColumnsToArray(columns))
            .where(roomMessageReflectToFind).from(tableName)
            .join(roomUserTable, `${tableName}.roomUserUuid`, `${roomUserTable}.uuid`)
            .then((rows: IRoomMessageFKRoomUser[]) => rows)
            .catch((err: ErrorDatabase) => {
                throw {
                    code: err?.code,
                    message: DatabaseKnex.createBetterSqlMessageError(err?.code as string, err?.sqlMessage as string),
                    sql: err?.sql,
                };
            });
    }

    /**
     * Update RoomMessage
     * @param roomMessageReflectToUpdate
     * @param roomMessageReflectToFind
     */
    public static async update(roomMessageReflectToUpdate: Partial<IRoomMessage>, roomMessageReflectToFind: Partial<IRoomMessage>) {
        return DatabaseKnex.getInstance()
            .update(roomMessageReflectToUpdate)
            .where(roomMessageReflectToFind)
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
     * Create RoomMessage
     * @param roomMessageReflectToCreate
     */
    public static async create(roomMessageReflectToCreate: Partial<IRoomMessage>) {
        return DatabaseKnex.getInstance()
            .insert(roomMessageReflectToCreate)
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
     * Delete RoomMessage
     * @param roomMessageReflectToFind
     */
    public static async delete(roomMessageReflectToFind: Partial<IRoomMessage>) {
        return DatabaseKnex.getInstance()
            .delete()
            .where(roomMessageReflectToFind)
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
     * Transaction Get RoomMessage
     * @param roomMessageReflectToFind
     * @param columns
     * @param trx
     * @return Promise<IRoomMessage[]>
     */
    public static async transactionGet(roomMessageReflectToFind: Partial<IRoomMessage>, columns: Partial<IColumnsRoomMessage>, trx: Transaction): Promise<IRoomMessage[]> {
        return DatabaseKnex.getInstance()
            .select(transformColumnsToArray(columns))
            .where(roomMessageReflectToFind).from(tableName)
            .transacting(trx);
    }

    /**
     * Transaction Get RoomMessage FK RoomUser
     * @param roomMessageReflectToFind
     * @param columns
     * @return Promise<IRoomMessageFKRoomUser[]>
     */
    public static async transactionGetFKRoomUser(roomMessageReflectToFind: Partial<IRoomMessage>, columns: Partial<IColumnsRoomMessageFKRoomUser>, trx: Transaction): Promise<IRoomMessageFKRoomUser[]> {
        return DatabaseKnex.getInstance()
            .select(transformColumnsToArray(columns))
            .where(roomMessageReflectToFind).from(tableName)
            .join(roomUserTable, `${tableName}.roomUserUuid`, `${roomUserTable}.uuid`)
            .transacting(trx);
    }

    /**
     * Transaction Update RoomMessage
     * @param roomMessageReflectToUpdate
     * @param roomMessageReflectToFind
     * @param trx
     */
    public static async transactionUpdate(roomMessageReflectToUpdate: Partial<IRoomMessage>, roomMessageReflectToFind: Partial<IRoomMessage>, trx: Transaction) {
        return DatabaseKnex.getInstance()
            .update(roomMessageReflectToUpdate)
            .where(roomMessageReflectToFind)
            .from(tableName)
            .transacting(trx);
    }

    /**
     * Transaction Create RoomMessage
     * @param roomMessageReflectToCreate
     * @param trx
     */
    public static async transactionCreate(roomMessageReflectToCreate: Partial<IRoomMessage>, trx: Transaction) {
        return DatabaseKnex.getInstance()
            .insert(roomMessageReflectToCreate)
            .into(tableName)
            .transacting(trx);
    }

    /**
     * Transaction Delete RoomMessage
     * @param roomMessageReflectToFind
     * @param trx
     */
    public static async transactionDelete(roomMessageReflectToFind: Partial<IRoomMessage>, trx: Transaction) {
        return DatabaseKnex.getInstance()
            .delete()
            .where(roomMessageReflectToFind)
            .from(tableName)
            .transacting(trx);
    }
}


