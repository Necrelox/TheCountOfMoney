/**
 * Local Modules
 */
import { DatabaseKnex, ErrorDatabase, Transaction } from '../../DatabaseKnex';
import { ITag } from '../../../../models';
import { transformColumnsToArray } from '../columnSelectorBuilder';
/**
 * IColumnTag
 */
export interface IColumnsTag {
    name: boolean,
    createdAt: boolean,
    uuid: boolean | string,
}

/**
 * Table Name
 */
export const tableName = 'TAG';

/**
 * Tag class : is the class that contains the queries for the table TAG
 */
export class Tag {
    /**
     * Get Tag
     * @param tagReflectToFind
     * @param columns
     * @return Promise<ITag[]>
     */
    public static async get(tagReflectToFind: Partial<ITag>, columns: Partial<IColumnsTag>) : Promise<ITag[]> {
        return DatabaseKnex.getInstance()
            .select(transformColumnsToArray(columns))
            .where(tagReflectToFind).from(tableName)
            .then((rows: ITag[]) => rows)
            .catch((err: ErrorDatabase) => {
                throw {
                    code: err?.code,
                    message: DatabaseKnex.createBetterSqlMessageError(err?.code as string, err?.sqlMessage as string),
                    sql: err?.sql,
                };
            });
    }

    /**
     * Update Tag
     * @param tagReflectToUpdate
     * @param tagReflectToFind
     */
    public static async update(tagReflectToUpdate: Partial<ITag>, tagReflectToFind: Partial<ITag>) {
        return DatabaseKnex.getInstance()
            .update(tagReflectToUpdate)
            .where(tagReflectToFind)
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
     * Create Tag
     * @param tagReflectToCreate
     */
    public static async create(tagReflectToCreate: Partial<ITag>) {
        return DatabaseKnex.getInstance()
            .insert(tagReflectToCreate)
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
     * Delete Tag
     * @param tagReflectToFind
     */
    public static async delete(tagReflectToFind: Partial<ITag>) {
        return DatabaseKnex.getInstance()
            .delete()
            .where(tagReflectToFind)
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
     * Transaction get Tag
     * @param tagReflectToFind
     * @param columns
     * @param trx
     * @return Promise<ITag[]>
     */
    public static async transactionGet(tagReflectToFind: Partial<ITag>, columns: Partial<IColumnsTag>, trx: Transaction) : Promise<ITag[]> {
        return DatabaseKnex.getInstance()
            .select(transformColumnsToArray(columns))
            .where(tagReflectToFind).from(tableName)
            .transacting(trx);
    }

    /**
     * Transaction update Tag
     * @param tagReflectToUpdate
     * @param tagReflectToFind
     * @param trx
     */
    public static async transactionUpdate(tagReflectToUpdate: Partial<ITag>, tagReflectToFind: Partial<ITag>, trx: Transaction) {
        return DatabaseKnex.getInstance()
            .update(tagReflectToUpdate)
            .where(tagReflectToFind)
            .from(tableName)
            .transacting(trx);
    }

    /**
     * Transaction create Tag
     * @param tagReflectToCreate
     * @param trx
     */
    public static async transactionCreate(tagReflectToCreate: Partial<ITag>, trx: Transaction) {
        return DatabaseKnex.getInstance()
            .insert(tagReflectToCreate)
            .into(tableName)
            .transacting(trx);
    }

    /**
     * Transaction delete Tag
     * @param tagReflectToFind
     * @param trx
     */
    public static async transactionDelete(tagReflectToFind: Partial<ITag>, trx: Transaction) {
        return DatabaseKnex.getInstance()
            .delete()
            .where(tagReflectToFind)
            .from(tableName)
            .transacting(trx);
    }
}

