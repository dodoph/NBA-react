import React, {Component} from 'react';
import ShotChart from "./ShotChart";

class DataViewContainer extends Component {
    render() {
        return (
            <div className='data-view'>
                <ShotChart playerId={this.props.playerId}/>


            </div>
        );
    }
}

export default DataViewContainer;
