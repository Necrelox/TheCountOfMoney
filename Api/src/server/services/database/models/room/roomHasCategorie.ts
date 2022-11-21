/**
 * Local Modules
 */
import { DatabaseKnex, ErrorDatabase, Transaction } from '../../DatabaseKnex';
import { transformColumnsToArray } from '../columnSelectorBuilder';
import { IRoomHasCategorie, IRoomHasCategorieFKCategorie, IRoomHasCategorieFKRoom } from '../../../../models';
import { IColumnsCategorie, tableName as categorieTable } from './categorie';
import { IColumnsRoom, tableName as roomTable } from './room';

/**
 * IColumnsRoomHasCategorie
 */
export interface IColumnsRoomHasCategorie {
    categorieUuid: boolean;
    roomUuid: boolean;
    uuid: string | boolean;
}

/**
 * IColumnsRoomHasCategorieFKCategorie
 */
export interface IColumnsRoomHasCategorieFKCategorie extends IColumnsRoomHasCategorie, IColumnsCategorie {}

/**
 * IColumnsRoomHasCategorieFKRoom
 */
export interface IColumnsRoomHasCategorieFKRoom extends IColumnsRoomHasCategorie, IColumnsRoom {}

/**
 * Table Name
 */
export const tableName = 'ROOM_HAS_CATEGORIE';

/**
 * RoomHasCategorie class : is the class that contains the queries for the table ROOM_HAS_CATEGORIE
 */
export class RoomHasCategorie {
    /**
     * Get RoomHasCategorie
     * @param roomHasCategorieReflectToFind
     * @param columns
     * @return Promise<IRoomHasCategorie[]>
     */
    public static async get(roomHasCategorieReflectToFind: Partial<IRoomHasCategorie>, columns: Partial<IColumnsRoomHasCategorie>): Promise<IRoomHasCategorie[]> {
        return DatabaseKnex.getInstance()
            .select(transformColumnsToArray(columns))
            .where(roomHasCategorieReflectToFind).from(tableName)
            .then((rows: IRoomHasCategorie[]) => rows)
            .catch((err: ErrorDatabase) => {
                throw {
                    code: err?.code,
                    message: DatabaseKnex.createBetterSqlMessageError(err?.code as string, err?.sqlMessage as string),
                    sql: err?.sql,
                };
            });
    }

    /**
     * Get RoomHasCategorie FK Categorie
     * @param roomHasCategorieReflectToFind
     * @param columns
     * @return Promise<IRoomHasCategorieFKCategorie[]>
     */
    public static async getFKCategorie(roomHasCategorieReflectToFind: Partial<IRoomHasCategorie>, columns: Partial<IColumnsRoomHasCategorieFKCategorie>): Promise<IRoomHasCategorieFKCategorie[]> {
        return DatabaseKnex.getInstance()
            .select(transformColumnsToArray(columns))
            .where(roomHasCategorieReflectToFind).from(tableName)
            .join(categorieTable, `${tableName}.categorieUuid`, `${categorieTable}.uuid`)
            .then((rows: IRoomHasCategorieFKCategorie[]) => rows)
            .catch((err: ErrorDatabase) => {
                throw {
                    code: err?.code,
                    message: DatabaseKnex.createBetterSqlMessageError(err?.code as string, err?.sqlMessage as string),
                    sql: err?.sql,
                };
            });
    }

    /**
     * Get RoomHasCategorie FK Room
     * @param roomHasCategorieReflectToFind
     * @param columns
     * @return Promise<IRoomHasCategorieFKRoom[]>
     */
    public static async getFKRoom(roomHasCategorieReflectToFind: Partial<IRoomHasCategorie>, columns: Partial<IColumnsRoomHasCategorieFKRoom>): Promise<IRoomHasCategorieFKRoom[]> {
        return DatabaseKnex.getInstance()
            .select(transformColumnsToArray(columns))
            .where(roomHasCategorieReflectToFind).from(tableName)
            .join(roomTable, `${tableName}.roomUuid`, `${roomTable}.uuid`)
            .then((rows: IRoomHasCategorieFKRoom[]) => rows)
            .catch((err: ErrorDatabase) => {
                throw {
                    code: err?.code,
                    message: DatabaseKnex.createBetterSqlMessageError(err?.code as string, err?.sqlMessage as string),
                    sql: err?.sql,
                };
            });
    }

    /**
     * Update RoomHasCategorie
     * @param roomHasCategorieReflectToUpdate
     * @param roomHasCategorieReflectToFind
     */
    public static async update(roomHasCategorieReflectToUpdate: Partial<IRoomHasCategorie>, roomHasCategorieReflectToFind: Partial<IRoomHasCategorie>) {
        return DatabaseKnex.getInstance()
            .update(roomHasCategorieReflectToUpdate)
            .where(roomHasCategorieReflectToFind)
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
     * Create RoomHasCategorie
     * @param roomHasCategorieReflectToCreate
     */
    public static async create(roomHasCategorieReflectToCreate: Partial<IRoomHasCategorie>) {
        return DatabaseKnex.getInstance()
            .insert(roomHasCategorieReflectToCreate)
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
     * Delete RoomHasCategorie
     * @param roomHasCategorieReflectToFind
     */
    public static async delete(roomHasCategorieReflectToFind: Partial<IRoomHasCategorie>) {
        return DatabaseKnex.getInstance()
            .delete()
            .where(roomHasCategorieReflectToFind)
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
     * Transaction Get RoomHasCategorie
     * @param roomHasCategorieReflectToFind
     * @param columns
     * @param trx
     * @return Promise<IRoomHasCategorie[]>
     */
    public static async transactionGet(roomHasCategorieReflectToFind: Partial<IRoomHasCategorie>, columns: Partial<IColumnsRoomHasCategorie>, trx: Transaction): Promise<IRoomHasCategorie[]> {
        return DatabaseKnex.getInstance()
            .select(transformColumnsToArray(columns))
            .where(roomHasCategorieReflectToFind).from(tableName)
            .transacting(trx);
    }

    /**
     * Transaction Get RoomHasCategorie FK Categorie
     * @param roomHasCategorieReflectToFind
     * @param columns
     * @return Promise<IRoomHasCategorieFKCategorie[]>
     */
    public static async transactionGetFKCategorie(roomHasCategorieReflectToFind: Partial<IRoomHasCategorie>, columns: Partial<IColumnsRoomHasCategorieFKCategorie>, trx: Transaction): Promise<IRoomHasCategorieFKCategorie[]> {
        return DatabaseKnex.getInstance()
            .select(transformColumnsToArray(columns))
            .where(roomHasCategorieReflectToFind).from(tableName)
            .join(categorieTable, `${tableName}.categorieUuid`, `${categorieTable}.uuid`)
            .transacting(trx);
    }

    /**
     * Transaction Get RoomHasCategorie FK Room
     * @param roomHasCategorieReflectToFind
     * @param columns
     * @return Promise<IRoomHasCategorieFKRoom[]>
     */
    public static async transactionGetFKRoom(roomHasCategorieReflectToFind: Partial<IRoomHasCategorie>, columns: Partial<IColumnsRoomHasCategorieFKRoom>, trx: Transaction): Promise<IRoomHasCategorieFKRoom[]> {
        return DatabaseKnex.getInstance()
            .select(transformColumnsToArray(columns))
            .where(roomHasCategorieReflectToFind).from(tableName)
            .join(roomTable, `${tableName}.roomUuid`, `${roomTable}.uuid`)
            .transacting(trx);
    }

    /**
     * Transaction Update RoomHasCategorie
     * @param roomHasCategorieReflectToUpdate
     * @param roomHasCategorieReflectToFind
     * @param trx
     */
    public static async transactionUpdate(roomHasCategorieReflectToUpdate: Partial<IRoomHasCategorie>, roomHasCategorieReflectToFind: Partial<IRoomHasCategorie>, trx: Transaction) {
        return DatabaseKnex.getInstance()
            .update(roomHasCategorieReflectToUpdate)
            .where(roomHasCategorieReflectToFind)
            .from(tableName)
            .transacting(trx);
    }

    /**
     * Transaction Create RoomHasCategorie
     * @param roomHasCategorieReflectToCreate
     * @param trx
     */
    public static async transactionCreate(roomHasCategorieReflectToCreate: Partial<IRoomHasCategorie>, trx: Transaction) {
        return DatabaseKnex.getInstance()
            .insert(roomHasCategorieReflectToCreate)
            .into(tableName)
            .transacting(trx);
    }

    /**
     * Transaction Delete RoomHasCategorie
     * @param roomHasCategorieReflectToFind
     * @param trx
     */
    public static async transactionDelete(roomHasCategorieReflectToFind: Partial<IRoomHasCategorie>, trx: Transaction) {
        return DatabaseKnex.getInstance()
            .delete()
            .where(roomHasCategorieReflectToFind)
            .from(tableName)
            .transacting(trx);
    }
}


