import * as React from 'react';
import * as ReactDOM from 'react-dom';
import {SqlHelper} from '@/database/SqlHelper';
import NewsCard from '../newsCard/NewsCard';

interface IState {
    myNews: INews[];
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
  
  constructor(props: {}) {
    super(props);
    this.isLoading = true;
    this.state = {
        myNews: []
    };
  }

  async componentDidMount() {
    try{
        this.isLoading = true;
        let result = await SqlHelper.getNews();
        //get first 10 elements of result
        this.setState({myNews: result.articles.slice(0, 10)});
        this.isLoading = false;
    }
    catch(e){
        console.log(e);
    }
  }
  
  render() {
    return (
        <div className="login-wrapper-card flex-column">
            <h5>Check out the latest news!</h5>
            <div className="news-wrapper">
                {this.state.myNews.map((news, index) => {
                    return (
                        <div key={index}>
                            <NewsCard newsData={news}/>
                        </div>
                    );
                })}
            </div>
        </div>
      );
    }
  }