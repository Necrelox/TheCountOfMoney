import * as React from 'react';
import * as ReactDOM from 'react-dom';
import Preferences from '@layout/preferences/Preferences';
import Profile from '@layout/profile/Profile';

interface IsPreferencesState {
  isProfile: boolean;
}

export default class Login extends React.Component<{}, IsPreferencesState>  {
  isLoading: boolean;

  constructor(props: {}) {
    super(props);
    this.isLoading = true;
    this.state = {
        isProfile: true
    };
  }

  onComponentDidMount() {
    this.isLoading = true;
    this.setState({isProfile: true});
    this.isLoading = false;
  }

  private openProfile = () => {
    this.setState({isProfile: true});
  }

  private openPreferences = () => {
    this.setState({isProfile: false});
  }

  render() {
    let showForm;
    if(this.state.isProfile) {
        showForm = <Profile />
    } else {
        showForm = < Preferences />
    }

    return (
        <div>
          <button onClick={this.openProfile}>Profile</button>
          <button onClick={this.openPreferences}>Preferences</button>
          {showForm}
        </div>
      );
  }
}