import React, {Component} from "react"
import {fullTeamName, shortFormTeamName} from "../class/Teams"
import firebase from "firebase/app"
import EventsDropdown from "../layout/EventsDropdown"

class Schedule extends Component{
    state={
        standings: [],
        isLoaded: false
    }
    handleChangeEvent =(event) =>{
        this.getStandings(event)
    }    
    componentDidMount(){
        this.getStandings(this.props.match.params.event)  
    }
    getStandings(event){
        this.setState({isLoaded: false, standings: []})
        firebase.database().ref("liveEvents/"+event+"/teams").orderByChild("wins").once("value").then(snap=>{
            snap.forEach(data=>{
                this.setState({
                    standings:[
                        ...this.state.standings,
                        {
                            team: data.key,
                            wins: data.val().wins,
                            losses: data.val().losses
                        }
                    ]
                })
            })
            }).then(()=>{
                this.setState({
                    isLoaded: true,
                    standings: this.state.standings.reverse()
                })
            })
    }
    render(){
        return(
            <div className="schedule">
                <div className="container">
                <div className="row">
                    <div className="col s12 m8">
                    <h1>STANDINGS</h1>
                    </div>
                    <div className="col s12 m4 schedule-dropdown">
                        <EventsDropdown currentEvent={this.props.match.params.event} handleChangeEvent={this.handleChangeEvent}/>
                    </div>
                </div>
                    {
                        this.state.isLoaded && this.state.standings.length === 0 && 
                        <div className="center">
                            <p>No Teams To Display</p>
                        </div>
                    }
                    <div className="row">
                        {this.state.isLoaded && this.state.standings.length > 0 &&
                        <div className="standings-label">
                        <p className="standings-wins">W</p>
                        <p className="standings-losses">L</p>
                        </div>
                        }
                        {
                            this.state.isLoaded && this.state.standings.map((data, i)=>{
                                return(
                                    <div className="standings-row" key={i}>
                                        <div className="standings-placement">{i + 1}</div>
                                        <div className="standings-image" style={{backgroundImage: "url('/images/"+data.team+"-icon2.svg')"}}></div>
                                        <div className="standings-team">
                                            <div className="standings-team-long">{fullTeamName(data.team)}</div>
                                            <div className="standings-team-short">{shortFormTeamName(data.team)}</div>
                                        </div>
                                        <p className="standings-wins">{data.wins}</p>
                                        <p className="standings-losses">{data.losses}</p>
                                    </div>
                                )
                            })
                        }
                    </div>
                </div>

            </div>
        )
    }
}
export default Schedule