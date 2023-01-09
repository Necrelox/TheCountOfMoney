import * as React from 'react';
import * as ReactDOM from 'react-dom';
import {SqlHelper} from '@/database/SqlHelper';
import NewsCard from '../newsCard/NewsCard';

interface IState {
    myNews: INews[];
    page: string;
}

interface INews {
    category: string[];
    title: string;
    description: string;
    pubDate: string;
    content: string;
}

export default class News extends React.Component<{}, IState> {
  private isLoading: boolean;
  private fullNews: INews[];
  private pageNumber: number;
  
  constructor(props: {}) {
    super(props);
    this.isLoading = true;
    this.fullNews = [];
    this.pageNumber = 0;
    this.state = {
        myNews: [],
        page: "1"
    };
  }

  async componentDidMount() {
    try{
        this.isLoading = true;
        this.fullNews = (await SqlHelper.getNews()).articles;
        //get first 10 elements of result
        //round to next integer
        this.pageNumber = Math.ceil(this.fullNews.length / 10);
        this.setState({myNews: this.fullNews.slice(0, 10)});
        this.isLoading = false;
    }
    catch(e){
        console.log(e);
    }
  }


  setPage(page: string) {
    this.setState({page: page});
    this.setState({myNews: this.fullNews.slice((parseInt(page) - 1) * 10, parseInt(page) * 10)});
}

  render() {
    if(this.isLoading) return (<div>Loading...</div>)
    else
    return (
        <div className="flex-column">
            <h5>Check out the latest news!</h5>
            <p>
            <input type="number" className='news-input' min="1" max={this.pageNumber} onChange={e => this.setPage(e.target.value)} />/{this.pageNumber}
            </p>
            <div className="news-wrapper">
                {this.state.myNews.map((news, index) => {
                    return (
                        <div key={index}>
                            <NewsCard newsData={news} itemId={index}/>
                        </div>
                    );
                })}
            </div>
        </div>
      );
    }
  }