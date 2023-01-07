import * as React from 'react';
import * as ReactDOM from 'react-dom';
import './preferences.css';
import {SqlHelper} from '@/database/SqlHelper';
import APIChoice from './APIChoice';
import PersonalPrefs from './PersonalPrefs';

interface IPreferencesState {
  username: string;
  password: string;
}

export default class Preferences extends React.Component<{}, IPreferencesState> {
  private isLoading: boolean;
  
  constructor(props: {}) {
    super(props);
    this.isLoading = true;
    this.state = {
        username: "",
        password: ""
    };
  }

  private handleSubmit = async (event: React.SyntheticEvent ) => {
        event.preventDefault();
        try{
            const result = await SqlHelper.login(this.state.username, this.state.password);
            if(!result) throw new Error("Login error");
        }
        catch(e){
            console.log(e);
        }
    }

    setUserName(username: string) {
        this.setState({username: username});
    }

    setPassword(password: string) {
        this.setState({password: password});
    }
  
  render() {
    return (
        <div className="login-wrapper-card flex-column">
            <h1>Choose your favorite crypto from this list.</h1>
            <h5>If you don't find the desired crypto currency, please contact your administrator.</h5>
            <div className='flex-row'>
                <APIChoice />
                <PersonalPrefs />
            </div>
            <button>OK</button>
        </div>
      );
    }
  }