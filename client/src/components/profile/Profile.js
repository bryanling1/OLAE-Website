import React, {Component} from "react"
import firebase from "firebase/app"
import {connect} from "react-redux"
import {compose} from "redux"
import {firebaseConnect} from "react-redux-firebase"
import {fullTeamName} from "../class/Teams"
import Match from "./Match"
import ProfileStats from "./ProfileStats"
// import ProfileRecentStats from "./ProfileRecentStats"
import ProfileTeam from "./ProfileTeam"
import Schedule from "./Schedule"
import EventDropdown from "../layout/EventsDropdown"


class Profile extends Component{
    state={
       match: null,
       nextMatch: null,
       event: null,
       dataFound: true,
       team: null,
       summoner: null
    }
    componentWillReceiveProps(){
        this.props.profile && firebase.database().ref("/liveEvents/"+this.props.profile.event+"/teamNextMatch/"+this.props.profile.team).on("value", data=>{
            this.setState({
                nextMatch: data.val()
            })
        })
    }
    componentDidUpdate(){
        if(this.props.profile && this.state.event === null){
            this.setState({event: this.props.profile.event, team: this.props.profile.team, summoner:this.props.profile.summoner })
        }
    }
    handleChangeEvent=(event)=>{
        firebase.database().ref("/liveEvents/"+event+"/users/"+this.props.match.params.id).on("value", snapshot=>{
            
            if(snapshot.val()){
                this.setState({
                    dataFound: true,
                    team: snapshot.val().team,
                    summoner: snapshot.val().summoner
                })
            }else{
                this.setState({
                    dataFound: false
                })
            }
        })
        this.setState({event})
    }
    render(){
        if(this.state.nextMatch && !this.state.nextMatch.status && this.state.nextMatch.matchKey){
            
            var countDownDate = new Date(this.state.nextMatch.date).getTime();
        
            // Update the count down every 1 second
            var x = setInterval(function() {
        
            // Get todays date and time
            var now = new Date().getTime();
        
            // Find the distance between now and the count down date
            var distance = countDownDate - now;
        
            // Time calculations for days, hours, minutes and seconds
            var days = Math.floor(distance / (1000 * 60 * 60 * 24));
            var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
            var seconds = Math.floor((distance % (1000 * 60)) / 1000);
        
            if (distance < 0) {
                clearInterval(x);
                document.getElementById("demo").innerHTML = "EXPIRED";
            }
            // Display the result in the element with id="demo"
            document.getElementById("demo").innerHTML = days + "d" + hours + ":"
            + minutes + ":" + seconds;
        
            // If the count down is finished, write some text 
            
            }, 1000);
            }
    return(
    <div className="profile">
        {
            //match overlay
            this.state.match && <Match event={this.props.profile.event} team={this.props.profile.team}/>
        }
    <div className={this.state.team ? (
        this.state.dataFound?("profile-banner "+this.state.team+"-background"):("profile-banner undefined-background")
        ):("profile-banner-loading")}>

            <div className="container">
                {/* Next Match notification */}
            
            <div className="row">
                <div className="col s12 ">
                    {
                    this.props.live && this.props.match.params.id === this.props.auth && this.state.nextMatch && this.state.nextMatch.matchKey?(
                    <div className="next-match-notifcation-wrapper">

                    <button onClick={this.state.nextMatch && this.state.nextMatch.status ?(()=>{this.setState({match: true})}):(null)} className={this.state.nextMatch && this.state.nextMatch.status? ("btn green next-match-button pulse"):(" btn green next-match-button disabled")}>PLAY</button>
                    <div className="next-match-time">Next Match: {this.state.nextMatch && this.state.nextMatch.status ? ("LIVE"):(<span id="demo"></span>)} {this.props.live && this.props.live.type==="scrimmage" ? ("(SCRIM)"):(null)}</div>
                    
                    </div>):(null)
                    }
                </div>
            </div>
            <div className="row">
            
            {/* Profile image and info*/}    
            <div className="col s12 m6">
                <div className="profile-wrapper">
                <div className="profile-picture" style={this.state.team?(this.state.dataFound?({backgroundImage:"url(/images/"+this.state.team+".svg)"}):({backgroundImage:"url(/images/undefined.svg)"})):(null)} ></div>
                <div className="profile-text">
                    <div className="profile-username">{  this.props.profile && this.props.profile.username}</div>
                    <div className="profile-name">{this.props.profile && this.props.profile.firstName +" "+ this.props.profile.lastName}</div>
                    {
                        this.state.dataFound && <div className="profile-summoner">{this.state.summoner && "Summoner: "+ this.state.summoner}</div>
                    }
                    {
                        this.state.dataFound && <div className="profile-team">{this.state.team && fullTeamName(this.state.team)}</div>
                    }
                </div>
                </div>
            </div>
           
            </div>
            </div>

        </div>

        <div className="container">
        <div className="row" style={{marginBottom: "-10px", marginTop: "10px"}}>
            <div className="col s0 m8"></div>
            <div className="col s12 m4">
                {this.props.profile && <EventDropdown handleChangeEvent={this.handleChangeEvent} currentEvent={this.props.profile && this.props.profile.event}/>}
            </div>
        </div>
        <div className="row">
            <br/>
        {
                    this.state.dataFound && this.state.team  && this.state.event &&
                    <ProfileStats team={this.state.team && this.state.team} event={this.state.event && this.state.event} id={this.props.match.params.id} />
                }
                    {
                        this.state.dataFound && this.props.profile && this.state.team  && this.state.event  && <h4>Schedule</h4>
                    }
                
                    {
                        this.state.dataFound && this.state.team  && this.state.event &&
                        <Schedule event={this.state.event && this.state.event} team={this.state.team && this.state.team} id={this.props.match.params.id} />
                    }

                    
                </div>
                {
                    this.state.dataFound && this.props.profile && this.state.team  && this.state.event  && <h4>Team Roster</h4>
                }
                {
                    this.props.profile && this.state.team  && this.state.event ? (
                        this.state.dataFound?(<ProfileTeam event={this.state.event && this.state.event} team={this.state.team && this.state.team}/>):(<p className="center">No Data Found</p>)
                    ):(
                        <div id="wrapper">
    
                        <div className="profile-main-loader">
                        <div className="loader">
                            <svg className="circular-loader"viewBox="25 25 50 50" >
                            <circle className="loader-path" cx="50" cy="50" r="20" fill="none" stroke="#ddd" strokeWidth="2" />
                            </svg>
                        </div>
                        </div>
                            
                        </div>
                    )
                }
                
               
        </div>
        <span id="demo" style={{display: "none"}}></span>
    </div>
    )
    }
}

const mapStateToProps = (state, props) =>{
    return{
        auth: state.firebase.auth.uid,
        live: state.firebase.data.admin && state.firebase.data.admin.live,
        profile: state.firebase.data.users && state.firebase.data.users[props.match.params.id],
        user: state.firebase.profile
    }
}

export default compose(
    firebaseConnect((props)=>{
        return[
            {path: "/admin/live"},
            {path: "/users/"+props.match.params.id},
            
        ]
    }),
    connect(mapStateToProps)
)(Profile);