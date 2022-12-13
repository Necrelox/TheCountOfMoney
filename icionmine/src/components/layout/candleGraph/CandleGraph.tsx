import React from 'react';
import ReactDOM from 'react-dom/client';
import axios from 'axios';
import { IgrFinancialChart } from 'igniteui-react-charts';
import { IgrFinancialChartModule } from 'igniteui-react-charts';

IgrFinancialChartModule.register();

interface Props {

}

interface State {
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
            ]
        }
    }

    private parseData(data: any[]) {
        this.state.data.splice(0, this.state.data.length);
        const arr: any[] = [];
        for (const item of data) {
            const date = new Date(item[0]);
            const open = item[1];
            const high = item[2];
            const low = item[3];
            const close = item[4];
            arr.push({ Date: date, Open: open, High: high, Low: low, Close: close});
        }
        this.setState({ data: arr });
    }

    async loadGraphData() {
        try {
          this.isLoading = true;
          const result = await axios.get(`https://api.coingecko.com/api/v3/coins/bitcoin/ohlc?vs_currency=eur&days=7`);
          if (result.status === 200) {
            if (!result.data) throw new Error('No data');
            const apiData: any[] = result.data;
            this.isLoading = false;
            return apiData;
          } else {
            throw new Error(`Error while loading apiData ${result.status}`);
          }
        } catch (e) {
          this.isLoading = false;
          // emit vers le parent, et le parent fait un toast
        }
      }

    public async componentDidMount() {
        const arr = await this.loadGraphData(); 
        if(Array.isArray(arr)){
            this.parseData(arr);
        }
    }

    public render(): JSX.Element {
        //if is loading return loading
        if (this.isLoading) {
            return <div>Loading...</div>;
        }
        else {
            return (
                <div className="container sample" >
                    <div className="container" >
                        <IgrFinancialChart
                            width="100%"
                            height="400px"
                            isToolbarVisible={true}
                            chartType="Candle"
                            chartTitle="Bitcoin"
                            titleAlignment="Left"
                            titleLeftMargin="25"
                            titleTopMargin="10"
                            titleBottomMargin="10"
                            subtitle="Variations of bitcoin price in the last 7 days"
                            subtitleAlignment="Left"
                            subtitleLeftMargin="25"
                            subtitleTopMargin="5"
                            subtitleBottomMargin="10"
                            yAxisLabelLocation="OutsideLeft"
                            yAxisMode="Numeric"
                            yAxisTitle="Price"
                            yAxisTitleLeftMargin="10"
                            yAxisTitleRightMargin="5"
                            yAxisLabelLeftMargin="0"
                            zoomSliderType="None"
                            dataSource={this.state.data}/>
                    </div>
                </div>
            );
        }
    }
}

// rendering above class to the React DOM
// const root = ReactDOM.createRoot(document.getElementById('root'));
// root.render(<CandleGraph/>);
