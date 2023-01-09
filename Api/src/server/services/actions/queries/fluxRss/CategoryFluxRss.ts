/**
 * Local Modules
 */
import { transformColumnsToArray } from '@/services/actions/queries/ColumnSelectorBuilder';
import { ICategoryFluxRss } from '@/models';
import { DatabaseKnex, ErrorDatabase, Transaction } from '@/services';
import { ErrorEntity, MessageError } from '@/utils';

/**
 * IColumnsCategoryFluxRss
 */
export interface IColumnsCategoryFluxRss {
    name: boolean;
    id: boolean | string,
}
/**
 * Table Name
 */
export const tableName = 'CATEGORY_FLUX_RSS';

/**
 * CategoryFluxRss class : is the class that contains the queries for the table CATEGORY_FLUX_RSS
 */
export class CategoryFluxRss {
    /**
     * Get CategoryFluxRss
     * @param categoryFluxRssReflectToFind
     * @param columns
     * @return Promise<ICategoryFluxRss[]>
     */
    public static async get(categoryFluxRssReflectToFind: Partial<ICategoryFluxRss>, columns: Partial<IColumnsCategoryFluxRss>) : Promise<ICategoryFluxRss[]> {
        return DatabaseKnex.getInstance()
            .select(transformColumnsToArray(columns))
            .where(categoryFluxRssReflectToFind).from(tableName)
            .catch((err: ErrorDatabase) => {
                throw new ErrorEntity(MessageError.SERVER_DATABASE_ERROR, err?.sqlMessage as string, err?.code as string);
            });
    }

    /**
     * Update CategoryFluxRss
     * @param categoryFluxRssReflectToUpdate
     * @param categoryFluxRssReflectToFind
     */
    public static async update(categoryFluxRssReflectToUpdate: Partial<ICategoryFluxRss>, categoryFluxRssReflectToFind: Partial<ICategoryFluxRss>) {
        return DatabaseKnex.getInstance()
            .update(categoryFluxRssReflectToUpdate)
            .where(categoryFluxRssReflectToFind)
            .from(tableName)
            .catch((err: ErrorDatabase) => {
                throw new ErrorEntity(MessageError.SERVER_DATABASE_ERROR, err?.sqlMessage as string, err?.code as string);
            });
    }
    /**
     * Create CategoryFluxRss
     * @param categoryFluxRssReflectToCreate
     */
    public static async create(categoryFluxRssReflectToCreate: Partial<ICategoryFluxRss>) {
        return DatabaseKnex.getInstance()
            .insert(categoryFluxRssReflectToCreate)
            .into(tableName)
            .catch((err: ErrorDatabase) => {
                throw new ErrorEntity(MessageError.SERVER_DATABASE_ERROR, err?.sqlMessage as string, err?.code as string);
            });
    }

    /**
     * Delete CategoryFluxRss
     * @param categoryFluxRssReflectToFind
     */
    public static async delete(categoryFluxRssReflectToFind: Partial<ICategoryFluxRss>) {
        return DatabaseKnex.getInstance()
            .delete()
            .where(categoryFluxRssReflectToFind)
            .from(tableName)
            .catch((err: ErrorDatabase) => {
                throw new ErrorEntity(MessageError.SERVER_DATABASE_ERROR, err?.sqlMessage as string, err?.code as string);
            });
    }

    /**
     * Transaction Get CategoryFluxRss
     * @param categoryFluxRssReflectToFind
     * @param columns
     * @param trx
     * @return Promise<ICategoryFluxRss[]>
     */
    public static async transactionGet(categoryFluxRssReflectToFind: Partial<ICategoryFluxRss>, columns: Partial<IColumnsCategoryFluxRss>, trx: Transaction) : Promise<ICategoryFluxRss[]> {
        return DatabaseKnex.getInstance()
            .select(transformColumnsToArray(columns))
            .where(categoryFluxRssReflectToFind).from(tableName)
            .transacting(trx)
            .catch((err: ErrorDatabase) => {
                throw new ErrorEntity(MessageError.SERVER_DATABASE_ERROR, err?.sqlMessage as string, err?.code as string);
            });
    }

    /**
     * Transaction Update CategoryFluxRss
     * @param categoryFluxRssReflectToUpdate
     * @param categoryFluxRssReflectToFind
     * @param trx
     */
    public static async transactionUpdate(categoryFluxRssReflectToUpdate: Partial<ICategoryFluxRss>, categoryFluxRssReflectToFind: Partial<ICategoryFluxRss>, trx: Transaction) {
        return DatabaseKnex.getInstance()
            .update(categoryFluxRssReflectToUpdate)
            .where(categoryFluxRssReflectToFind)
            .from(tableName)
            .transacting(trx)
            .catch((err: ErrorDatabase) => {
                throw new ErrorEntity(MessageError.SERVER_DATABASE_ERROR, err?.sqlMessage as string, err?.code as string);
            });
    }

    /**
     * Transaction Create CategoryFluxRss
     * @param categoryFluxRssReflectToCreate
     * @param trx
     */
    public static async transactionCreate(categoryFluxRssReflectToCreate: Partial<ICategoryFluxRss>, trx: Transaction) {
        return DatabaseKnex.getInstance()
            .insert(categoryFluxRssReflectToCreate)
            .into(tableName)
            .transacting(trx)
            .catch((err: ErrorDatabase) => {
                throw new ErrorEntity(MessageError.SERVER_DATABASE_ERROR, err?.sqlMessage as string, err?.code as string);
            });
    }

    /**
     * Transaction Delete CategoryFluxRss
     * @param categoryFluxRssReflectToFind
     * @param trx
     */
    public static async transactionDelete(categoryFluxRssReflectToFind: Partial<ICategoryFluxRss>, trx: Transaction)  {
        return DatabaseKnex.getInstance()
            .delete()
            .where(categoryFluxRssReflectToFind)
            .from(tableName)
            .transacting(trx)
            .catch((err: ErrorDatabase) => {
                throw new ErrorEntity(MessageError.SERVER_DATABASE_ERROR, err?.sqlMessage as string, err?.code as string);
            });
    }
}


