import React, {Component} from "react"
import {connect} from "react-redux"
import {compose} from "redux"
import {firebaseConnect} from "react-redux-firebase"
import {fullTeamName} from "../class/Teams"




class ProfileTeam extends Component{

render(){
return(
    <div className="row match-teams">
    <h2>{this.props.teamRoster && fullTeamName(this.props.team)}</h2><br/>
    
    {
        this.props.teamRoster &&
        Object.entries(this.props.teamRoster).map(data=>{
            if(data[1].username){
            return(
            <div className="col s12 m6" key={data[0]}>
            
                <a href={"/profile/"+data[0]} style={{textDecoration: "none"}}>
                <div className={"profile-player "+this.props.team+"-border"}>
                    <div className="profile-player-pic" style={{backgroundImage: "url('/images/"+this.props.team+"-icon2.svg')"}}>
                    </div>
                    <div className="profile-player-name">
                        <h1>{data[1].username}</h1>
                        <p>{data[1].firstName + " " + data[1].lastName}</p>
                    </div>
                </div>
                </a>
            </div>
            )
        }else{
            return null //ignore name, wins and losses
        }
        })
        
    }
    </div>
)
}
}

const mapStateToProps = (state, props) =>{
    return{
        teamRoster: state.firebase.data && state.firebase.data.liveEvents && state.firebase.data.liveEvents[props.event] && state.firebase.data.liveEvents[props.event].teams&& state.firebase.data.liveEvents[props.event].teams[props.team]
    }
}

export default compose(
    firebaseConnect((props)=>{
        return[
            {path: "/liveEvents/"+props.event+"/teams/"+props.team},
        ]
    }),
    connect(mapStateToProps)
)(ProfileTeam);