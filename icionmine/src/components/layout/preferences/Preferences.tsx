import * as React from 'react';
import * as ReactDOM from 'react-dom';
import './preferences.css';
import {SqlHelper} from '@/database/SqlHelper';
import APIChoice from './APIChoice';
import PersonalPrefs from './PersonalPrefs';

interface IPreferencesState {
  cryptoFromChild: IClickedCrypto;
}

interface IClickedCrypto {
  id: string;
  symbol: string;
  name: string;
}

export default class Preferences extends React.Component<{}, IPreferencesState> {
  private isLoading: boolean;
  
  constructor(props: {}) {
    super(props);
    this.isLoading = true;
    this.state = {
      cryptoFromChild: {
        id: "",
        symbol: "",
        name: ""
      }
    };
  }

  handleCryptoClick = (crypto: IClickedCrypto) => {
    this.setState({cryptoFromChild: crypto});
  }
  
  render() {
    return (
        <div className="login-wrapper-card flex-column">
            <h1>Choose your favorite crypto from this list.</h1>
            <h5>If you don't find the desired crypto currency, please contact your administrator.</h5>
            <div className='flex-row'>
                <PersonalPrefs cryptoToAdd={this.state.cryptoFromChild}/>
                <APIChoice clickedCrypto={this.handleCryptoClick}/>
            </div>
        </div>
      );
    }
  }