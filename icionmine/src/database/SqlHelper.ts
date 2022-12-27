import axios from 'axios';
import { MessageError, ErrorEntity } from '@/utils';

interface IGraphData {
  date: Date;
  open: number;
  high: number;
  low: number;
  close: number;
};

interface ICryptoData {
  id: number;
  symbol: string;
  eur: number;
  usd: number;
  image: string;
  link: string;
  price24h: number;
};

export class SqlHelper {
  
  public static async getFavorites() : Promise<string[]> {
    const result = await axios.get(`https://api.coingecko.com/api/v3/coins/list`);
    if (result.status === 200) {
      if (!result.data) throw new ErrorEntity(MessageError.CRYPTO_NO_DATA_FOUND);
      const firstDigit = this.getRandomInt(result.data.length);
      const secondDigit = this.getRandomInt(result.data.length);
      const thirdDigit = this.getRandomInt(result.data.length);
      const fourthDigit = this.getRandomInt(result.data.length);
      const crypto = [result.data[firstDigit].id, result.data[secondDigit].id, result.data[thirdDigit].id, result.data[fourthDigit].id];
      return crypto;
    } else {
      throw new ErrorEntity(MessageError.CRYPTO_FAVORITES);
    }
  }
  
  public static async loadGraphData(selectedItem : string) : Promise<IGraphData[]> {
    const result = await axios.get(`https://api.coingecko.com/api/v3/coins/${selectedItem}/ohlc?vs_currency=eur&days=7`);
    if (result.status === 200) {
      if (!result.data) throw new ErrorEntity(MessageError.CRYPTO_NO_DATA_FOUND);
      const apiData: any[] = result.data;
      for (let i = 0; i < apiData.length; i++) {
        apiData[i] = {
          date: new Date(apiData[i][0]),
          open: apiData[i][1],
          high: apiData[i][2],
          low: apiData[i][3],
          close: apiData[i][4],
        }
      }
      return apiData;
    } else {
      throw new ErrorEntity(MessageError.CRYPTO_GRAPH_DATA);
    }
  }
  
  public static async loadCryptoData(crypto: string) : Promise<ICryptoData> {
    const result = await axios.get(`https://api.coingecko.com/api/v3/coins/${crypto}?localization=false&tickers=false&market_data=true&community_data=false&developer_data=false&sparkline=false`);
    if (result.status === 200) {
      if (!result.data) throw new ErrorEntity(MessageError.CRYPTO_NO_DATA_FOUND);
      const crypto : ICryptoData = {
        id : result.data.id,
        symbol : result.data.symbol,
        eur : result.data.market_data.current_price.eur,
        usd: result.data.market_data.current_price.usd,
        image: result.data.image.large,
        link: result.data.links.homepage[0],
        price24h: result.data.market_data.price_change_percentage_24h,
      };
      return crypto;
    } else {
      throw new ErrorEntity(MessageError.CRYPTO_DATA);
    }
  }
  
  private static getRandomInt(max: number) : number {
    return Math.floor(Math.random() * Math.floor(max));
  }
}