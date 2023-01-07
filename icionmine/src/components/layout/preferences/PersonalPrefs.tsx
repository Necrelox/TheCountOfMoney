import * as React from 'react';
import * as ReactDOM from 'react-dom';
import './preferences.css';
import {SqlHelper} from '@/database/SqlHelper';

interface IState {
  username: string;
  password: string;
}

export default class PersonalPrefs extends React.Component<{}, IState> {
  private isLoading: boolean;
  
  constructor(props: {}) {
    super(props);
    this.isLoading = true;
    this.state = {
        username: "",
        password: ""
    };
  }
  
  render() {
    return (
        <div className="login-wrapper-card flex-column">
            <p>Prefs</p>
        </div>
      );
    }
  }