/**
 * Local Modules
 */
/**
 * Dependencies
 */
import { XMLParser } from 'fast-xml-parser';

export interface IRawArticle {
    title: string,
    pubDate: Date,
    description: string,
    content: string,
    category: string,
}

export class CoinDuJournal {
    public static async getArticlesFromSourcesFluxRss(sources: string[]): Promise<IRawArticle[]> {
        const articles: IRawArticle[] = [];
        const xmlParser = new XMLParser();
        for (const source of sources) {
            const response = await fetch(source);
            const xml = await response.text();
            const json = xmlParser.parse(xml);
            if (json?.rss?.channel?.item) {
                let rawArticlesFromSource = json.rss.channel.item;
                rawArticlesFromSource = rawArticlesFromSource.map((rawArticle: any) => {
                    return {
                        title: rawArticle.title,
                        pubDate: rawArticle.pubDate,
                        description: rawArticle.description,
                        content: rawArticle['content:encoded'],
                        category: rawArticle.category,
                    };
                });
                articles.push(...rawArticlesFromSource);
            }
        }
        return articles;
    }
}
