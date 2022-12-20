import * as React from 'react';
import * as ReactDOM from 'react-dom';
import axios from 'axios';

interface graphData {
    date: number;
    open: number;
    high: number;
    low: number;
    close: number;
}

export class SqlHelper {

    constructor() {
    }

    public async getFavorites() : Promise<string[]> {
        try {
            const result = await axios.get(`https://api.coingecko.com/api/v3/coins/list`);
            if (result.status === 200) {
            if (!result.data) throw new Error('No data');
            const firstDigit = this.getRandomInt(result.data.length);
            const secondDigit = this.getRandomInt(result.data.length);
            const thirdDigit = this.getRandomInt(result.data.length);
            const fourthDigit = this.getRandomInt(result.data.length);
            const crypto = [result.data[firstDigit].id, result.data[secondDigit].id, result.data[thirdDigit].id, result.data[fourthDigit].id];
            return crypto;
            } else {
                throw new Error(`Error while loading crypto ${result.status}`);
            }
        } catch (e) {
            return [];
        }
    }

    public async loadGraphData(selectedItem : string) : Promise<graphData[]> {
        try {
          const result = await axios.get(`https://api.coingecko.com/api/v3/coins/${selectedItem}/ohlc?vs_currency=eur&days=7`);
          if (result.status === 200) {
            if (!result.data) throw new Error('No data');
            const apiData: any[] = result.data;
            return apiData;
          } else {
            throw new Error(`Error while loading apiData ${result.status}`);
          }
        } catch (e) {
            return [];
        }
      }
    
    getRandomInt(max: number) {
        return Math.floor(Math.random() * Math.floor(max));
    }
}