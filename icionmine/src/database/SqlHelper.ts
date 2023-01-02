import axios from 'axios';
import { MessageError, ErrorEntity } from '@/utils';
import {Buffer} from 'buffer';

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

interface ILoginData {
  code: string;
  message: string;
  token: string;
};

interface ISignUpData {
  code: string;
  message: string;
};

interface IToken {
  alg: string;
  exp: string;
}

interface ITokenPayload {
  username: string;
  roles: {
    permissions: string[];
  };
}

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

  public static async login(username: string, password: string) : Promise<ILoginData> {
    const result = await axios.post(`http://localhost:3973/account/login`, { username, password });
    if (result.status === 200) {
      if (!result.data) throw new ErrorEntity(MessageError.LOGIN_NO_DATA_FOUND);
      const header = result.data.token.split(".")[0];
      const payLoad = result.data.token.split(".")[1];
      const tokenHeader : IToken = JSON.parse(Buffer.from(header, 'base64').toString('utf8'));
      const tokenPayload: ITokenPayload = JSON.parse(Buffer.from(payLoad, 'base64').toString('utf8'));
      const roles = Object.keys(tokenPayload.roles);
      if(!roles[0]) throw new Error("No roles found");
      localStorage.setItem('username', tokenPayload.username);
      localStorage.setItem('expiryToken', JSON.stringify(tokenHeader.exp));
      localStorage.setItem('userRole', roles[0]);
      window.location.reload();
      return result.data;
    } else {
      throw new ErrorEntity(MessageError.LOGIN);
    }
  }

  public static async signup(username: string, password: string, email: string) : Promise<ISignUpData> {
    const result = await axios.post(`http://localhost:3973/account/signup`, { username, password, email });
    if (result.status === 201) {
      if (!result.data) throw new ErrorEntity(MessageError.SIGNUP_NO_DATA_FOUND);
      await this.login(username, password);
      return result.data;
    } else {
      throw new ErrorEntity(MessageError.SIGNUP);
    }
  }
}