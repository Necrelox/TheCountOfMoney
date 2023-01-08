/**
 * Local Modules
 */
import { IPreference, ISourceFluxRss, ITokenFKUser, IUserPreference } from '@/models';
import { SourceFluxRss, CoinDuJournal, IRawArticle, Preference, UserPreference, Token } from '@/services/actions';
import { DatabaseKnex, Transaction } from '@/services/DatabaseKnex';
import { ErrorEntity, MessageError } from '@/utils';

export class CryptoService {
    public static async getActualityRss(): Promise<IRawArticle[]> {
        return DatabaseKnex.getInstance().transaction(async (trx: Transaction) => {
            const fluxRss : Pick<ISourceFluxRss, 'url'>[] = await SourceFluxRss.transactionGetAll({
                url: true,
            }, trx);
            return await CoinDuJournal.getArticlesFromSourcesFluxRss(fluxRss.map((fluxRss) => fluxRss.url));
        });
    }

    public static async addPreference(crypto: IPreference[]) {
        return DatabaseKnex.getInstance().transaction(async (trx: Transaction) => {
            await Preference.transactionCreate(crypto, trx);
        });
    }

    public static async getPreference(): Promise<IPreference[]> {
        return DatabaseKnex.getInstance().transaction(async (trx: Transaction) => {
            return await Preference.transactionGetAll({}, trx);
        });
    }

    public static async addUserPreference(crypto: IPreference[], bearerToken: string) {
        return DatabaseKnex.getInstance().transaction(async (trx: Transaction) => {
            const [tokenFKUser]: Pick<ITokenFKUser, 'userUuid'>[] = await Token.transactionGetFKUser({
                token: bearerToken,
            }, {
                userUuid: true,
            }, trx);
            if (!tokenFKUser)
                throw new ErrorEntity(MessageError.CLIENT_TOKEN_NOT_FOUND);

            const userPref: Partial<IUserPreference>[] = crypto.map((crypto) => {
                return {
                    preferenceId: crypto.id,
                    userUuid: tokenFKUser.userUuid,
                };
            });

            await UserPreference.transactionCreate(userPref, trx);
        });
    }

    public static async getUserPreference(): Promise<IPreference[]> {
        return DatabaseKnex.getInstance().transaction(async (trx: Transaction) => {
            return await UserPreference.transactionGetFKPreference({
                name: true,
                id: 'USER_PREFERENCE.id',
                symbol: true,
            }, trx);
        });
    }

    public static async deleteUserPreference(cryptoId: string, bearer: string) {
        return DatabaseKnex.getInstance().transaction(async (trx: Transaction) => {
            const [tokenFKUser]: Pick<ITokenFKUser, 'userUuid'>[] = await Token.transactionGetFKUser({
                token: bearer,
            }, {
                userUuid: true,
            }, trx);
            if (!tokenFKUser)
                throw new ErrorEntity(MessageError.CLIENT_TOKEN_NOT_FOUND);

            await UserPreference.transactionDelete({
                userUuid: tokenFKUser.userUuid,
                preferenceId: cryptoId,
            }, trx);
        });
    }

    public static async deletePreference(cryptoId: string) {
        return DatabaseKnex.getInstance().transaction(async (trx: Transaction) => {
            await Preference.transactionDelete({
                id: cryptoId,
            }, trx);
        });
    }

}
