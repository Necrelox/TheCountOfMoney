import React from 'react';
import ReactDOM from 'react-dom/client';
import { IgrFinancialChart } from 'igniteui-react-charts';
import { IgrFinancialChartModule } from 'igniteui-react-charts';
import { SqlHelper } from '@/database/SqlHelper';
import { MessageError, ErrorEntity } from '@/utils';

IgrFinancialChartModule.register();

interface IGraphData {
    date: Date;
    open: number;
    high: number;
    low: number;
    close: number;
};

interface IState {
    data: IGraphData[],
    selectedItem: string;
    favorites: string[];
    
}

IgrFinancialChartModule.register();

export default class FinancialChartStockIndexChart extends React.Component<{}, IState> {
    private isLoading: boolean;
    
    constructor(props: {}) {
        super(props);
        this.isLoading = true;
        this.state = { 
            data: [
                {date: new Date(1671539471), open: 16071.06, high: 16073.23, low: 16068.98, close: 16070.75},
                {date: new Date(1671539471), open: 16071.06, high: 16073.23, low: 16068.98, close: 16070.75},
            ],
            selectedItem: 'artemis',
            favorites: []
        }
    }
    
    private changeSelected = async (event: Required<React.ChangeEvent<HTMLSelectElement>>) => {
        try {
            if(!event.target.value) throw new ErrorEntity(MessageError.CANDLEGRAPH_NO_EVENT_TARGET_VALUE);
            this.setState({selectedItem: event.target.value});
            this.isLoading = true;
            this.setState({data: await SqlHelper.loadGraphData(event.target.value)}); 
            this.isLoading = false;
        }
        catch (e) {
            console.log(e);
        }
    }
    
    async componentDidMount() {
        try {
            let favorites;
            if(localStorage.getItem('token') != null) {
                console.log('user token found');
                favorites = (await SqlHelper.getUserPrefs()).preferences;
            }
            else{
                favorites = (await SqlHelper.getAdminPrefs()).preferences;
            }
            if(favorites.length < 4){
                
                let smallData = [];
                for(let i = 0; i < favorites.length; i++){
                    smallData.push(favorites[i].id);          
                }
                this.setState({favorites: smallData});
            }else {
                this.setState({favorites: [favorites[0].id, favorites[1].id, favorites[2].id, favorites[3].id]});
            }
            console.log(this.state.favorites);
            if(!favorites) throw new ErrorEntity(MessageError.CANDLEGRAPH_NO_FAVORITES);
            this.setState({selectedItem: favorites[0].name});
            this.setState({data: await SqlHelper.loadGraphData(favorites[0].id)}); 
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
            <select onChange={this.changeSelected} value={this.state.selectedItem}>
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
            chartTitle={this.state.selectedItem}
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