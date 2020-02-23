import React, {Component} from 'react';
import nba from '../nba-client';
import Profile from './Profile';
import DataViewContainer from './DataViewContainer';
import SearchBar from './SearchBar';

import { DEFAULT_PLAYER_INFO } from '../constants';


class Main extends Component {
    state = {
        playerInfo: DEFAULT_PLAYER_INFO
    }

    componentDidMount() {
        window.nba = nba;
        this.loadPlayerInfo('Stephen Curry');
    }
    loadPlayerInfo = (playerName) => {
        //playerId is getting from front end
        //nba.findPlayer('Stephen Curry').playerId 解构用法
        //PlayerID: xxx 赋值
        nba.stats.playerInfo({ PlayerID: nba.findPlayer(playerName).playerId}).then((info) => { //call back: 'then' is called until all the data is fetched successfully, and store into 'info'
            console.log(info);
            const playInfo = Object.assign(info.commonPlayerInfo[0], info.playerHeadlineStats[0]);
            console.log(playInfo);
            this.setState({ playerInfo: playInfo });//set states
        })
    }


    handleSelectPlayer = (playerName) => {
        this.loadPlayerInfo(playerName);
    }



    //通过props 将state 传给了 Profile
    render() {
        return (
            <div className="main">
                <SearchBar handleSelectPlayer={this.handleSelectPlayer}/>
                <div className="player">
                    <Profile playerInfo={this.state.playerInfo} />
                    <DataViewContainer playerId={this.state.playerInfo.playerId}/>
                </div>
            </div>
        );
    }
}

export default Main;
