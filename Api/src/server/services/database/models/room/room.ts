/**
 * Local Modules
 */
import { DatabaseKnex, ErrorDatabase, Transaction } from '../../DatabaseKnex';
import { transformColumnsToArray } from '../columnSelectorBuilder';
import { IRoom } from '../../../../models';

/**
 * IColumnsRoom
 */
export interface IColumnsRoom {
    createdAt: boolean;
    optionLimitUser: boolean;
    uuid: string | boolean;
}

/**
 * Table Name
 */
export const tableName = 'ROOM';

/**
 * Room class : is the class that contains the queries for the table ROOM
 */
export class Room {
    /**
     * Get Room
     * @param roomReflectToFind
     * @param columns
     * @return Promise<IRoom[]>
     */
    public static async get(roomReflectToFind: Partial<IRoom>, columns: Partial<IColumnsRoom>) : Promise<IRoom[]> {
        return DatabaseKnex.getInstance()
            .select(transformColumnsToArray(columns))
            .where(roomReflectToFind).from(tableName)
            .then((rows: IRoom[]) => rows)
            .catch((err: ErrorDatabase) => {
                throw {
                    code: err?.code,
                    message: DatabaseKnex.createBetterSqlMessageError(err?.code as string, err?.sqlMessage as string),
                    sql: err?.sql,
                };
            });
    }

    /**
     * Update Room
     * @param roomReflectToUpdate
     * @param roomReflectToFind
     */
    public static async update(roomReflectToUpdate: Partial<IRoom>, roomReflectToFind: Partial<IRoom>) {
        return DatabaseKnex.getInstance()
            .update(roomReflectToUpdate)
            .where(roomReflectToFind)
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
     * Create Room
     * @param roomReflectToCreate
     */
    public static async create(roomReflectToCreate: Partial<IRoom>) {
        return DatabaseKnex.getInstance()
            .insert(roomReflectToCreate)
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
     * Delete Room
     * @param roomReflectToFind
     */
    public static async delete(roomReflectToFind: Partial<IRoom>) {
        return DatabaseKnex.getInstance()
            .delete()
            .where(roomReflectToFind)
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
     * Transaction Get Room
     * @param roomReflectToFind
     * @param columns
     * @param trx
     * @return Promise<IRoom[]>
     */
    public static async transactionGet(roomReflectToFind: Partial<IRoom>, columns: Partial<IColumnsRoom>, trx: Transaction) : Promise<IRoom[]> {
        return DatabaseKnex.getInstance()
            .select(transformColumnsToArray(columns))
            .where(roomReflectToFind).from(tableName)
            .transacting(trx);
    }

    /**
     * Transaction Update Room
     * @param roomReflectToUpdate
     * @param roomReflectToFind
     * @param trx
     */
    public static async transactionUpdate(roomReflectToUpdate: Partial<IRoom>, roomReflectToFind: Partial<IRoom>, trx: Transaction) {
        return DatabaseKnex.getInstance()
            .update(roomReflectToUpdate)
            .where(roomReflectToFind)
            .from(tableName)
            .transacting(trx);
    }

    /**
     * Transaction Create Room
     * @param roomReflectToCreate
     * @param trx
     */
    public static async transactionCreate(roomReflectToCreate: Partial<IRoom>, trx: Transaction) {
        return DatabaseKnex.getInstance()
            .insert(roomReflectToCreate)
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
     * Transaction Delete Room
     * @param roomReflectToFind
     * @param trx
     */
    public static async transactionDelete(roomReflectToFind: Partial<IRoom>, trx: Transaction)  {
        return DatabaseKnex.getInstance()
            .delete()
            .where(roomReflectToFind)
            .from(tableName)
            .transacting(trx);
    }
}


