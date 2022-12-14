import * as React from 'react';
import * as ReactDOM from 'react-dom';
import CryptoCard from '@layout/cryptoInfo/CryptoCard';
import './favorites.css';
import {SqlHelper} from '@/database/SqlHelper';

interface IFavoritesState {
  favt: string[];
}

interface IPreferenceData {
  id: string;
  symbol: string;
  name: string;
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
      let prefs: IPreferenceData[];
      if(localStorage.getItem('token') != null){
        prefs = (await SqlHelper.getUserPrefs()).preferences;
        if(prefs == null)
          prefs = (await SqlHelper.getAdminPrefs()).preferences;
      }
      else{
        prefs = (await SqlHelper.getAdminPrefs()).preferences;
      }
      if(prefs.length < 4) {
        let smallData = [];
        for(let i = 0; i < prefs.length; i++) {
          smallData.push(prefs[i].id);          
        }
        this.setState({favt: smallData});
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