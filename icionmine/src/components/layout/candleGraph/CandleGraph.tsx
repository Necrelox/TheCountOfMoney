import React from 'react';
import ReactDOM from 'react-dom/client';
import { IgrFinancialChart } from 'igniteui-react-charts';
import { IgrFinancialChartModule } from 'igniteui-react-charts';
import { SqlHelper } from '../../../database/sql';

IgrFinancialChartModule.register();

interface Props {

}

interface State {
    data: any[],
    favorites: string[];

}

IgrFinancialChartModule.register();

export default class FinancialChartStockIndexChart extends React.Component<Props, State> {
    private isLoading: boolean = true;
    sqlHelper= new SqlHelper();

    constructor(props: Props) {
        super(props);
        this.state = { 
            data: [
                {Date: '23/9/2022', Open: 16071.06, High: 16073.23, Low: 16068.98, Close: 16070.75},
                {Date: '23/9/2022', Open: 16071.06, High: 16073.23, Low: 16068.98, Close: 16070.75}
            ],
            favorites: []
        }
    }

    private changeSelected = async (event: any) => {
        try {
            this.isLoading = true;
            this.setState({data: await this.sqlHelper.loadGraphData(event.target.value)}); 
            this.isLoading = false;
        }
        catch (e) {
            console.log(e);
        }
    }

    public async componentDidMount() {
        try {
            this.setState({favorites: await this.sqlHelper.getFavorites()});
            if(this.state.favorites.length > 0)
                this.setState({data: await this.sqlHelper.loadGraphData(this.state.favorites[0])}); 
            this.isLoading = false;
        } catch (e) {
            console.log(e);
        }

    }

    public render(): JSX.Element {
        if(this.isLoading) 
            return (<div>Loading...</div>);
        else
            return (
                <div>
                <div>
                <select onChange={this.changeSelected} value={this.state.favorites[0]}>
                {
                    this.state.favorites.map((item) => {
                    return <option value={item} key={item}>{item}</option>
                    })
                }
                </select>
                </div>
                <div className="container sample" >
                    <div className="container" >
                        <IgrFinancialChart
                            width="900px"
                            height="400px"
                            isToolbarVisible={true}
                            chartType="Candle"
                            chartTitle={this.state.favorites[0]}
                            titleAlignment="Left"
                            titleLeftMargin="25"
                            titleTopMargin="10"
                            titleBottomMargin="10"
                            subtitle="Variations of price in the last 7 days"
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
                </div>

            );
    }
}