import React from 'react';
import ReactDOM from 'react-dom/client';
import axios from 'axios';
import { IgrFinancialChart } from 'igniteui-react-charts';
import { IgrFinancialChartModule } from 'igniteui-react-charts';

IgrFinancialChartModule.register();

interface Props {

}

interface State {
    apiData: any[];
    data: any[];

}

IgrFinancialChartModule.register();

export default class FinancialChartStockIndexChart extends React.Component<Props, State> {
    private isLoading: boolean = true;

    constructor(props: Props) {
        super(props);
        this.state = { 
            data: [
                {Date: '23/9/2022', Open: 16071.06, High: 16073.23, Low: 16068.98, Close: 16070.75},
                {Date: '23/9/2022', Open: 16071.06, High: 16073.23, Low: 16068.98, Close: 16070.75}
            ],
            apiData: [
                [
                  1670328000000,
                  16174.28,
                  16174.28,
                  16167.98,
                  16167.98
                ],
                [
                  1670342400000,
                  16161.68,
                  16186.28,
                  16161.68,
                  16186.28
                ],
                [
                  1670356800000,
                  16190.59,
                  16223.16,
                  16185.2,
                  16223.16
                ]
              ]
        }
    }

    private parseData(data: any[]) {
        this.state.data.splice(0, this.state.data.length);
        for (const item of this.state.apiData) {
            const date = new Date(item[0]).toLocaleString();
            const open = item[1];
            const high = item[2];
            const low = item[3];
            const close = item[4];
            this.state.data.push({ Date: date, Open: open, High: high, Low: low, Close: close});
        }
    }

    // async loadCrypto() {
    //     try {
    //       this.isLoading = true;
    //       const result = await axios.get(`https://api.coingecko.com/api/v3/coins/${this.props.crypto}?localization=false&tickers=false&market_data=true&community_data=false&developer_data=false&sparkline=false`);
    //       if (result.status === 200) {
    //         if (!result.data) throw new Error('No data');
    //         const crypto = result.data;
    //         // this.setState({ apiData });
    //         this.isLoading = false;
    //       } else {
    //         throw new Error(`Error while loading crypto ${result.status}`);
    //       }
    //     } catch (e) {
    //       this.isLoading = false;
    //       // emit vers le parents, et le parent fais un toast
    //     }
    //   }

    public componentDidMount() {
        this.parseData(this.state.apiData);
        console.log(this.state.data);
    }

    public render(): JSX.Element {
        return (
        <div className="container sample" >
            {/* <div className="container" >
                <IgrFinancialChart
                    width="100%"
                    height="400px"
                    isToolbarVisible={false}
                    chartType="Candle"
                    chartTitle="S&P 500"
                    titleAlignment="Left"
                    titleLeftMargin="25"
                    titleTopMargin="10"
                    titleBottomMargin="10"
                    subtitle="CME - CME Delayed Price, Currency in USD"
                    subtitleAlignment="Left"
                    subtitleLeftMargin="25"
                    subtitleTopMargin="5"
                    subtitleBottomMargin="10"
                    yAxisLabelLocation="OutsideLeft"
                    yAxisMode="Numeric"
                    yAxisTitle="Financial Prices"
                    yAxisTitleLeftMargin="10"
                    yAxisTitleRightMargin="5"
                    yAxisLabelLeftMargin="0"
                    zoomSliderType="None"
                    dataSource={this.state.data}/>
            </div> */}
        </div>
        );
    }
}

// rendering above class to the React DOM
// const root = ReactDOM.createRoot(document.getElementById('root'));
// root.render(<CandleGraph/>);
