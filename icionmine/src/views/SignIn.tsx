import * as React from 'react';
import * as ReactDOM from 'react-dom';
import SignInForm from '@layout/signInForm/SignInForm';

export default class SignIn extends React.Component<{}, {}>  {
    render() {
      return (
          <div className='flexGraph'>
            <SignInForm />
          </div>
        );
    }
  }