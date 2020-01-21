import React, {Component} from "react"
import {connect} from "react-redux"
import {compose} from "redux"
import {addMatch, deleteMatch, editScore, setNextMatch, removeNextMatch, onlineMatch, offlineMatch, addStat} from "../store/actions/adminActions"
import firebase from "firebase/app"


class AdminSchedule extends Component{
state={
    editscore: false,
    day: null,
    id: null,
    blue: null,
    red: null,
    bluescore: null,
    redscore: null, 
    winner: null,
    liveEvents: null,
    teams: null,
    blueteam: null,
    redteam: null,
    date: null,
    matchid:null,
    stats:null,
    statIds: {}
}
componentDidMount(){
    firebase.database().ref("/liveEvents").on("value", data=>{
        this.setState({
            liveEvents: data.val()
        })
    })
}
handleEditScore=(e)=>{
    e.preventDefault();
    this.props.editScore({
        event: this.state.event, 
        matchKey: this.state.id, 
        date: this.state.date, 
        blueScore: this.state.bluescore,
        redScore: this.state.redscore,
        winner: this.state.winner,
        blueTeam: this.state.blue,
        redTeam: this.state.red
    });
    this.setState({editscore: false})
    document.getElementById("edit-score-form").reset();
}
handleAddStats=(e)=>{
    e.preventDefault();
    for(let x=0;x<10;x++){
        if(this.state.statIds[x] && this.state.statIds[x].split(")#%^$$$")[0] !== "0"){
            this.props.addStat({
                id:this.state.statIds[x].split(")#%^$$$")[0],
                kills: this.state.stats[x].kills,
                deaths: this.state.stats[x].deaths,
                assists: this.state.stats[x].assists,
                matchTime: this.state.stats[x].matchTime,
                gold: this.state.stats[x].gold,
                damage: this.state.stats[x].damage,
                visionScore: this.state.stats[x].visionScore,
                tripleKills: this.state.stats[x].tripleKills,
                quadraKills: this.state.stats[x].quadraKills,
                pentaKills: this.state.stats[x].pentaKills,
                win: this.state.stats[x].win,
                event: this.state.event,
                date: this.state.date,
                username: this.state.statIds[x].split(")#%^$$$")[1],
                firstName: this.state.statIds[x].split(")#%^$$$")[2],
                lastName: this.state.statIds[x].split(")#%^$$$")[3],
                team: this.state.statIds[x].split(")#%^$$$")[4],
                opponent: this.state.statIds[x].split(")#%^$$$")[5],
                matchId: this.state.id,
                champion: this.state.stats[x].champion
                
            })
        }
        
    }
    console.log(this.props.addStatsStatus);
}
handleAddStatsByMatchId=(e)=>{
    e.preventDefault();
    fetch("/api/matchResults", {
        method: "POST",
        headers: {
            'accept':'application/json',
            'content-type': 'application/json'
        },
        body: JSON.stringify({
            id: this.state.matchid
        })

    }).then(json=>json.json()).then(data=>{
        let bluescore = 0;
        let redscore = 0;
        for(let i=0;i<5;i++){
            if(data[0]["kills"]){
                bluescore += data[i]["kills"]
            }      
        }
        for(let i=5;i<10;i++){
            if(data[i]["kills"]){
                redscore += data[i]["kills"]
            }
        }
        document.getElementById('bluescore').value = bluescore;
        document.getElementById('redscore').value = redscore;
        //blue team wins
        if(data[0]["win"]){
            document.getElementById('winner').value = this.state.blue;
            this.setState({winner: this.state.blue})
        }else{
            document.getElementById('winner').value = this.state.red;
            this.setState({winner: this.state.red})
        }
        this.setState({
            stats:data,
            bluescore,
            redscore
        })
    });
}
handleChange=(e)=>{
    this.setState({
        [e.target.id] : e.target.value
    })
    
}

handleStatChange=(e)=>{
    const index = e.target.id;
    const value = e.target.value;
    this.setState(prevState => ({
        statIds: {
            ...prevState.statIds,
            [index]: value,
        },
    }));
    console.log(this.state.statIds);
}
handleSumbit=(e)=>{
    e.preventDefault();
    this.props.addMatch({
        redTeam: this.state.redteam,
        blueTeam: this.state.blueteam,
        date: this.state.date,
        event: e.target.id
    })
    // document.getElementById(e.target.id).reset();

}

handleSetNextMatch = (blueTeam, redTeam,  date, event, matchKey) =>{
    this.props.setNextMatch(
        {
            blueTeam, 
            redTeam,  
            date, 
            event, 
            matchKey
        }
    );
}

handleDeleteMatch = (event, matchKey, blueTeam, redTeam) =>{
    this.props.deleteMatch(
        {
            blueTeam, 
            redTeam,  
            event, 
            matchKey
        }
    );
}
handleRemoveNextMatch = (event, matchKey, team, blueTeam, redTeam) =>{
    this.props.removeNextMatch({
        event, matchKey, team, blueTeam, redTeam
    })
}
handleOnlineMatch = (event, blueTeam, redTeam) =>{
    this.props.onlineMatch({
        event, blueTeam, redTeam
    })
}

handleOfflineMatch = (event, blueTeam, redTeam) =>{
    this.props.offlineMatch({
        event, blueTeam, redTeam
    })
}
compare = ( a, b ) => {
    if ( a[1].date < b[1].date ){
      return -1;
    }
    if ( a[1].date > b[1].date ){
      return 1;
    }
    return 0;
  }

render(){
return(
<div className="admin-schedule">
{/* EDIT SCORE */}
{
this.state.editscore &&     
<div className="edit-score-background-scroll-wrapper">
<div className="edit-score-background-scroll">
<div className="container">
<div className="row edit-score"><br/>
<h1>
{this.state.blue}<img style={{borderRight: "solid 4px #2196f3", paddingRight: "6px", marginRight: "6px", marginLeft: "30px"}} alt="blue" height="30px"src={"/images/"+this.state.blue+".svg"}/>
VS
<img style={{borderLeft: "solid 4px #f44336", paddingLeft: "6px", marginLeft: "6px"}} alt="red" height="30px"src={"/images/"+this.state.red+".svg"}/>
{this.state.red}

</h1>

<form className="col s12" onSubmit={this.handleEditScore} id="edit-score-form">
        <div className="row">
        <div className="input-feild col s2">
            <label htmlFor="bluescore" >Blue Team Score</label>
            <input id="bluescore"type="number" placeholder="blue" onInput={this.handleChange} required/>
        </div>
        <div className="input-feild col s2">
            <label htmlFor="redscore" >Red Team Score</label>
            <input id="redscore"type="number" placeholder="red" onInput={this.handleChange} required/>
        </div>
        <div className="input-feild col s4">
            <label htmlFor="winner">Winner</label>
            <select name="winner" id="winner" required onChange={this.handleChange}>
                    <option key={"none"}></option>
                    <option key={"blueTeam"} value={this.state.blue}>{this.state.blue}</option>
                    <option key={"redTeam"} value={this.state.red}>{this.state.red}</option>
            </select>
        </div>
        <div className="input-feild col 4">
            <br/>
        <button className="btn purple">Update Score</button>
        </div>
        </div>
        
</form>
<form className="col s12" onSubmit={this.handleAddStatsByMatchId} id="add-stats-form">
        <div className="row">
        <div className="input-feild col s4">
            <label htmlFor="matchid" >STATS</label>
            <input id="matchid"type="number" placeholder="Match ID" onInput={this.handleChange} required/>
            
        </div>
        <div className="input-feild col s2">
            <br/>
            <button className="btn grey">LOAD</button>
        </div>
        </div>
        
</form>
<form onSubmit={this.handleAddStats}>
<div className="row">
<table className="centered">
    <thead>
    <tr>
    <th>User</th>
    <th>icon</th>
    <th>Kills</th>
    <th>Deaths</th>
    <th>Assists</th>
    <th>Damage</th>
    <th>Gold</th>
    <th>Vision</th>
    <th>TRIs</th>
    <th>QUADs</th>
    <th>PENTAs</th>
    </tr>
    </thead>
    <tbody>
        {
            this.state.stats && this.state.stats.map((data, i)=>{
                if(data['champion_key']){
                return(
                <tr key={i}>
                    <td>
                        <select  id={i} required onChange={this.handleStatChange}>
                            <option key={"none"}></option>
                            {
                                Object.entries(this.state.liveEvents[this.state.event]['teams'][this.state.blue]).map(data=>{
                                    if(data[1].summoner){
                                        return(<option key={data[0]} value={data[0]+")#%^$$$"+data[1].username+")#%^$$$"+data[1].firstName+")#%^$$$"+data[1].lastName+")#%^$$$"+this.state.blue+")#%^$$$"+this.state.red}>{data[1].summoner}</option>)
                                    }else{
                                        return null;
                                    }
                                    
                                })
                            }
                            {
                                Object.entries(this.state.liveEvents[this.state.event]['teams'][this.state.red]).map(data=>{
                                    if(data[1].summoner){
                                        return(<option key={data[0]} value={data[0]+")#%^$$$"+data[1].username+")#%^$$$"+data[1].firstName+")#%^$$$"+data[1].lastName+")#%^$$$"+this.state.red+")#%^$$$"+this.state.blue}>{data[1].summoner}</option>)
                                    }else{
                                        return null;
                                    }
                                })
                            }
                            <option>0</option>
                        </select>
                    </td>
                    <td><img width="35px;" src={"http://ddragon.leagueoflegends.com/cdn/9.24.2/img/champion/"+data["champion"]+".png"} alt={data["champion_key"]}/></td>
                    <td>{data["kills"]}</td>
                    <td>{data["deaths"]}</td>
                    <td>{data["assists"]}</td>
                    <td>{data["damage"]}</td>
                    <td>{data["gold"]}</td>
                    <td>{data["visionScore"]}</td>
                    <td>{data["tripleKills"]}</td>
                    <td>{data["quadraKills"]}</td>
                    <td>{data["pentaKills"]}</td>

                </tr>)}else{
                    return null;
                }
            })
        }
    </tbody>
</table>
</div>
{this.state.stats && <button type="submit" className="btn">Submit Stats</button>}{
this.props.addStatsStatus?
                (<span className="green-text">Stats Added!</span>):(this.props.addStatsStatus == null?(null):(<span className="red-text">Error</span>))
}
</form>
</div>
</div>
<div className="edit-score-close" onClick={()=>{this.setState({editscore: false})} } >

</div>
</div>
</div>
}
<div className="container">

<div className="row">

{
    this.state.liveEvents && Object.entries(this.state.liveEvents).map(event=>{
        return(
            <div key={event[0]}>
            <div className="center">
            <h1>Event: {event[0]}</h1>
            </div>
            <div className="row">
                <div className="col s12">
                <table className="centered">
                <thead>
                    <tr>
                        <th>Status</th>
                        <th>Team</th>
                        <th>Matchup</th>
                        <th>Date</th>
                        <th>Key</th>
                        <th>Remove</th>
                    </tr>
                </thead>
                <tbody>
                {
                    this.state.liveEvents && this.state.liveEvents[event[0]].teamNextMatch && Object.entries(this.state.liveEvents[event[0]].teamNextMatch).map(data=>{
                        if(data[1].matchKey){
                            return(
                                <tr key={data[0]}>

                                    <td>
                                        {
                                            data[1].status ? (
                                                <button onClick={()=>{this.handleOfflineMatch(event[0], data[1].blueTeam, data[1].redTeam)}}className="btn green pulse accent-3">LIVE</button>
                                            ):(
                                                <button onClick={()=>{this.handleOnlineMatch(event[0], data[1].blueTeam, data[1].redTeam)}}className="btn grey">Offline</button> 
                                            )
                                        }
                                     
                                    </td>
                                    <td>{<img alt="team" style={{display:"inline-block"}}width="15px"src={"/images/"+data[0]+".svg"}/>}{data[0]}</td>
                                    <td><img alt="team" width="15px"src={"/images/"+data[1].blueTeam+".svg"}/>{data[1].blueTeam} <b>vs</b><br/> <img alt="team" width="15px"src={"/images/"+data[1].redTeam+".svg"}/>{data[1].redTeam}</td>
                                    <td>{data[1].date}</td>
                                    <td>{data[1].matchKey}</td>
                                    <td>
                                    <button 
                                    onClick={
                                        ()=>{
                                            this.handleRemoveNextMatch(event[0], data[1].matchKey, data[0], data[1].blueTeam, data[1].redTeam)
                                            }
                                        }
                                        className="btn-floating btn-small waves-effect waves-light red">
                                    <i className="material-icons">remove</i>
                                        </button>
                                    </td>
                                </tr>
                            )
                        }else{
                            return null
                        }
                        
                    })
                }
                </tbody>
                </table>
                </div>
            </div>
            <div className="row">
    
            <form className="col s12" onSubmit={this.handleSumbit} id={event[0]}>
                <div className="row">
                <div className="input-feild col s4">
                <label htmlFor="blueteam" >Blue Team</label>
                <select   style={{paddingLeft:40}} name="blueteam" id="blueteam" required onChange={this.handleChange}>
                    <option key={"none"}></option>
                    {
                        event[1].teams && Object.keys(event[1].teams).map(data=>{
                            return(
                                <option key={data} value={data}>{data}</option>
                            );
                        })
                    }
                </select>
                    {/* <label htmlFor="blueteam" >Blue Team</label>
                    <input id="blueteam"type="text" placeholder="blue" onChange={this.handleChange} required/> */}
                </div>
                <div className="input-feild col s4">
                    <label htmlFor="redteam" >Red Team</label>
                    <select   style={{paddingLeft:40}} name="redteam" id="redteam" required onChange={this.handleChange}>
                        <option key={"none"}></option>
                        {
                            event[1].teams && Object.keys(event[1].teams).map(data=>{
                                return(
                                    <option key={data} value={data}>{data}</option>
                                );
                            })
                        }
                    </select>
                </div>
                <div className="input-feild col s3">
                    <label htmlFor="date">Date</label>
                    <input id="date"type="datetime-local" placeholder="0" onInput={this.handleChange} required/>
                </div>
                <div className="input-feild col s1">
                    <br/>
                    <button className="btn purple">Add</button>
                </div>
                </div>
                
                </form>
                <table className="centered">
                <thead>
                    <tr>
                        <th>Date</th>
                        <th></th>
                        <th>Next Match</th>
                        <th className="blue-text">Blue Team</th>
                        <th className="red-text">Red Team</th>
                        <th className="blue-text text-darken-3">Blue Score</th>
                        <th className="red-text text-darken-3">Red Score</th>
                        <th>Winner</th>
                        <th></th>
                    </tr>
                </thead>

                <tbody>
                {
                    event[1].matches && Object.entries(event[1].matches).sort(this.compare).map(match=>{
                        return(
                            <tr key={match[0]}>
                            
                            <td><button className="btn-small waves-effect waves-light grey">
                                <i onClick={()=>{
                                    this.setState({
                                        event:event[0],
                                        id: match[0], 
                                        date: match[1].date, 
                                        editscore: true, 
                                        blue: match[1].blueTeam, 
                                        red: match[1].redTeam,
                                        stats: null
                                    })
                                    }}className="material-icons">edit</i>
                                </button>
                            </td>
                            <td>{match[1].date}</td>
                            <td>
                                <i onClick={()=>{!match[1].nextMatch && this.handleSetNextMatch(
                                    match[1].blueTeam,
                                    match[1].redTeam,
                                    match[1].date, 
                                    event[0],
                                    match[0])}}
                                    className="material-icons next-match-icon">
                                    {!match[1].winner?(match[1].nextMatch ?("radio_button_checked"):("radio_button_unchecked")):(null)}
                                </i>
                            </td>
                            <td>{<img alt="team" width="15px"src={"/images/"+match[1].blueTeam+".svg"}/>}{match[1].blueTeam}</td>
                            <td>{<img alt="team" width="15px"src={"/images/"+match[1].redTeam+".svg"}/>}{match[1].redTeam}</td>
                            <td className="blue-text" style={{fontWeight: "bold"}}>{match[1].blueScore}</td>
                            <td className="red-text" style={{fontWeight: "bold"}}>{match[1].redScore}</td>
                            <td>{match[1].winner && match[1].winner!== "false" ? (<img alt="team" width="33px"src={"/images/"+match[1].winner+".svg"}/>):(null)}</td>
                            <td><button className="btn-floating btn-small waves-effect waves-light red">
                                <i 
                                onClick={
                                    ()=>{
                                        this.handleDeleteMatch(event[0], match[0], match[1].blueTeam, match[1].redTeam)
                                    }
                                }
                                className="material-icons">remove</i>
                                </button>
                            </td>
                        </tr>  
                        )
                    })
                }
                </tbody>
                </table>
            </div>
            </div>
        )

    })
}

</div>
    )
})
}
<br/>

</div>
</div>



)
}
}
const mapStateToProps = (state) =>{
    return{
        addStatsStatus: state.adminActions.addStatsStatus
    }
}
const mapDispatchToProps = (dispatch) =>{
    return{
        addMatch: data => dispatch(addMatch(data)),
        deleteMatch: data => dispatch(deleteMatch(data)),
        editScore: data => dispatch(editScore(data)),
        setNextMatch: data => dispatch(setNextMatch(data)),
        removeNextMatch: data => dispatch(removeNextMatch(data)),
        onlineMatch: data => dispatch(onlineMatch(data)),
        offlineMatch: data => dispatch(offlineMatch(data)),
        addStat: data => dispatch(addStat(data)),
    }
}

export default compose(
    connect(mapStateToProps, mapDispatchToProps)
)(AdminSchedule);