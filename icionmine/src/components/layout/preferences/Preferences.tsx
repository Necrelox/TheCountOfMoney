import * as React from 'react';
import * as ReactDOM from 'react-dom';
import './preferences.css';
import {SqlHelper} from '@/database/SqlHelper';

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
  
  async componentDidMount() {
    try{
      this.isLoading = true;
    //   this.setState({username: await SqlHelper.getFavorites()});
      this.isLoading = false;
    }
    catch(e){
      console.log(e);
    }
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
            <form onSubmit={this.handleSubmit} className="flex-column">
                <label>
                <p>List</p>
                <input type="text" onChange={e => this.setUserName(e.target.value)} />
                </label>
                <label>
                <p>Blabla</p>
                <input type="password" onChange={e => this.setPassword(e.target.value)} />
                </label>
                <div>
                <button type="submit" className="login-button">Edit</button>
                </div>
            </form>
        </div>
      );
    }
  }