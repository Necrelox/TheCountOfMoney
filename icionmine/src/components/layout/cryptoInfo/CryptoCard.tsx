import * as React from 'react';
import * as ReactDOM from 'react-dom';
import './cryptoCard.css';
import { SqlHelper } from '@/database/SqlHelper';

interface ICrypto {
  id: number;
  symbol: string;
  eur: number;
  usd: number;
  image: string;
  link: string;
  price24h: number;
}

interface IProps {
  crypto: string;
}

interface IState {
  crypto: ICrypto;
}

class CryptoCard extends React.Component<IProps, IState> {
  isLoading = true;

  constructor(props: IProps) {
    super(props);
    this.state = {
      crypto: {
        id: 0,
        symbol: '',
        eur: 0,
        usd: 0,
        image: '',
        link: '',
        price24h: 0
      }
    };
  }

  async componentDidMount() {
    try{
      this.isLoading = true;
      this.setState({crypto : await SqlHelper.loadCryptoData(this.props.crypto)});
      this.isLoading = false;
    }
    catch(e){
      console.log(e);
    }
  }

  render() {
    if (this.isLoading) {
      return <div>Loading...</div>;
    }
    return (
      <div className="crypto-card">
        <a href={this.state.crypto.link} target="_blank" className="linkAligned">
          <img src={this.state.crypto.image} />
        </a>
            <p>{this.state.crypto.id}</p>
            <h4>{this.state.crypto.symbol}</h4>
            <p>{this.state.crypto.eur} €</p>
            {this.state.crypto.price24h > 0 ? 
            <code className='green'>{this.state.crypto.price24h} %</code> 
            : <code className='red'>{this.state.crypto.price24h} %</code>}
        </div>
        );
    }
  }

export default CryptoCard;