/**
 * Local Modules
 */
import { ISourceFluxRss } from '@/models';
import { SourceFluxRss, CoinDuJournal, IRawArticle, Preference } from '@/services/actions';
import { DatabaseKnex, Transaction } from '@/services/DatabaseKnex';

export class CryptoService {
    public static async getActualityRss(): Promise<IRawArticle[]> {
        return DatabaseKnex.getInstance().transaction(async (trx: Transaction) => {
            const fluxRss : Pick<ISourceFluxRss, 'url'>[] = await SourceFluxRss.transactionGetAll({
                url: true,
            }, trx);
            return await CoinDuJournal.getArticlesFromSourcesFluxRss(fluxRss.map((fluxRss) => fluxRss.url));
        });
    }

    public static async addNewPreference() {
        return DatabaseKnex.getInstance().transaction(async (trx: Transaction) => {
            Preference.transactionCreate()
        });
    }

}
