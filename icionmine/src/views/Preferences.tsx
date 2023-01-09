import * as React from 'react';
import * as ReactDOM from 'react-dom';
import Preferences from '@layout/preferences/Preferences';
import Profile from '@layout/profile/Profile';
import './styles/preferences.css';

interface IsPreferencesState {
  isPrefs: boolean;
}

export default class Login extends React.Component<{}, IsPreferencesState>  {
  isLoading: boolean;

  constructor(props: {}) {
    super(props);
    this.isLoading = true;
    this.state = {
        isPrefs: true
    };
  }

  componentDidMount() {
    this.isLoading = true;
    this.setState({isPrefs: true});
    this.isLoading = false;
  }

  private openProfile = () => {
    this.setState({isPrefs: false});
  }

  private openPreferences = () => {
    this.setState({isPrefs: true});
  }

  render() {
    let showForm;
    if(this.state.isPrefs) {
      showForm = < Preferences />
    } else {
      showForm = <Profile />
    }

    return (
        <div className='flex-col'>
          <div className='flex-row'>
            <button className='pref-button' onClick={this.openPreferences}>Preferences</button>
            <button className='pref-button' onClick={this.openProfile}>Profile</button>
          </div>
          {showForm}
        </div>
      );
  }
}