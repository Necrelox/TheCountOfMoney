import * as React from 'react';
import * as ReactDOM from 'react-dom';
import CandleGraph from '../components/layout/candleGraph/CandleGraph';
import './styles/homeStyle.css';

class Home extends React.Component<{}, {}>  {
    render() {
      return (
          <div className='flexGraph'>
            <CandleGraph />
          </div>
        );
    }
  }

export default Home;