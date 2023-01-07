import * as React from 'react';
import * as ReactDOM from 'react-dom';
import './preferences.css';
import {SqlHelper} from '@/database/SqlHelper';

interface IState {
  coins: IAllCoinsData[];
}

interface IProps {
  clickedCrypto: (crypto: IAllCoinsData) => void;
}

interface IAllCoinsData {
    id: string;
    symbol: string;
    name: string;
  };

export default class APIChoice extends React.Component<IProps, IState> {
  private isLoading: boolean;
  private allCoins: IAllCoinsData[];
  
  constructor(props: IProps) {
    super(props);
    this.isLoading = true;
    this.allCoins = [];
    this.state = {
        coins: []
    };
  }

  async componentDidMount() {
    try{
        this.isLoading = true;
        //if admin is logged in, get all coins
        //if user is logged in, get all coins that admin has added
        const result: IAllCoinsData[] = await SqlHelper.getAllCoins();
        this.allCoins = result;
        this.setState({coins: result});
        this.isLoading = false;
    }
    catch(e){
        console.log(e);
    }
  }

  refineSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const search = e.target.value;
    const filteredCoins = this.allCoins.filter((coin) => {
      return coin.name.toLowerCase().includes(search.toLowerCase());
    });
    this.setState({coins: filteredCoins});
  }
  

  onTrigger = (e: React.MouseEvent<HTMLTableDataCellElement, MouseEvent>) => {
    const id = e.currentTarget.parentElement!.children[0].innerHTML;
    const name = e.currentTarget.parentElement!.children[1].innerHTML;
    const clickedCrypto: IAllCoinsData = {
      id: id,
      symbol: '',
      name: name
    };
    this.props.clickedCrypto(clickedCrypto);
  }

  render() {
    // if(this.isLoading) return (<div>Loading...</div>)
    // else
    return (
      <div className='table-container'>
        {/* add a search bar */}
        <input type='text' placeholder='Search...' className='search-bar' onChange={this.refineSearch}/>
        <table>
            <thead>
              <tr>
                  <th>Name</th>
              </tr>
            </thead>
            <tbody>
            {this.state.coins.map((coin) => {
                return (
                    <tr key={coin.id}>
                        <td className='hiddenData'>{coin.id}</td>
                        <td onClick={this.onTrigger}>{coin.name}</td>
                    </tr>
                )
            })}
            </tbody>
            </table>
            </div>
      );
    }
  }
  