import * as React from 'react';
import * as ReactDOM from 'react-dom';
import CryptoCard from '../cryptoInfo/CryptoCard';
import axios from 'axios';
import './favorites.css';

interface FavoritesState {
  favt: string[];
}

class Favorites extends React.Component<{}, FavoritesState> {
  isLoading = true;

  constructor(props: {}) {
    super(props);
    this.state = {
      favt: []
    };
  }

  async getFavorites() {
    try {
      this.isLoading = true;
      const result = await axios.get(`https://api.coingecko.com/api/v3/coins/list`);
      if (result.status === 200) {
        if (!result.data) throw new Error('No data');
        const firstDigit = this.getRandomInt(result.data.length);
        const secondDigit = this.getRandomInt(result.data.length);
        const thirdDigit = this.getRandomInt(result.data.length);
        const fourthDigit = this.getRandomInt(result.data.length);
        const crypto = [result.data[firstDigit].id, result.data[secondDigit].id, result.data[thirdDigit].id, result.data[fourthDigit].id];
        this.setState({ favt: crypto });
        this.isLoading = false;
      } else {
        throw new Error(`Error while loading crypto ${result.status}`);
      }
    } catch (e) {
      this.isLoading = false;
      // emit vers le parents, et le parent fais un toast
    }
  }

  getRandomInt(max: number) {
    return Math.floor(Math.random() * Math.floor(max));
  }

  componentDidMount() {
    this.getFavorites();
  }

  render() {
    if(this.isLoading) {
      return <div>Loading...</div>
    }else 
    return (
      <div className='favs'>
        <button>+</button>
        <div className="cryptoFavorites">
          {
            this.state.favt.map((item) => {
              return <CryptoCard key={item} crypto={item} />
            })
          }
        </div>
      </div>
      );
  }
}

export default Favorites;