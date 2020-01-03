import React, {Component} from "react"
import firebase from "firebase/app"
import {getTeamOrg} from "../class/Teams"
import Schedule from "./Schedule"
import ProfileTeam from "../profile/ProfileTeam"

class Team extends Component{
    state={
        team: null,
    }
    componentDidMount(){
        firebase.database().ref("/liveEvents/"+this.props.match.params.event+"/teams/"+this.props.match.params.team).on("value", snapshot=>{

            if(snapshot.val()){
                this.setState({
                    dataFound: true,
                    team: true
                })
            }else{
                this.setState({
                    dataFound: false,
                    team: true
                })
            }
        })
    }
    render(){
        console.log(this.state)
    return(
    <div className="team">
    <div className={this.state.team ? (
        this.state.dataFound?("team-banner "+getTeamOrg(this.props.match.params.team)+"-background"):("team-banner undefined-background")
        ):("team-banner-loading")}>
        <div className="container center">
            {
                this.state.team && this.state.dataFound && <img alt={this.props.match.params.team} width="180px" src={"/images/"+this.props.match.params.team+".svg"}/>
            }
        </div>

        </div>
        <br/>
        <div className="container">
            <div className="row">
                <Schedule event={this.props.match.params.event} team={this.props.match.params.team}/>
            </div>
            <div className="row">
                <ProfileTeam event={this.props.match.params.event} team={this.props.match.params.team}/>

            </div>
        </div>
    </div>
    )}
}
export default Team