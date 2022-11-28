import React from 'react';
import axios from 'axios';

class CryptoCard extends React.Component {
    isLoading = true;
    constructor(props) {
        super(props);
        this.state = {
            crypto: {},
        };
        // console.log(this.props);
        // this.loadCrypto();
    }

    loadCrypto() {
        console.log('test');
        this.isLoading = true;
        axios.get(`https://api.coingecko.com/api/v3/coins/` + this.props.crypto + `?localization=false&tickers=false&market_data=true&community_data=false&developer_data=false&sparkline=false`)
          .then(res => {
            let cryptoValue = res.data;
            this.setState({ cryptoValue });
            console.log(this.state.cryptoValue);
            this.isLoading = false;
        });
    }

    componentDidMount() {
    }

    render() {
      return (
        <div>
            <h4>name: {this.state.crypto}</h4>
        </div>
        );
    }
  }

export default CryptoCard;