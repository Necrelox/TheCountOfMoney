import React from 'react';
import './homeText.css';

class CryptoCard extends React.Component {
    isLoading = true;
    constructor(props) {
        super(props);
      }

    render() {
      return (
            <article className='myArticle'>
                <div className='horFlex'>
                    <div className='vl'></div>
                    <div className='verFlex'>
                        <p className='title'>Welcome</p>
                        <p className='subtitle'>Come explore the market</p>
                        <p className='titleText'>
                            Lorem Ipsum is simply dummy text of the printing and typesetting 
                            industry. Lorem Ipsum has been the industry's standard dummy
                            text ever since the 1500s, when an unknown printer took a 
                            containing Lorem Ipsum 
                            passages, and more recently with desktop publishing software like 
                            Aldus PageMaker including versions of Lorem Ipsum
                        </p>
                    </div>
                </div>
            </article>
        );
    }
  }

export default CryptoCard;