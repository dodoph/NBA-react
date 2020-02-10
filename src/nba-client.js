import nba from 'nba';
const SERVER_URL = 'http://35.235.84.235:5000';
//web <==> node api server
export default {
    ...nba, //spread get all info from NBA
    stats: {
        //get all the interface of NBA states ref:https://github.com/bttmly/nba/blob/master/doc/stats.md
        ...nba.stats,
        //para: playerID
        //Return :
        playerInfo: function({ PlayerID }) {
            return fetch(`${SERVER_URL}/players/${PlayerID}`).then(res => res.json()) //fetch...promission: 接收信息，等待下一步的操作
        },
        shots: function({ PlayerID }) {
            return fetch(`${SERVER_URL}/players/${PlayerID}/shots`).then(res => res.json())
        },
    },
};

//promise 的状态
//pending
//resolve
//reject
