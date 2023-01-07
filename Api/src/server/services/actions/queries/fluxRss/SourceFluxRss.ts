/**
 * Local Modules
 */
import { transformColumnsToArray } from '@/services/actions/queries/ColumnSelectorBuilder';
import { ISourceFluxRss } from '@/models';
import { DatabaseKnex, ErrorDatabase, Transaction } from '@/services';
import { ErrorEntity, MessageError } from '@/utils';

/**
 * IColumnsSourceFluxRss
 */
export interface IColumnsSourceFluxRss {
    url: boolean;
    categoryId: boolean;
    id: boolean | string,
}
/**
 * Table Name
 */
export const tableName = 'SOURCE_FLUX_RSS';

/**
 * SourceFluxRss class : is the class that contains the queries for the table SOURCE_FLUX_RSS
 */
export class SourceFluxRss {
    /**
     * Get SourceFluxRss
     * @param sourceFluxRssReflectToFind
     * @param columns
     * @return Promise<ISourceFluxRss[]>
     */
    public static async get(sourceFluxRssReflectToFind: Partial<ISourceFluxRss>, columns: Partial<IColumnsSourceFluxRss>) : Promise<ISourceFluxRss[]> {
        return DatabaseKnex.getInstance()
            .select(transformColumnsToArray(columns))
            .where(sourceFluxRssReflectToFind).from(tableName)
            .catch((err: ErrorDatabase) => {
                throw new ErrorEntity(MessageError.SERVER_DATABASE_ERROR, err?.sqlMessage as string, err?.code as string);
            });
    }

    /**
     * Update SourceFluxRss
     * @param sourceFluxRssReflectToUpdate
     * @param sourceFluxRssReflectToFind
     */
    public static async update(sourceFluxRssReflectToUpdate: Partial<ISourceFluxRss>, sourceFluxRssReflectToFind: Partial<ISourceFluxRss>) {
        return DatabaseKnex.getInstance()
            .update(sourceFluxRssReflectToUpdate)
            .where(sourceFluxRssReflectToFind)
            .from(tableName)
            .catch((err: ErrorDatabase) => {
                throw new ErrorEntity(MessageError.SERVER_DATABASE_ERROR, err?.sqlMessage as string, err?.code as string);
            });
    }
    /**
     * Create SourceFluxRss
     * @param sourceFluxRssReflectToCreate
     */
    public static async create(sourceFluxRssReflectToCreate: Partial<ISourceFluxRss>) {
        return DatabaseKnex.getInstance()
            .insert(sourceFluxRssReflectToCreate)
            .into(tableName)
            .catch((err: ErrorDatabase) => {
                throw new ErrorEntity(MessageError.SERVER_DATABASE_ERROR, err?.sqlMessage as string, err?.code as string);
            });
    }

    /**
     * Delete SourceFluxRss
     * @param sourceFluxRssReflectToFind
     */
    public static async delete(sourceFluxRssReflectToFind: Partial<ISourceFluxRss>) {
        return DatabaseKnex.getInstance()
            .delete()
            .where(sourceFluxRssReflectToFind)
            .from(tableName)
            .catch((err: ErrorDatabase) => {
                throw new ErrorEntity(MessageError.SERVER_DATABASE_ERROR, err?.sqlMessage as string, err?.code as string);
            });
    }

    /**
     * Transaction Get SourceFluxRss
     * @param sourceFluxRssReflectToFind
     * @param columns
     * @param trx
     * @return Promise<ISourceFluxRss[]>
     */
    public static async transactionGet(sourceFluxRssReflectToFind: Partial<ISourceFluxRss>, columns: Partial<IColumnsSourceFluxRss>, trx: Transaction) : Promise<ISourceFluxRss[]> {
        return DatabaseKnex.getInstance()
            .select(transformColumnsToArray(columns))
            .where(sourceFluxRssReflectToFind).from(tableName)
            .transacting(trx)
            .catch((err: ErrorDatabase) => {
                throw new ErrorEntity(MessageError.SERVER_DATABASE_ERROR, err?.sqlMessage as string, err?.code as string);
            });
    }

    public static async transactionGetAll(columns: Partial<IColumnsSourceFluxRss>, trx: Transaction) : Promise<ISourceFluxRss[]> {
        return DatabaseKnex.getInstance()
            .select(transformColumnsToArray(columns))
            .from(tableName)
            .transacting(trx)
            .catch((err: ErrorDatabase) => {
                throw new ErrorEntity(MessageError.SERVER_DATABASE_ERROR, err?.sqlMessage as string, err?.code as string);
            });
    }

    /**
     * Transaction Update SourceFluxRss
     * @param sourceFluxRssReflectToUpdate
     * @param sourceFluxRssReflectToFind
     * @param trx
     */
    public static async transactionUpdate(sourceFluxRssReflectToUpdate: Partial<ISourceFluxRss>, sourceFluxRssReflectToFind: Partial<ISourceFluxRss>, trx: Transaction) {
        return DatabaseKnex.getInstance()
            .update(sourceFluxRssReflectToUpdate)
            .where(sourceFluxRssReflectToFind)
            .from(tableName)
            .transacting(trx)
            .catch((err: ErrorDatabase) => {
                throw new ErrorEntity(MessageError.SERVER_DATABASE_ERROR, err?.sqlMessage as string, err?.code as string);
            });
    }

    /**
     * Transaction Create SourceFluxRss
     * @param sourceFluxRssReflectToCreate
     * @param trx
     */
    public static async transactionCreate(sourceFluxRssReflectToCreate: Partial<ISourceFluxRss>, trx: Transaction) {
        return DatabaseKnex.getInstance()
            .insert(sourceFluxRssReflectToCreate)
            .into(tableName)
            .transacting(trx)
            .catch((err: ErrorDatabase) => {
                throw new ErrorEntity(MessageError.SERVER_DATABASE_ERROR, err?.sqlMessage as string, err?.code as string);
            });
    }

    /**
     * Transaction Delete SourceFluxRss
     * @param sourceFluxRssReflectToFind
     * @param trx
     */
    public static async transactionDelete(sourceFluxRssReflectToFind: Partial<ISourceFluxRss>, trx: Transaction)  {
        return DatabaseKnex.getInstance()
            .delete()
            .where(sourceFluxRssReflectToFind)
            .from(tableName)
            .transacting(trx)
            .catch((err: ErrorDatabase) => {
                throw new ErrorEntity(MessageError.SERVER_DATABASE_ERROR, err?.sqlMessage as string, err?.code as string);
            });
    }
}


