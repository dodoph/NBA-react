import React, {Component} from 'react';
import _ from 'lodash';
import { Radio, Row, Col, Switch } from 'antd';


import ShotChart from './ShotChart';
import CounterSlider from './CounterSlider'

class DataViewContainer extends Component {
    state = {
        minCount: 2,
        chartType: 'hexbin',
        displayTooltip: true,

    }

    //receive data from shot chart
    onCountSliderChange = (data) => {
        this.setState({ minCount: data });
    }

    onChartTypeChange = (e) => {
        //console.log(e.target.value); //click target
        this.setState({ chartType: e.target.value }); //change target value
    }

    onTooltipChange = (displayTooltip) => {
        console.log(displayTooltip);
        this.setState({ displayTooltip });
    }

    render() {
        return (
            <div className="data-view">
                <ShotChart playerId={this.props.playerId}
                           minCount={this.state.minCount}
                           chartType={this.state.chartType} //pass charttype to shotchart, in shorchart line 33, receive props.charttype not hardcode
                           displayTooltip={this.state.displayTooltip}
                />

                <div className="filters">
                    {
                        this.state.chartType === 'hexbin'
                            ?
                            <CounterSlider value={this.state.minCount}
                                //create call back func to
                                           onCountSliderChange={_.debounce(this.onCountSliderChange, 500)}/>
                            : null
                    }
                    <br/>
                    <Row>
                        <Col span={9}>
                            <Radio.Group onChange={this.onChartTypeChange} value={this.state.chartType}>
                                <Radio value="hexbin">Hexbin</Radio>
                                <Radio value="scatter">Scatter</Radio>
                            </Radio.Group>
                        </Col>
                        <Col span={4}>
                            <Switch
                                checkedChildren="On"
                                unCheckedChildren="Off"
                                onChange={this.onTooltipChange}
                                defaultChecked />
                        </Col>
                    </Row>

                </div>

            </div>
        );
    }
}

export default DataViewContainer;
