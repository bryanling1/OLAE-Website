import React, {Component} from "react"
//import {fullTeamName} from "../class/Teams"
import firebase from "firebase/app"
import Matchteams from "./Matchteams"



class Match extends Component{
state={
    blueTeam: null,
    redTeam: null,
    bye: null,
    overlay: true,
}
componentDidMount(){
    firebase.database().ref("/liveEvents/"+this.props.event+"/teamNextMatch/"+this.props.team).once("value").then( data=>{   
            this.setState({
                blueTeam: data.val().blueTeam,
                redTeam: data.val().redTeam
            })
            
    })

}
render(){
return(
    <div className="match">
        {this.state.blueTeam && <Matchteams event={this.props.event} blue={this.state.blueTeam}  red={this.state.redTeam}/>}
    </div>

)
}
}

export default Match;