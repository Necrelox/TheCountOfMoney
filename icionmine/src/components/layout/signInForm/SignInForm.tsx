import * as React from 'react';
import * as ReactDOM from 'react-dom';
import {SqlHelper} from '@/database/SqlHelper';
import './signInForm.css';

interface IFavoritesState {
  username: string;
  password: string;
  email: string;
}

export default class SignInForm extends React.Component<{}, IFavoritesState> {
  private isLoading: boolean;
  
  constructor(props: {}) {
    super(props);
    this.isLoading = true;
    this.state = {
        username: "",
        password: "",
        email: ""
    };
  }

  private handleSubmit = async (event: React.SyntheticEvent) => {
        event.preventDefault();
        try{
            const result = await SqlHelper.signup(this.state.username, this.state.password, this.state.email);
            console.log(result);
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

    setEmail(email: string) {
        this.setState({email: email});
    }
  
  render() {
    return (
        <div className="login-wrapper-card flex-column">
            <h1>By registering you can have access to crazy data!</h1>
            <form onSubmit={this.handleSubmit} className="flex-column">
                <label>
                <p>Username</p>
                <input type="text" onChange={e => this.setUserName(e.target.value)} />
                </label>
                <label>
                <p>Email</p>
                <input type="email" onChange={e => this.setEmail(e.target.value)} />
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