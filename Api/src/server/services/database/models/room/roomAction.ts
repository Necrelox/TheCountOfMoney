/**
 * Local Modules
 */
import { DatabaseKnex, ErrorDatabase, Transaction } from '../../DatabaseKnex';
import { transformColumnsToArray } from '../columnSelectorBuilder';
import { IRoomAction, IRoomActionFKRoomUser } from '../../../../models';
import { IColumnsRoomUser, tableName as roomUserTable } from './roomUser';

/**
 * IColumnsRoomAction
 */
export interface IColumnsRoomAction {
    createdAt: boolean;
    action: boolean;
    roomUserUuid: boolean;
    uuid: string | boolean;
}

/**
 * IColumnsRoomActionFKRoomUser
 */
export interface IColumnsRoomActionFKRoomUser extends IColumnsRoomAction, IColumnsRoomUser {}

/**
 * Table Name
 */
export const tableName = 'ROOM_ACTION';

/**
 * RoomAction class : is the class that contains the queries for the table ROOM_ACTION
 */
export class RoomAction {
    /**
     * Get RoomAction
     * @param roomActionReflectToFind
     * @param columns
     * @return Promise<IRoomAction[]>
     */
    public static async get(roomActionReflectToFind: Partial<IRoomAction>, columns: Partial<IColumnsRoomAction>) : Promise<IRoomAction[]> {
        return DatabaseKnex.getInstance()
            .select(transformColumnsToArray(columns))
            .where(roomActionReflectToFind).from(tableName)
            .then((rows: IRoomAction[]) => rows)
            .catch((err: ErrorDatabase) => {
                throw {
                    code: err?.code,
                    message: DatabaseKnex.createBetterSqlMessageError(err?.code as string, err?.sqlMessage as string),
                    sql: err?.sql,
                };
            });
    }

    /**
     * Get RoomAction FK RoomUser
     * @param roomActionReflectToFind
     * @param columns
     * @return Promise<IRoomActionFKRoomUser[]>
     */
    public static async getFKRoomUser(roomActionReflectToFind: Partial<IRoomAction>, columns: Partial<IColumnsRoomActionFKRoomUser>) : Promise<IRoomActionFKRoomUser[]> {
        return DatabaseKnex.getInstance()
            .select(transformColumnsToArray(columns))
            .where(roomActionReflectToFind).from(tableName)
            .join(roomUserTable, `${tableName}.roomUserUuid`, `${roomUserTable}.uuid`)
            .then((rows: IRoomActionFKRoomUser[]) => rows)
            .catch((err: ErrorDatabase) => {
                throw {
                    code: err?.code,
                    message: DatabaseKnex.createBetterSqlMessageError(err?.code as string, err?.sqlMessage as string),
                    sql: err?.sql,
                };
            });
    }


    /**
     * Update RoomAction
     * @param roomActionReflectToUpdate
     * @param roomActionReflectToFind
     */
    public static async update(roomActionReflectToUpdate: Partial<IRoomAction>, roomActionReflectToFind: Partial<IRoomAction>) {
        return DatabaseKnex.getInstance()
            .update(roomActionReflectToUpdate)
            .where(roomActionReflectToFind)
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
     * Create RoomAction
     * @param roomActionReflectToCreate
     */
    public static async create(roomActionReflectToCreate: Partial<IRoomAction>) {
        return DatabaseKnex.getInstance()
            .insert(roomActionReflectToCreate)
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
     * Delete RoomAction
     * @param roomActionReflectToFind
     */
    public static async delete(roomActionReflectToFind: Partial<IRoomAction>) {
        return DatabaseKnex.getInstance()
            .delete()
            .where(roomActionReflectToFind)
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
     * Transaction Get RoomAction
     * @param roomActionReflectToFind
     * @param columns
     * @param trx
     * @return Promise<IRoomAction[]>
     */
    public static async transactionGet(roomActionReflectToFind: Partial<IRoomAction>, columns: Partial<IColumnsRoomAction>, trx: Transaction) : Promise<IRoomAction[]> {
        return DatabaseKnex.getInstance()
            .select(transformColumnsToArray(columns))
            .where(roomActionReflectToFind).from(tableName)
            .transacting(trx);
    }

    /**
     * Transaction Update RoomAction
     * @param roomActionReflectToUpdate
     * @param roomActionReflectToFind
     * @param trx
     */
    public static async transactionUpdate(roomActionReflectToUpdate: Partial<IRoomAction>, roomActionReflectToFind: Partial<IRoomAction>, trx: Transaction) {
        return DatabaseKnex.getInstance()
            .update(roomActionReflectToUpdate)
            .where(roomActionReflectToFind)
            .from(tableName)
            .transacting(trx);
    }

    /**
     * Transaction Create RoomAction
     * @param roomActionReflectToCreate
     * @param trx
     */
    public static async transactionCreate(roomActionReflectToCreate: Partial<IRoomAction>, trx: Transaction) {
        return DatabaseKnex.getInstance()
            .insert(roomActionReflectToCreate)
            .into(tableName)
            .transacting(trx);
    }

    /**
     * Transaction Delete RoomAction
     * @param roomActionReflectToFind
     * @param trx
     */
    public static async transactionDelete(roomActionReflectToFind: Partial<IRoomAction>, trx: Transaction)  {
        return DatabaseKnex.getInstance()
            .delete()
            .where(roomActionReflectToFind)
            .from(tableName)
            .transacting(trx);
    }
}


