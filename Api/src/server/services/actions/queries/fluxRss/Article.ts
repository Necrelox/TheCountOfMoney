/**
 * Local Modules
 */
import { transformColumnsToArray } from '@/services/actions/queries/ColumnSelectorBuilder';
import { IArticle } from '@/models';
import { DatabaseKnex, ErrorDatabase, Transaction } from '@/services';
import { ErrorEntity, MessageError } from '@/utils';

/**
 * IColumnsArticle
 */
export interface IColumnsArticle {
    title: boolean;
    description: boolean;
    content: boolean;
    pubDate: boolean;
    id: boolean | string,
}
/**
 * Table Name
 */
export const tableName = 'ARTICLE';

/**
 * Article class : is the class that contains the queries for the table ARTICLE
 */
export class Article {
    /**
     * Get Article
     * @param articleReflectToFind
     * @param columns
     * @return Promise<IArticle[]>
     */
    public static async get(articleReflectToFind: Partial<IArticle>, columns: Partial<IColumnsArticle>) : Promise<IArticle[]> {
        return DatabaseKnex.getInstance()
            .select(transformColumnsToArray(columns))
            .where(articleReflectToFind).from(tableName)
            .catch((err: ErrorDatabase) => {
                throw new ErrorEntity(MessageError.SERVER_DATABASE_ERROR, err?.sqlMessage as string, err?.code as string);
            });
    }

    /**
     * Update Article
     * @param articleReflectToUpdate
     * @param articleReflectToFind
     */
    public static async update(articleReflectToUpdate: Partial<IArticle>, articleReflectToFind: Partial<IArticle>) {
        return DatabaseKnex.getInstance()
            .update(articleReflectToUpdate)
            .where(articleReflectToFind)
            .from(tableName)
            .catch((err: ErrorDatabase) => {
                throw new ErrorEntity(MessageError.SERVER_DATABASE_ERROR, err?.sqlMessage as string, err?.code as string);
            });
    }
    /**
     * Create Article
     * @param articleReflectToCreate
     */
    public static async create(articleReflectToCreate: Partial<IArticle>) {
        return DatabaseKnex.getInstance()
            .insert(articleReflectToCreate)
            .into(tableName)
            .catch((err: ErrorDatabase) => {
                throw new ErrorEntity(MessageError.SERVER_DATABASE_ERROR, err?.sqlMessage as string, err?.code as string);
            });
    }

    /**
     * Delete Article
     * @param articleReflectToFind
     */
    public static async delete(articleReflectToFind: Partial<IArticle>) {
        return DatabaseKnex.getInstance()
            .delete()
            .where(articleReflectToFind)
            .from(tableName)
            .catch((err: ErrorDatabase) => {
                throw new ErrorEntity(MessageError.SERVER_DATABASE_ERROR, err?.sqlMessage as string, err?.code as string);
            });
    }

    /**
     * Transaction Get Article
     * @param articleReflectToFind
     * @param columns
     * @param trx
     * @return Promise<IArticle[]>
     */
    public static async transactionGet(articleReflectToFind: Partial<IArticle>, columns: Partial<IColumnsArticle>, trx: Transaction) : Promise<IArticle[]> {
        return DatabaseKnex.getInstance()
            .select(transformColumnsToArray(columns))
            .where(articleReflectToFind).from(tableName)
            .transacting(trx)
            .catch((err: ErrorDatabase) => {
                throw new ErrorEntity(MessageError.SERVER_DATABASE_ERROR, err?.sqlMessage as string, err?.code as string);
            });
    }

    /**
     * Transaction Update Article
     * @param articleReflectToUpdate
     * @param articleReflectToFind
     * @param trx
     */
    public static async transactionUpdate(articleReflectToUpdate: Partial<IArticle>, articleReflectToFind: Partial<IArticle>, trx: Transaction) {
        return DatabaseKnex.getInstance()
            .update(articleReflectToUpdate)
            .where(articleReflectToFind)
            .from(tableName)
            .transacting(trx)
            .catch((err: ErrorDatabase) => {
                throw new ErrorEntity(MessageError.SERVER_DATABASE_ERROR, err?.sqlMessage as string, err?.code as string);
            });
    }

    /**
     * Transaction Create Article
     * @param articleReflectToCreate
     * @param trx
     */
    public static async transactionCreate(articleReflectToCreate: Partial<IArticle>, trx: Transaction) {
        return DatabaseKnex.getInstance()
            .insert(articleReflectToCreate)
            .into(tableName)
            .transacting(trx)
            .catch((err: ErrorDatabase) => {
                throw new ErrorEntity(MessageError.SERVER_DATABASE_ERROR, err?.sqlMessage as string, err?.code as string);
            });
    }

    /**
     * Transaction Delete Article
     * @param articleReflectToFind
     * @param trx
     */
    public static async transactionDelete(articleReflectToFind: Partial<IArticle>, trx: Transaction)  {
        return DatabaseKnex.getInstance()
            .delete()
            .where(articleReflectToFind)
            .from(tableName)
            .transacting(trx)
            .catch((err: ErrorDatabase) => {
                throw new ErrorEntity(MessageError.SERVER_DATABASE_ERROR, err?.sqlMessage as string, err?.code as string);
            });
    }
}


