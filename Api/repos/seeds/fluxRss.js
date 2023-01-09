/**
 * @param { import('knex').Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
    try {
        await knex.transaction(async (trx) => {
            const rawSourcesFluxRss = [
                'https://coinjournal.net/fr/actualites/category/analyse/feed/', // analyse
                'https://coinjournal.net/fr/actualites/category/affaires/feed/', // affaires
                'https://coinjournal.net/fr/actualites/crime/feed/', // crime
                'https://coinjournal.net/fr/actualites/category/evenements/feed/', // evenements
                'https://coinjournal.net/fr/actualites/category/en-vedette/feed/', // en-vedette
                'https://coinjournal.net/fr/actualites/category/interview/feed/', // interview
                'https://coinjournal.net/fr/actualites/category/marches/feed/', // marchés
                'https://coinjournal.net/fr/actualites/category/avis/feed/', // avis
                'https://coinjournal.net/fr/actualites/category/politique-et-reglementation/feed/', // politique-et-reglementation
                'https://coinjournal.net/fr/actualites/category/sondages-et-rapports/feed/', // sondages-et-rapports
                'https://coinjournal.net/fr/actualites/category/communique-de-presse/feed/', // communique-de-presse
                'https://coinjournal.net/fr/actualites/category/technologie/feed/', // technologie
                'https://coinjournal.net/fr/actualites/tag/bitcoin/feed/', // bitcoin
                'https://coinjournal.net/fr/actualites/tag/france/feed/', // france
                'https://coinjournal.net/fr/actualites/tag/ethereum/feed/', // ethereum
                'https://coinjournal.net/fr/actualites/tag/wallets/feed/', // wallets
                'https://coinjournal.net/fr/actualites/tag/ripple/feed/', // ripple
                'https://coinjournal.net/fr/actualites/tag/broker/feed/', // broker
                'https://coinjournal.net/fr/actualites/tag/echange/feed/', // echange
            ];
            const rawCategories = [
                'analyse',
                'affaires',
                'crime',
                'evenements',
                'en-vedette',
                'interview',
                'marchés',
                'avis',
                'politique-et-reglementation',
                'sondages-et-rapports',
                'communique-de-presse',
                'technologie',
                'bitcoin',
                'france',
                'ethereum',
                'wallets',
                'ripple',
                'broker',
                'echange',
            ];

            const sourcesFluxRssWithCategoryId = rawSourcesFluxRss.map((rawSourceFluxRss, index) => {
                return {
                    url: rawSourceFluxRss,
                    categoryId: index + 1,
                };
            });
            const categories = rawCategories.map((rawCategory, index) => {
                return {
                    name: rawCategory,
                    id: index + 1,
                };
            });
            await knex.insert(categories).into('CATEGORY_FLUX_RSS').transacting(trx);
            await knex.insert(sourcesFluxRssWithCategoryId).into('SOURCE_FLUX_RSS').transacting(trx);
        });
    } catch (error) {
        console.log(error);
    }
};
