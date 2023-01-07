import * as React from 'react';
import * as ReactDOM from 'react-dom';
import './preferences.css';
import {SqlHelper} from '@/database/SqlHelper';

interface IState {
  coins: IAllCoinsData[];
}

interface IAllCoinsData {
    id: string;
    symbol: string;
    name: string;
  };

export default class APIChoice extends React.Component<{}, IState> {
  private isLoading: boolean;
  
  constructor(props: {}) {
    super(props);
    this.isLoading = true;
    this.state = {
        coins: []
    };
  }

  async onComponentDidMount() {
    try{
        this.isLoading = true;
        const result: IAllCoinsData[] = await SqlHelper.getAllCoins();
        this.setState({coins: result});
        console.log(result);
        this.isLoading = false;
    }
    catch(e){
        console.log(e);
    }
  }
  
  render() {
    // if(this.isLoading) return (<div>Loading...</div>)
    // else
    return (
        <table>
            <thead>

            <tr>
                <th>id</th>
                <th>symbol</th>
                <th>name</th>
            </tr>
            </thead>
            <tbody>
            {/* foreach state coin create data */}
            {/* {this.state.coins.map((coin) => {
                return (
                    <tr>
                        <td>{coin.id}</td>
                        <td>{coin.symbol}</td>
                        <td>{coin.name}</td>
                    </tr>
                )
            })} */}
            </tbody>
            </table>
      );
    }
  }
  