import React, {Component} from "react"



class MatchBye extends Component{
render(){
return(
    <div className="match-teams">
    <div className="container">
        <div className="row">
            <div className="col s12">
            <h1 className="white-text">Your team has a bye today. Please be available in the Discord as subs may be needed.</h1>
            <a href="https://discord.gg/7dMJQAJ" rel="noopener noreferrer" target="_blank"><button className="btn indigo accent-1"><img alt="discord" style={{position: "relative", top: "5px", marginRight: "4px"}} width="20px" src="http://www.logospng.com/images/37/nexus-gaming-the-competitive-community-37807.png"/>Join Discord</button></a> <span style={{marginLeft: "5px"}}></span>
            </div>
        
        </div>
    </div>
    
    </div>
)
}
}

export default (MatchBye);