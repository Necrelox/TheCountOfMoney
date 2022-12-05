import React from 'react';
import Favorites from '../components/layout/cryptoFavorites/Favorites';
import HomeText from '../components/layout/welcomeText/HomeText';
import './styles/homeStyle.css';

class Home extends React.Component {
    render() {
      return (
          <div className='flexHome'>
            <HomeText />
            <Favorites />
          </div>
        );
    }
  }

export default Home;