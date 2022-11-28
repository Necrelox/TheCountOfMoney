import React from 'react';
import CryptoCard from '../cryptoInfo/CryptoCard';

class Favorites extends React.Component {
    
    constructor() {
        super();
        this.fav = ['bitcoin', 'ethereum', 'binance-peg-cardano', 'shiba-fantom'];  
    }
    render() {
      return (
        this.fav.map((item) => {
            return <CryptoCard key={item} crypto={item} />
            })
        );
    }
  }

export default Favorites;