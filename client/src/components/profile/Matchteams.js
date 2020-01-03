import React, {Component} from "react"
import {connect} from "react-redux"
import {compose} from "redux"
import {firebaseConnect} from "react-redux-firebase"
import {shortFormTeamName} from "../class/Teams"
import {offlineuser, onlineuser} from "../store/actions/matchActions"



class Matchteams extends Component{
componentDidMount(){
    this.props.offlineuser();
    this.props.onlineuser();
}
render(){
return(
    <div className="match-teams">
    <br/>
    <div className="container">
    {
        
    

    }
    <div className="row">
    <div className="row white-text match-show-last" style={{position: "relative"}}>
    <a href="https://discord.gg/7dMJQAJ" rel="noopener noreferrer" target="_blank"><button className="btn indigo accent-1"><img alt="discord" style={{position: "relative", top: "5px", marginRight: "4px"}} width="20px" src="http://www.logospng.com/images/37/nexus-gaming-the-competitive-community-37807.png"/>Join Discord</button></a> <span style={{marginLeft: "5px"}}>All Players Must Be in their Discord Team Voice Chats. </span> 
    <a href="https://www.instagram.com/olae.ca/" rel="noopener noreferrer" target="_blank"><img style={{position: "absolute", right: "195px"}} width="35px" alt="instagram" src="https://tighestimepieces.com/wp-content/uploads/2016/11/Instagram-icon-WHITE.png"/></a><a href="https://forms.gle/VF3NhGuEwiVd652d8" rel="noopener noreferrer" target="_blank"><button style={{position: "absolute", right: "0px", fontWeight:"bold" }}className=" pulse black-text btn yellow accent-2">Submit a Highlight</button></a>
    </div>
    
    <div className="col s5" style={{position: "relative"}}>
    <div style={{paddingTop: "7px"}} className={this.props.blue && "blueteam-header "+this.props.blue+"-background"}>
        <img className="team-flash" alt="blueteam" style={{display: "block", margin: "auto"}}src={"/images/"+this.props.blue+"-big2.svg"} height="66px"/>
    </div>
    </div>
    <div className="col s2">
    <div className="vs-header">
        VS
    </div>
    </div>
    <div className="col s5" style={{position: "relative"}}>
    <div style={{paddingTop: "7px"}} className={this.props.red && "redteam-header "+this.props.red+"-background"}>
        <img className="team-flash" alt="redteam" style={{display: "block", margin: "auto"}}src={"/images/"+this.props.red+"-big2.svg"} height="66px"/>
    </div>
    </div>
    </div>
    <div className="row">
    <div className="col s6" style={{position: "relative"}}>
    <div className="manager match-show-last">
        <i className="material-icons">stars</i>
    </div>
    <div className="teamblue">
        {
            this.props.blueteam && Object.entries(this.props.blueteam).map(data=>{
                return data[1].username && data[1].status !== "online"?(
                    <div className="match-profile-wrapper" key={data[0]}>
                        <div className="match-profile-image" id={this.props.blue+"nohover"}>

                        </div>
                        <div className="match-profile-text">
                            {data[1].username+" ("+data[1].summoner+")"}
                            <div className="match-profile-name">
                            {data[1].firstName+" "+data[1].lastName}  
                            </div>
                        </div>
                        
                    </div>
                    
                ):(
                    data[1].username ? (
                    <div className="match-profile-wrapper offline" key={data[0]}>
                        <div className="match-profile-image" id={this.props.blue+"nohover"}>

                        </div>
                        <div className="match-profile-text">
                            {data[1].username+" ("+data[1].summoner+")"}
                            <div className="match-profile-name">
                            {data[1].firstName+" "+data[1].lastName}  
                            </div>
                        </div>
                    </div>
                    ):(null)
                    
                )
            })
            
        }
    </div>
        
    </div>
    <div className="col s6">
    <div className="teamblue">
    {
        this.props.redteam && Object.entries(this.props.redteam).map(data=>{
                return data[1].username && data[1].status !== "online"?(
                    <div className="match-profile-wrapper" key={data[0]}>
                        <div className="match-profile-image" id={this.props.red+"nohover"}>

                        </div>
                        <div className="match-profile-text">
                            {data[1].username+" ("+data[1].summoner+")"}
                            <div className="match-profile-name">
                            {data[1].firstName+" "+data[1].lastName}  
                            </div>
                        </div>

                    </div>
                    
                ):(
                    data[1].username ? (
                    <div className="match-profile-wrapper offline" key={data[0]}>
                        <div className="match-profile-image" id={this.props.red+"nohover"}>

                        </div>
                        <div className="match-profile-text">
                            {data[1].username+" ("+data[1].summoner+")"}
                            <div className="match-profile-name">
                            {data[1].firstName+" "+data[1].lastName}  
                            </div>
                        </div>
                    </div>
                    
                ):(null))
            })
        }
    </div>
    </div>
    </div>
    {

    <div className="row center">
        <div className="col s2"></div>
        <div className="col s8">
            <div className="match-steps z-depth-1 match-show-last">
            <i className="material-icons">stars</i> Is in Charge of Creating the Custom Lobby
            <ul >
                <li><b>Lobby Name: </b>{"olae"+ shortFormTeamName(this.props.blue)+"vs"+shortFormTeamName(this.props.red)}</li>
                <li><b>Password: </b>olae2020</li>
                <li>Screenshot the score in Discord (tell us teams and winner)</li>
                <div style={{display: "flex"}}>
                    <div className="row">
                        <div className="col s7"><img className="responsive-img" src="/images/makelobby.png" alt="howtomakelobby"/></div>
                        <div className="col s5"><img className="responsive-img" src="/images/reportscore.png" alt="howtoreportscore"/></div>
                    </div>

                </div>
                
            </ul>
            </div>
        </div>
        <div className="col s2"></div>
        
    </div>
    }
    </div>
    </div>
)
}
}

const mapStateToProps = (state, props) =>{
    return{
        blueteam: state.firebase.data && state.firebase.data.liveEvents[props.event].teams[props.blue],
        redteam: state.firebase.data && state.firebase.data.liveEvents[props.event].teams[props.red]
    }
}

const mapDispatchToProps = (dispatch) =>{
    return{
        offlineuser: (data)=>{dispatch(offlineuser(data))},
        onlineuser: (data)=>{dispatch(onlineuser(data))},
    }
}
export default compose(
    firebaseConnect((props)=>{
        return[
            {path: "/liveEvents/"+props.event+"/teams/"+props.blue},
            {path: "/liveEvents/"+props.event+"/teams/"+props.red},
        ]
    }),
    connect(mapStateToProps, mapDispatchToProps)
)(Matchteams);