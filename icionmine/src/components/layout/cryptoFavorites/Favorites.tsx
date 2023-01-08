import * as React from 'react';
import * as ReactDOM from 'react-dom';
import CryptoCard from '@layout/cryptoInfo/CryptoCard';
import './favorites.css';
import {SqlHelper} from '@/database/SqlHelper';

interface IFavoritesState {
  favt: string[];
}

class Favorites extends React.Component<{}, IFavoritesState> {
  private isLoading: boolean;
  
  constructor(props: {}) {
    super(props);
    this.isLoading = true;
    this.state = {
      favt: []
    };
  }
  
  async componentDidMount() {
    try{
      this.isLoading = true;
      let prefs = (await SqlHelper.getUserPrefs()).preferences;
      if(prefs == null) {
        prefs = (await SqlHelper.getAdminPrefs()).preferences;
      }
      if(prefs.length < 4) {
        for(let i = prefs.length; i < 4; i++) {
          this.setState({favt: [...this.state.favt, prefs[i].id]});
        }
      }else {
        this.setState({favt: [prefs[0].id, prefs[1].id, prefs[2].id, prefs[3].id]});
      }
      this.isLoading = false;
    }
    catch(e){
      console.log(e);
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