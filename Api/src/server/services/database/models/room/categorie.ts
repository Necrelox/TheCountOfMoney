/**
 * Local Modules
 */
import { DatabaseKnex, ErrorDatabase, Transaction } from '../../DatabaseKnex';
import { ICategorie } from '../../../../models';
import { transformColumnsToArray } from '../columnSelectorBuilder';
/**
 * IColumnCategorie
 */
export interface IColumnsCategorie {
    name: boolean,
    createdAt: boolean,
    uuid: boolean | string,
}

/**
 * Table Name
 */
export const tableName = 'CATEGORIE';

/**
 * Categorie class : is the class that contains the queries for the table CATEGORIE
 */
export class Categorie {
    /**
     * Get Categorie
     * @param categorieReflectToFind
     * @param columns
     * @return Promise<ICategorie[]>
     */
    public static async get(categorieReflectToFind: Partial<ICategorie>, columns: Partial<IColumnsCategorie>) : Promise<ICategorie[]> {
        return DatabaseKnex.getInstance()
            .select(transformColumnsToArray(columns))
            .where(categorieReflectToFind).from(tableName)
            .then((rows: ICategorie[]) => rows)
            .catch((err: ErrorDatabase) => {
                throw {
                    code: err?.code,
                    message: DatabaseKnex.createBetterSqlMessageError(err?.code as string, err?.sqlMessage as string),
                    sql: err?.sql,
                };
            });
    }

    /**
     * Update Categorie
     * @param categorieReflectToUpdate
     * @param categorieReflectToFind
     */
    public static async update(categorieReflectToUpdate: Partial<ICategorie>, categorieReflectToFind: Partial<ICategorie>) {
        return DatabaseKnex.getInstance()
            .update(categorieReflectToUpdate)
            .where(categorieReflectToFind)
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
     * Create Categorie
     * @param categorieReflectToCreate
     */
    public static async create(categorieReflectToCreate: Partial<ICategorie>) {
        return DatabaseKnex.getInstance()
            .insert(categorieReflectToCreate)
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
     * Delete Categorie
     * @param categorieReflectToFind
     */
    public static async delete(categorieReflectToFind: Partial<ICategorie>) {
        return DatabaseKnex.getInstance()
            .delete()
            .where(categorieReflectToFind)
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
     * Transaction get Categorie
     * @param categorieReflectToFind
     * @param columns
     * @param trx
     * @return Promise<ICategorie[]>
     */
    public static async transactionGet(categorieReflectToFind: Partial<ICategorie>, columns: Partial<IColumnsCategorie>, trx: Transaction) : Promise<ICategorie[]> {
        return DatabaseKnex.getInstance()
            .select(transformColumnsToArray(columns))
            .where(categorieReflectToFind).from(tableName)
            .transacting(trx);
    }

    /**
     * Transaction update Categorie
     * @param categorieReflectToUpdate
     * @param categorieReflectToFind
     * @param trx
     */
    public static async transactionUpdate(categorieReflectToUpdate: Partial<ICategorie>, categorieReflectToFind: Partial<ICategorie>, trx: Transaction) {
        return DatabaseKnex.getInstance()
            .update(categorieReflectToUpdate)
            .where(categorieReflectToFind)
            .from(tableName)
            .transacting(trx);
    }

    /**
     * Transaction create Categorie
     * @param categorieReflectToCreate
     * @param trx
     */
    public static async transactionCreate(categorieReflectToCreate: Partial<ICategorie>, trx: Transaction) {
        return DatabaseKnex.getInstance()
            .insert(categorieReflectToCreate)
            .into(tableName)
            .transacting(trx);
    }

    /**
     * Transaction delete Categorie
     * @param categorieReflectToFind
     * @param trx
     */
    public static async transactionDelete(categorieReflectToFind: Partial<ICategorie>, trx: Transaction) {
        return DatabaseKnex.getInstance()
            .delete()
            .where(categorieReflectToFind)
            .from(tableName)
            .transacting(trx);
    }
}

