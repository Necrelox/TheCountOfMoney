import * as React from 'react';
import * as ReactDOM from 'react-dom';
import './loginForm.css';
import {SqlHelper} from '@/database/SqlHelper';

interface IFavoritesState {
  username: string;
  password: string;
}

export default class LoginForm extends React.Component<{}, IFavoritesState> {
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
            <h1>By logging-in you get access to your personalized features.</h1>
            <form onSubmit={this.handleSubmit} className="flex-column">
                <label>
                <p>Username</p>
                <input type="text" onChange={e => this.setUserName(e.target.value)} />
                </label>
                <label>
                <p>Password</p>
                <input type="password" onChange={e => this.setPassword(e.target.value)} />
                </label>
                <div>
                <button type="submit" className="login-button">Login</button>
                </div>
            </form>
        </div>
      );
    }
  }