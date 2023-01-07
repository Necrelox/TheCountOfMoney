import * as React from 'react';
import * as ReactDOM from 'react-dom';
import {SqlHelper} from '@/database/SqlHelper';
import './newsCard.css';

interface IProps {
    newsData: INews;
    itemId: number;
}

interface INews {
    category: string[];
    title: string;
    description: string;
    pubDate: string;
    content: string;
}

interface IState {
    isClicked: boolean;
}

export default class NewsCard extends React.Component<IProps, IState> {
  private sign: string;
  
  constructor(props: IProps) {
    super(props);
    this.sign = "+";
    this.state = {
        isClicked: false
    };
  }

  toggleClick = () => {
    this.setState({isClicked: !this.state.isClicked});
    this.sign = this.sign == "+" ? "-" : "+";
    }
  
  render() {
    return (
        <div className='newsCard flex-column' id={this.props.itemId.toString()}>
            <button className='newsCard-button' onClick={this.toggleClick}> {this.sign} </button>
            <div dangerouslySetInnerHTML={{ __html: this.props.newsData.title }} />
            {this.props.newsData.pubDate}
            {this.state.isClicked 
            ? (<div>
                <div dangerouslySetInnerHTML={{ __html: this.props.newsData.content }} /> 
                {/* <button className='newsCard-button' onClick={this.toggleClick}> {this.sign} </button> */}
                <a href={'#' + this.props.itemId.toString()}>To the top</a>
                </div>) 
                : <div dangerouslySetInnerHTML={{ __html: this.props.newsData.description }} />
            }
            
        </div>
      );
    }
  }