import * as React from 'react';
import * as ReactDOM from 'react-dom';
import Favorites from '@layout/cryptoFavorites/Favorites';
import HomeText from '@layout/welcomeText/HomeText';
import './styles/homeStyle.css';

class Home extends React.Component<{}, {}> {
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