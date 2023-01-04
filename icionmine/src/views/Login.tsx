import * as React from 'react';
import * as ReactDOM from 'react-dom';
import LoginForm from '@layout/loginForm/LoginForm';

export default class Login extends React.Component<{}, {}>  {
    render() {
      return (
          <div className='flexGraph'>
            <LoginForm />
          </div>
        );
    }
  }