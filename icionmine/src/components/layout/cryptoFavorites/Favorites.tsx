import * as React from 'react';
import * as ReactDOM from 'react-dom';
import CryptoCard from '../cryptoInfo/CryptoCard';
import './favorites.css';
import { SqlHelper } from '../../../database/sql';

interface FavoritesState {
  favt: string[];
}

class Favorites extends React.Component<{}, FavoritesState> {
  isLoading = true;
  sqlHelper= new SqlHelper();

  constructor(props: {}) {
    super(props);
    this.state = {
      favt: []
    };
  }

  async componentDidMount() {
    try{
      this.isLoading = true;
      this.setState({favt: await this.sqlHelper.getFavorites()});
      this.isLoading = false;
    }
    catch(e){
      this.isLoading = false;
    }
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