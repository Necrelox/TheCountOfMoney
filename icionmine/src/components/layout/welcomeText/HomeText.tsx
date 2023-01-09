import * as React from 'react';
import * as ReactDOM from 'react-dom';
import './homeText.css';

class HomeText extends React.Component<{}, {}> {
  constructor(props: {}) {
    super(props);
  }

  render() {
    return (
      <article className="myArticle">
        <div className="horFlex">
          <div className="vl" />
          <div className="verFlex">
            <p className="title">Welcome</p>
            <p className="subtitle">Come explore the market</p>
            <p className="titleText">
            Welcome to icionmine. Get access to a list of cryptocurrencies’ data, trend and more. Get the latest news about crypto. Create your profile to get personalized data from a list of cryptocurrencies of your choice! Be updated anytime.
            </p>
          </div>
        </div>
      </article>
    );
  }
}

export default HomeText;
