import React, {Component} from "react"
import firebase from "firebase/app"
import {addTeam, updateTeamRecord} from "../store/actions/adminActions"
import {connect} from "react-redux"

class AdminTeams extends Component{
    state={
        teams: null,
        team: null,
        editrecord: false,
        editScoreName: null,
        wins: null,
        losses: null,
        event: null
    }
    componentDidMount(){
        firebase.database().ref("/liveEvents").once("value").then(data=>{
            this.setState({
                teams: data.val()
            })
        })

    }

    updateTeams(){
        firebase.database().ref("/liveEvents").once("value").then(data=>{
            this.setState({
                teams: data.val()
            })
        })
    }

    handleSumbit = (e) =>{
        e.preventDefault();
        this.props.addTeam({team: this.state.team, event:e.target.id});
        this.updateTeams();
        
    }

    handleChangeRecord = (e) => {
        e.preventDefault();
        this.props.updateTeamRecord({
            team: this.state.team,
            event:this.state.event, 
            wins:this.state.wins,
            losses: this.state.losses
        })
        this.setState({
            editrecord: false
        })
        this.updateTeams();
    }

    handleChange = (e) =>{
        this.setState({
            [e.target.id]: e.target.value
        })
    }

    setInputNumbers(team, event, wins, losses){
        this.setState({
            editrecord: true, 
            editScoreName: team+"("+event+")", 
            wins:wins, 
            losses:losses,
            event: event,
            team: team
        })
        
        document.getElementById("wins").value = wins;
        document.getElementById("losses").value = losses;
        
    }
    render(){
    return(
<div className="adminteams">
    {/* EDIT SCORE */}
{    
<div className="edit-score-background" style={{display: this.state.editrecord?("block"):("none")}}>
<div className="container">
<div className="row edit-score"><br/><br/>
<h1>Edit Record: { this.state.editScoreName}</h1>

<form className="col s12" onSubmit={this.handleChangeRecord} id="edit-score-form">
        <div className="row">
        <div className="input-feild col s3">
            <label htmlFor="wins" >Wins</label>
            <input id="wins"type="number" placeholder="blue" onInput={this.handleChange} required/>
        </div>
        <div className="input-feild col s3">
            <label htmlFor="losses" >Losses</label>
            <input id="losses"type="number" placeholder="red" onInput={this.handleChange} required/>
        </div>
        </div>
        <button className="btn purple">Update Record</button>
</form>
</div>
</div>
<div className="edit-score-close" onClick={()=>{this.setState({editrecord: false})} } >

</div>
</div>
}
<br/>
<div className="container">
<div className="row">
<div className="col s2"></div>
<div className="col s10">
{
    this.state.teams && Object.entries(this.state.teams).map(data=>{
        return(
            <div key={data[0]}>
            <div className="center">
            <h1>Event: {data[0]}</h1>
            </div>
            <form className="col s12" id={data[0]} onSubmit={this.handleSumbit} >
            <div className="row">
            <div className="input-feild col s10">
                <label htmlFor="team" >Team Name</label>
                <input id="team"type="text" placeholder="" onChange={this.handleChange} required/>
            </div>
            <div className="input-feild col s2">
            <br/>
            <button className="btn purple">Add Team</button>
            </div>
            </div>
            
            </form>
            {
                data[1].teams && Object.entries(data[1].teams).map(team=>{
                    return(
                    <div key={team[0]}>
                    <div className="admin-team-teamheader">
                    <img style={{float:"left"}}src={"/images/"+team[0]+".svg"} width="36px" height="36px"  alt={team[0]}/>
                        <div className="admin-team-teamtitle">
                            {team[0] + " ("+team[1].wins+"-"+team[1].losses+")  "}
                            <div onClick={()=>{this.setInputNumbers(team[0], data[0], team[1].wins, team[1].losses)}} className="btn blue">Edit Record</div>
                        </div>
                    </div>
                    <table className="striped">
                        <thead>
                        <tr>
                            <th>Username</th>
                            <th>Summoner</th>
                            <th>Name</th>
                        </tr>
                        </thead>
                        <tbody>  
                        {
                            Object.values(team[1]).map(data=>{
                                if(data.username){
                                return(
                                    <tr key={data.username}>
                                        <td>{data.username}</td>
                                        <td>{data.summoner}</td>
                                        <td>{data.firstName + " " +data.lastName}</td>
                                    </tr>
                                )}else{
                                    return null
                                }
                            })
                        }
                        </tbody>
                        </table>
                    </div>
                    )
                })
            }
           
            
            </div>
        );
    })
}

{/* {
this.state.hydra && 
<table className="striped">
<thead>
<tr>
    <th>Username</th>
    <th>Summoner</th>
    <th>Name</th>
</tr>
</thead>
<tbody>  
{
    this.state.hydra &&
    Object.values(this.state.hydra).map(data=>{
        if(data.status){
        return(
            <tr key="data.username">
                <td>{data.username}</td>
                <td>{data.summoner}</td>
                <td>{data.firstName + " " +data.lastName}</td>
            </tr>
        )}else{
            return null
        }
    })
}
</tbody>
</table>
} */}

</div>
</div>
</div>
</div>
)
}
}

const mapDispatchToProps = (dispatch) =>{
    return{
        addTeam: (data) => dispatch(addTeam(data)),
        updateTeamRecord: (data) => dispatch(updateTeamRecord(data))
    }
}

export default connect(null, mapDispatchToProps)(AdminTeams)