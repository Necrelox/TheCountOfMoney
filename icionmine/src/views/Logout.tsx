import * as React from 'react';
import * as ReactDOM from 'react-dom';

export default class Logout extends React.Component<{}, {}>  {

    componentDidMount() {
        localStorage.removeItem('expiryToken');
        localStorage.removeItem('username');
        localStorage.removeItem('userRole');
        window.location.href = '/';
    }

    render() {
      return (
          <div className='flexGraph'>
            <h1>You successfully logged out</h1>
          </div>
        );
    }
  }