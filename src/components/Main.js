import React, {Component} from 'react';

import nba from '../nba-client';
import Profile from './Profile';
import ShotChart from './ShotChart';

class Main extends Component {
    state = {
        playerInfo: {},
        playerId: 201939,
    }

    componentDidMount() {
        window.nba = nba;
        nba.stats.playerInfo({ PlayerID: nba.findPlayer('Stephen Curry').playerId})
            .then((info) => {
                console.log(info);
                const playInfo = Object.assign(info.commonPlayerInfo[0], info.playerHeadlineStats[0]);
                console.log(playInfo);
                this.setState({ playerInfo: playInfo });
            })
    }

    render() {
        return (
            <div className="main">
                <Profile playerInfo={this.state.playerInfo} />
                <ShotChart playerId={this.state.playerId}/>
            </div>
        );
    }
}

export default Main;
