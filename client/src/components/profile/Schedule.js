import React, {Component} from "react"
import {shortFormTeamName, fullTeamName} from "../class/Teams"
import {connect} from "react-redux"
import {compose} from "redux"
import {firebaseConnect} from "react-redux-firebase"


class Schedule extends Component{
state={
    date: new Date()
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
<div>
{
    this.props.matches ? (
<div className="profile-schedule">

{
    Object.entries(this.props.matches).sort(this.compare).map(data=>{
        if (!data[1].winner && data[1].date){
        return(
            <div key={data[0]} className="profile-schedule-wrapper">
            <h1 className="leftTeam long">{fullTeamName(data[1].blueTeam)}</h1>
            <h1 className="leftTeam short">{shortFormTeamName(data[1].blueTeam)}</h1>
            <div style={{backgroundImage: "url('/images/"+data[1].blueTeam+".svg')"}} className="schedule-team-image"></div>
            <div className="profile-schedule-time">
                <div className="time" style={{backgroundColor: this.props.teamData.dark}}>{new Date(data[1].date).getHours()+":"+ (new Date(data[1].date).getMinutes() < 10 ? ("0"+new Date(data[1].date).getMinutes()):(new Date(data[1].date).getMinutes()))}</div>
                <div className="date"> {(new Date(data[1].date).getMonth() + 1) + "/" +new Date(data[1].date).getDate()+"/"+new Date(data[1].date).getFullYear()}</div>
            </div>
            <div style={{backgroundImage: "url('/images/"+data[1].redTeam+".svg')"}} className="schedule-team-image"></div>
            <h1 className="long">{fullTeamName(data[1].redTeam)}</h1>
            <h1 className="short">{shortFormTeamName(data[1].redTeam)}</h1>
            </div>
        )
        }else return null;
    })
}
{
    Object.entries(this.props.matches).sort(this.compare).map(data=>{
        if (data[1].winner && data[1].date){
        return(
            <div key={data[0]} style={{
                backgroundColor:  data[1].winner === this.props.team ?('#a3cfec'):('#e2b6b3'),
                borderBottom: 0,
                marginBottom: 4,
                marginTop: 4,
                borderColor: data[1].winner === this.props.team ?('#99b9cf'):('#cea7a7'),
                borderWidth: 1,
                borderStyle: 'solid'
            }}>
            <div className="profile-schedule-wrapper" style={{
                border:0
            }}>
            {/* {
                data[1].winner === this.props.team ? (
                    <div className="result win">WIN</div>
                ):(
                    <div className="result loss">LOSS</div>
                )
            } */}
            <h1 className="leftTeam long">{fullTeamName(data[1].blueTeam)}</h1>
            <h1 className="leftTeam short">{shortFormTeamName(data[1].blueTeam)}</h1>
            <div style={{backgroundImage: "url('/images/"+data[1].blueTeam+".svg')"}} className="schedule-team-image"></div>
            <div className="score">
                <div style={{color: this.props.team === data[1].winner ? ("#1a78ae"):("#c6443e")}}>
                    {this.props.team === data[1].winner ? ("Victory"):("Defeat")}
                </div>
                <span style={{ color: data[1].blueTeam !== data[1].winner ? (null):(this.props.team === data[1].winner ? ("#1a78ae"):(null))}}className={data[1].blueTeam === data[1].winner ? ("winner"):(null)} >
                {data[1].blueScore}
                </span>-
                <span style={{ color: data[1].redTeam !== data[1].winner ? (null):(this.props.team === data[1].winner ? ("#1a78ae"):(null))}}className={data[1].redTeam === data[1].winner ? ("winner"):(null)} >
                {data[1].redScore}
                </span>
            </div>
            <div style={{backgroundImage: "url('/images/"+data[1].redTeam+".svg')"}} className="schedule-team-image"></div>
            <h1 className="long">{fullTeamName(data[1].redTeam)}</h1>
            <h1 className="short">{shortFormTeamName(data[1].redTeam)}</h1>
            </div>
            {
                //mini match description
                this.props.stats && this.props.stats[data[0]] && 
                <div className="match-results-stats" style={{backgroundColor: this.props.team === data[1].winner ? ("#4aa1d2"):("#e89d99")}}>
                    <img width="20px;" src={"http://ddragon.leagueoflegends.com/cdn/9.24.2/img/champion/"+this.props.stats[data[0]].champion+".png"} alt={this.props.stats[data[0]].champion}/>
                    <div>{this.props.stats[data[0]].kills + " / "+this.props.stats[data[0]].deaths +" / " +this.props.stats[data[0]].assists}</div>
                    <div className="hide-on-mobile"><img alt="damage" width="16px" height="16px" src="https://www.freeiconspng.com/uploads/best-bomb-png-clipart-8.png"/></div>
                    <div className="hide-on-mobile">{this.props.stats[data[0]].damage}</div>
                    <div className="hide-on-mobile"><img alt="gold" width="16px" height="16px" src="https://www.freeiconspng.com/uploads/coins-icon-4.png"/></div>
                    <div className="hide-on-mobile">{Math.floor(this.props.stats[data[0]].gold / 5 / 60 * this.props.stats[data[0]].time)}</div>
                    <div className="hide-on-mobile"><img alt="vision score" width="20px" height="20px" src="https://image.flaticon.com/icons/png/512/64/64999.png"/></div>
                    <div className="hide-on-mobile">{this.props.stats[data[0]].visionScore}</div>
                    <div className="stats-time">{Math.floor(this.props.stats[data[0]].time / 60)+"m "+(this.props.stats[data[0]].time % 60)+"s "}</div>
                </div>
            }
            </div>
        )
        }else return null;
    })
}   
</div>):(
    <div className="profile-schedule">
        <span className="no-matches">
        No Matches to Display
        </span>
    </div>
)
}

</div>
)
}
}

const mapStateToProps = (state, props) =>{
    return{
        matches: state.firebase.data && 
        state.firebase.data.liveEvents && 
        state.firebase.data.liveEvents[props.event] && 
        state.firebase.data.liveEvents[props.event].teamMatches &&
        state.firebase.data.liveEvents[props.event].teamMatches[props.team],
        stats: state.firebase.data && 
        state.firebase.data.liveEvents && 
        state.firebase.data.liveEvents[props.event] && 
        state.firebase.data.liveEvents[props.event].individualStats &&
        state.firebase.data.liveEvents[props.event].individualStats[props.id],
        teamData: state.firebase.data && state.firebase.data.teamData && state.firebase.data.teamData[props.team.split("-")[0]]
    }
}

export default compose(
    firebaseConnect((props)=>{
        return[
            {path: "/liveEvents/"+props.event+"/teamMatches/"+props.team, orderByChild:"date"},
            {path: "/liveEvents/"+props.event+"/individualStats/"+props.id},
            {path: "/teamData/"+props.team.split("-")[0]}
        ]
    }),
    connect(mapStateToProps)
)(Schedule);