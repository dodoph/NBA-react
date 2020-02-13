import React from 'react';
import { Slider, InputNumber, Row, Col } from 'antd';

class CounterSlider extends React.Component {
    state = {
        inputValue: this.props.value
    }

    onChange = (value) => {
        const num = Number(value) ? value: this.state.inputValue;
        this.setState({
            inputValue: num,
        });
        this.props.onCountSliderChange(num);
    }

    render() {
        return (
            <Row>
                <Col span={12}>
                    <Slider min={1} max={20} onChange={this.onChange} value={this.state.inputValue} />
                </Col>
                <Col span={4}>
                    <InputNumber
                        min={1}
                        max={20}
                        style={{ marginLeft: 16 }}
                        value={this.state.inputValue}
                        onChange={this.onChange}
                    />
                </Col>
            </Row>
        );
    }
}

export default CounterSlider;
