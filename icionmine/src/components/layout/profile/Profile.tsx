import * as React from 'react';
import * as ReactDOM from 'react-dom';
import './profile.css';
import {SqlHelper} from '@/database/SqlHelper';

interface IProfileState {
  username: string;
  email: string;
  password: string;
  message: string;
}

export default class Profile extends React.Component<{}, IProfileState> {
  private isLoading: boolean;
  
  constructor(props: {}) {
    super(props);
    this.isLoading = true;
    this.state = {
        username: "",
        email: "",
        password: "",
        message: ""
    };
  }

  private handleSubmit = async () => {
        try{
            const result = await SqlHelper.editProfile(this.state.username, this.state.password, this.state.email, this.state.message);
            if(!result) throw new Error("Login error");
        }
        catch(e){
            console.log(e);
        }
    }

    setUserName(username: string) {
        this.setState({username: username});
    }

    setEmail(email: string) {
        this.setState({email: email});
    }

    setPassword(password: string) {
        this.setState({password: password});
    }

    setMessage(message: string) {
        this.setState({message: message});
    }
  
  render() {
    return (
        <div className="login-wrapper-card flex-column">
            <h1>Change your personal information here.</h1>
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
                <button type="submit" className="login-button">Edit</button>
                </div>
            </form>
        </div>
      );
    }
  }