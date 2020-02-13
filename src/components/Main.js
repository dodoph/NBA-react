import React, {Component} from 'react';
import nba from '../nba-client';
import Profile from './Profile';
import DataViewContainer from "./DataViewContainer";

class Main extends Component {
    state = {
        playerInfo: {},
        playerId: 201939,
    }

    componentDidMount() {
        window.nba = nba; //define global variable
        //playerId is getting from front end
        //nba.findPlayer('Stephen Curry').playerId 解构用法
        //PlayerID: xxx 赋值
        nba.stats.playerInfo({ PlayerID: nba.findPlayer('Stephen Curry').playerId})
            //call back: 'then' is called until all the data is fetched successfully, and store into 'info'
            .then((info) => {
                console.log(info);
                const playInfo = Object.assign(info.commonPlayerInfo[0], info.playerHeadlineStats[0]);//合并数据
                console.log(playInfo);
                this.setState({ playerInfo: playInfo }); //set states
            })
    }
    //通过props 将state 传给了 Profile
    render() {
        return (
            <div className="main">
                <Profile playerInfo={this.state.playerInfo} />
                <DataViewContainer playerId={this.state.playerId}/>
            </div>
        );
    }
}

export default Main;
