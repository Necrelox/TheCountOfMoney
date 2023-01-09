import * as React from 'react';
import * as ReactDOM from 'react-dom';
import './preferences.css';
import {SqlHelper} from '@/database/SqlHelper';

interface IState {
  cryptoList: IAllCoinsData[];
}

interface IProps {
  cryptoToAdd: IAllCoinsData;
}

interface IAllCoinsData {
    id: string;
    symbol: string;
    name: string;
  };

export default class PersonalPrefs extends React.Component<IProps, IState> {
  private isLoading: boolean;
  
  constructor(props: IProps) {
    super(props);
    this.isLoading = true;
    this.state = {
        cryptoList: []
    };
  }

  async componentDidMount() {
    try{
      if(localStorage.getItem('userRole') == 'admin') {
        const result: IAllCoinsData[] = (await SqlHelper.getAdminPrefs()).preferences;
        this.setState({cryptoList: result});
      }
      else if(localStorage.getItem('userRole') == 'user') {
        const result: IAllCoinsData[] = (await SqlHelper.getUserPrefs()).preferences;
        this.setState({cryptoList: result});
      }
    }
    catch(e){
        console.log(e);
    }
  }

  componentDidUpdate(prevProps: IProps) {
    if (this.props.cryptoToAdd !== prevProps.cryptoToAdd) {
      this.setState({cryptoList: [...this.state.cryptoList, this.props.cryptoToAdd]});
    }
  }

  onTrigger = (e: React.MouseEvent<HTMLTableDataCellElement, MouseEvent>) => {
    const id = e.currentTarget.parentElement!.children[0].innerHTML;
    const name = e.currentTarget.parentElement!.children[1].innerHTML;
    const clickedCrypto: IAllCoinsData = {
      id: id,
      symbol: '',
      name: name
    };
    if(this.state.cryptoList.some((crypto) => crypto.id === clickedCrypto.id)){
      //check if crypto is already in list
      this.setState({cryptoList: this.state.cryptoList.filter((crypto) => crypto.id !== clickedCrypto.id)});
    }
  }

  sendPrefs = async () => {
    try{
      if(localStorage.getItem('userRole') == 'admin') {
        await SqlHelper.editAdminPref(this.state.cryptoList);
      }
      else if(localStorage.getItem('userRole') == 'user') {
        await SqlHelper.editUserPref(this.state.cryptoList);
      }
    }
    catch(e){
        console.log(e);
    }
  }
  
  render() {
    return (
      <div className='table-container'>
        <table>
            <thead>
              <tr>
                  <th>Name</th>
              </tr>
            </thead>
            <tbody>
            {this.state.cryptoList.map((coin) => {
                return (
                    <tr key={coin.id}>
                        <td className='hiddenData'>{coin.id}</td>
                        <td onClick={this.onTrigger}>{coin.name}</td>
                    </tr>
                )
            })}
            </tbody>
            </table>
              <button className='btn btn-primary sticky-bottom' onClick={this.sendPrefs}>Save</button>
            </div>
      );
    }
  }