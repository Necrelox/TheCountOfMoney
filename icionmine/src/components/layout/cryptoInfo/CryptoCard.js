import React from 'react';
import axios from 'axios';
import './cryptoCard.css';

class CryptoCard extends React.Component {
    isLoading = true;
    constructor(props) {
        super(props);
        this.state = {
            crypto: {}
        };
      }

    async loadCrypto () {
      try {
        this.isLoading = true;
        const result = await axios.get(`https://api.coingecko.com/api/v3/coins/${this.props.crypto}?localization=false&tickers=false&market_data=true&community_data=false&developer_data=false&sparkline=false`);
        if (result.status === 200) {
          if (!result.data) throw new Error('No data');
          const crypto = result.data;
          this.setState({ crypto: crypto });
          this.isLoading = false;
        } else {
          throw new Error(`Error while loading crypto ${result.status}`);
        }
      } catch (e) {
        this.isLoading = false;
        // emit vers le parents, et le parent fais un toast
      }
      
    }

    componentDidMount() {
      this.loadCrypto();
    }

    render() {
      return (
        <div className="myCard">
          <a href={this.state.crypto.links?.homepage[0]} target="_blank" className='linkAligned'><img src={this.state.crypto.image?.large} /></a>
            <p>{this.state.crypto.id}</p>
            <h4>{this.state.crypto.symbol}</h4>
            <p>{this.state.crypto.market_data?.current_price?.eur} €</p>
            {this.state.crypto.market_data?.price_change_percentage_24h > 0 ? 
            <code className='green'>{this.state.crypto.market_data?.price_change_percentage_24h} %</code> 
            : <code className='red'>{this.state.crypto.market_data?.price_change_percentage_24h} %</code>}
        </div>
        );
    }
  }

export default CryptoCard;