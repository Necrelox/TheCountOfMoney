/**
 * Local Modules
 */
import { DatabaseKnex, ErrorDatabase, Transaction } from '../../DatabaseKnex';
import { transformColumnsToArray } from '../columnSelectorBuilder';
import { IRoomMessageFile, IRoomMessageFileFKRoomMessage } from '../../../../models';
import { IColumnsRoomMessage, tableName as roomMessageTable } from './roomMessage';

/**
 * IColumnsRoomMessageFile
 */
export interface IColumnsRoomMessageFile {
    path: boolean;
    seed: boolean;
    createdAt: boolean;
    sizeMo: boolean;
    roomMessageUuid: boolean;
    uuid: boolean | string;
}

/**
 * IColumnsRoomMessageFileFKRoomUser
 */
export interface IColumnsRoomMessageFileFKRoomUser extends IColumnsRoomMessageFile, IColumnsRoomMessage {}

/**
 * Table Name
 */
export const tableName = 'ROOM_MESSAGE_FILE';

/**
 * RoomMessageFile class : is the class that contains the queries for the table ROOM_MESSAGE_FILE
 */
export class RoomMessageFile {
    /**
     * Get RoomMessageFile
     * @param roomMessageFileReflectToFind
     * @param columns
     * @return Promise<IRoomMessageFile[]>
     */
    public static async get(roomMessageFileReflectToFind: Partial<IRoomMessageFile>, columns: Partial<IColumnsRoomMessageFile>): Promise<IRoomMessageFile[]> {
        return DatabaseKnex.getInstance()
            .select(transformColumnsToArray(columns))
            .where(roomMessageFileReflectToFind).from(tableName)
            .then((rows: IRoomMessageFile[]) => rows)
            .catch((err: ErrorDatabase) => {
                throw {
                    code: err?.code,
                    message: DatabaseKnex.createBetterSqlMessageError(err?.code as string, err?.sqlMessage as string),
                    sql: err?.sql,
                };
            });
    }

    /**
     * Get RoomMessageFile FK RoomMessage
     * @param roomMessageFileReflectToFind
     * @param columns
     * @return Promise<IRoomMessageFileFKRoomMessage[]>
     */
    public static async getFKRoomUser(roomMessageFileReflectToFind: Partial<IRoomMessageFile>, columns: Partial<IColumnsRoomMessageFileFKRoomUser>): Promise<IRoomMessageFileFKRoomMessage[]> {
        return DatabaseKnex.getInstance()
            .select(transformColumnsToArray(columns))
            .where(roomMessageFileReflectToFind).from(tableName)
            .join(roomMessageTable, `${tableName}.roomMessageFileUuid`, `${roomMessageTable}.uuid`)
            .then((rows: IRoomMessageFileFKRoomMessage[]) => rows)
            .catch((err: ErrorDatabase) => {
                throw {
                    code: err?.code,
                    message: DatabaseKnex.createBetterSqlMessageError(err?.code as string, err?.sqlMessage as string),
                    sql: err?.sql,
                };
            });
    }

    /**
     * Update RoomMessageFile
     * @param roomMessageFileReflectToUpdate
     * @param roomMessageFileReflectToFind
     */
    public static async update(roomMessageFileReflectToUpdate: Partial<IRoomMessageFile>, roomMessageFileReflectToFind: Partial<IRoomMessageFile>) {
        return DatabaseKnex.getInstance()
            .update(roomMessageFileReflectToUpdate)
            .where(roomMessageFileReflectToFind)
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
     * Create RoomMessageFile
     * @param roomMessageFileReflectToCreate
     */
    public static async create(roomMessageFileReflectToCreate: Partial<IRoomMessageFile>) {
        return DatabaseKnex.getInstance()
            .insert(roomMessageFileReflectToCreate)
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
     * Delete RoomMessageFile
     * @param roomMessageFileReflectToFind
     */
    public static async delete(roomMessageFileReflectToFind: Partial<IRoomMessageFile>) {
        return DatabaseKnex.getInstance()
            .delete()
            .where(roomMessageFileReflectToFind)
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
     * Transaction Get RoomMessageFile
     * @param roomMessageFileReflectToFind
     * @param columns
     * @param trx
     * @return Promise<IRoomMessageFile[]>
     */
    public static async transactionGet(roomMessageFileReflectToFind: Partial<IRoomMessageFile>, columns: Partial<IColumnsRoomMessageFile>, trx: Transaction): Promise<IRoomMessageFile[]> {
        return DatabaseKnex.getInstance()
            .select(transformColumnsToArray(columns))
            .where(roomMessageFileReflectToFind).from(tableName)
            .transacting(trx);
    }

    /**
     * Transaction Get RoomMessageFile FK RoomMessage
     * @param roomMessageFileReflectToFind
     * @param columns
     * @return Promise<IRoomMessageFileFKRoomMessage[]>
     */
    public static async transactionGetFKRoomUser(roomMessageFileReflectToFind: Partial<IRoomMessageFile>, columns: Partial<IColumnsRoomMessageFileFKRoomUser>, trx: Transaction): Promise<IRoomMessageFileFKRoomMessage[]> {
        return DatabaseKnex.getInstance()
            .select(transformColumnsToArray(columns))
            .where(roomMessageFileReflectToFind).from(tableName)
            .join(roomMessageTable, `${tableName}.roomMessageFileUuid`, `${roomMessageTable}.uuid`)
            .transacting(trx);
    }

    /**
     * Transaction Update RoomMessageFile
     * @param roomMessageFileReflectToUpdate
     * @param roomMessageFileReflectToFind
     * @param trx
     */
    public static async transactionUpdate(roomMessageFileReflectToUpdate: Partial<IRoomMessageFile>, roomMessageFileReflectToFind: Partial<IRoomMessageFile>, trx: Transaction) {
        return DatabaseKnex.getInstance()
            .update(roomMessageFileReflectToUpdate)
            .where(roomMessageFileReflectToFind)
            .from(tableName)
            .transacting(trx);
    }

    /**
     * Transaction Create RoomMessageFile
     * @param roomMessageFileReflectToCreate
     * @param trx
     */
    public static async transactionCreate(roomMessageFileReflectToCreate: Partial<IRoomMessageFile>, trx: Transaction) {
        return DatabaseKnex.getInstance()
            .insert(roomMessageFileReflectToCreate)
            .into(tableName)
            .transacting(trx);
    }

    /**
     * Transaction Delete RoomMessageFile
     * @param roomMessageFileReflectToFind
     * @param trx
     */
    public static async transactionDelete(roomMessageFileReflectToFind: Partial<IRoomMessageFile>, trx: Transaction) {
        return DatabaseKnex.getInstance()
            .delete()
            .where(roomMessageFileReflectToFind)
            .from(tableName)
            .transacting(trx);
    }
}


