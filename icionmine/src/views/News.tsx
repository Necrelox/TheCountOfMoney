import * as React from 'react';
import * as ReactDOM from 'react-dom';
import './styles/preferences.css';
import News from '@/components/layout/news/News';

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

  componentDidMount() {
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
    return (
        <div className='flex-col'>
          <News />
        </div>
      );
  }
}