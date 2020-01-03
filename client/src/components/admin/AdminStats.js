import React, {Component} from "react"
import {connect} from "react-redux"
import {compose} from "redux"
import {firebaseConnect} from "react-redux-firebase"
import {addStat, updateStats} from "../store/actions/adminActions"


class AdminStats extends Component{
state={
    addstats: null,
    updatestats: null
}
handleChange=(e)=>{
    this.setState({
        [e.target.id] : e.target.value
    })
}
handleAddStat=(e)=>{
    e.preventDefault();
    this.props.addStat({
        id: this.state.id, 
        name: this.props.live.name, 
        kills: this.state.kills,
        assists: this.state.assists,
        deaths: this.state.deaths,
        gold: this.state.gold,
        cs: this.state.cs, 
        minutesPlayed: this.state.minutesPlayed,
        secondsPlayed: this.state.secondsPlayed,
        opponent: this.state.opponent,
        team: this.state.team,
        day: this.props.live.day,
        summoner: this.state.summoner,
        firstName: this.state.firstName,
        lastName: this.state.lastName,
        username: this.state.username
    })
    this.setState({addstats: false})
    document.getElementById("edit-score-form").reset();
}

handleUpdateStats=(e)=>{
    e.preventDefault();
    this.props.updateStats({
        id: this.state.id, 
        name: this.props.live.name,
        kills: this.state.updatekills,
        assists: this.state.updateassists,
        deaths: this.state.updatedeaths,
        gold: this.state.updategold,
        cs: this.state.updatecs,
        matches: this.state.matches,
    })
    this.setState({updatestats: false})
    document.getElementById("edit-score-form2").reset();
}

render(){

return(
<div className="admin-stats">

{/* Add Stats */}
{
this.state.addstats &&     
<div className="edit-score-background">
<div className="container">

<div className="row edit-score"><br/><br/>
<h1>{"Add Stats: "+this.state.summoner}</h1>

<form className="col s12" onSubmit={this.handleAddStat} id="edit-score-form">
        <div className="row">
        <div className="input-feild col s2">
            <label htmlFor="kills" >Kills</label>
            <input id="kills"type="number" placeholder="0" onInput={this.handleChange} required/>
        </div>
        <div className="input-feild col s2">
            <label htmlFor="deaths" >Deaths</label>
            <input id="deaths"type="number" placeholder="0" onInput={this.handleChange} required/>
        </div>
        <div className="input-feild col s2">
            <label htmlFor="assists" >Assists</label>
            <input id="assists"type="number" placeholder="0" onInput={this.handleChange} required/>
        </div>
        <div className="input-feild col s2">
            <label htmlFor="cs" >CS</label>
            <input id="cs"type="number" placeholder="0" onInput={this.handleChange} required/>
        </div>
        <div className="input-feild col s2">
            <label htmlFor="gold" >Gold</label>
            <input id="gold"type="number" placeholder="0" onInput={this.handleChange} required/>
        </div>
        </div>
        <div className="row">
        <div className="input-feild col s2">
            <label htmlFor="minutesPlayed" >Minutes Played</label>
            <input id="minutesPlayed"type="number" placeholder="0" onInput={this.handleChange} required/>
        </div>
        <div className="input-feild col s2">
            <label htmlFor="secondsPlayed" >Seconds Played</label>
            <input id="secondsPlayed"type="number" placeholder="0" onInput={this.handleChange} required/>
        </div>
        <div className="input-feild col s2">
            <label htmlFor="team" >Team</label>
            <input id="team"type="text" placeholder="team" onChange={this.handleChange} required/>
        </div>
        <div className="input-feild col s2">
            <label htmlFor="opponent" >Opponent</label>
            <input id="opponent"type="text" placeholder="Opponent" onChange={this.handleChange} required/>
        </div>
        
        </div>

        
        <button className="btn purple">Add Stats</button>
</form>
</div>
</div>
<div className="edit-score-close" onClick={()=>{this.setState({addstats: false})} } >

</div>
</div>
}

{/* Update Stats */}
{
this.state.updatestats &&     
<div className="edit-score-background">
<div className="container">
<div className="row edit-score"><br/><br/>
<h1>{"Update Stats: "+this.state.id}</h1>

<form className="col s12" onSubmit={this.handleUpdateStats} id="edit-score-form2">
        <div className="row">
        <div className="input-feild col s2">
            <label htmlFor="updatekills" >Kills</label>
            <input id="updatekills"type="number" step="0.01" placeholder="0" onInput={this.handleChange} required/>
        </div>
        <div className="input-feild col s2">
            <label htmlFor="updatedeaths" >Deaths</label>
            <input id="updatedeaths"type="number" step="0.01" placeholder="0" onInput={this.handleChange} required/>
        </div>
        <div className="input-feild col s2">
            <label htmlFor="updateassists" >Assists</label>
            <input id="updateassists"type="number" step="0.01" placeholder="0" onInput={this.handleChange} required/>
        </div>
        <div className="input-feild col s2">
            <label htmlFor="updategold" >Gold</label>
            <input id="updategold"type="number"  step="0.1"placeholder="0" onInput={this.handleChange} required/>
        </div>
        <div className="input-feild col s2">
            <label htmlFor="updatecs" >CS</label>
            <input id="updatecs"type="number" step="0.1" placeholder="0" onInput={this.handleChange} required/>
        </div>
        <div className="input-feild col s2">
            <label htmlFor="matches" >Matches</label>
            <input id="matches"type="number" placeholder="0" onInput={this.handleChange} required/>
        </div>

        </div>
        <button className="btn purple">Update Stats</button>
</form>
</div>
</div>
<div className="edit-score-close" onClick={()=>{this.setState({updatestats: false})} } >

</div>
</div>
}

<div className="container">

<div className="row">
<h1>Change to next day before adding STATS</h1>

<div className="col s2"></div>
<div className="col s10">

<h1 className="schedule-day">Users</h1>
<table >
    <thead>
        <tr>
            <th>id</th>
            <th>Username</th>
            <th>Summoner</th>
            <th>Name</th>
        </tr>
    </thead>
        {
            this.props.users && Object.entries(this.props.users).map(data=>{
                return(
                    <tr>
                        <td>{data[0]}</td>
                        <td>{data[1].username}</td>
                        <td>{data[1].summoner}</td>
                        <td>{data[1].firstName + " " + data[1].lastName }</td>
                        <td><button className="btn-floating btn-small waves-effect waves-light grey darken-3" onClick={()=>{this.setState({addstats: true, username: data[1].username, summoner:data[1].summoner, firstName:data[1].firstName, lastName:data[1].lastName, id: data[0]})}}>
                            <i className="material-icons">add</i>
                            </button>
                        </td>
                    </tr>
                )
            })
        }
    <tbody>

    </tbody>
</table>

</div>
</div>


<div className="row">

<div className="col s2"></div>
<div className="col s10">

<h1 className="schedule-day">Stats</h1>
<table >
    <thead>
        <tr>
            <th>id</th>
            <th>Kills</th>
            <th>Deaths</th>
            <th>Assists</th>
            <th>Gold</th>
            <th>CS</th>
            <th>Matches Played</th>
        </tr>
    </thead>
        {
            this.props.stats && Object.entries(this.props.stats).map(data=>{
                return(
                    <tr>
                        <td>{data[0]}</td>
                        <td>{data[1].kills}</td>
                        <td>{data[1].deaths}</td>
                        <td>{data[1].assists}</td>
                        <td>{data[1].gold && data[1].gold.toFixed(2)}</td>
                        <td>{data[1].cs && data[1].cs.toFixed(2)}</td>
                        <td>{data[1].matches}</td>
                        <td><button className="btn-floating btn-small waves-effect waves-light grey darken-3" onClick={()=>{this.setState({updatestats: true, id: data[0]})}}>
                            <i className="material-icons">edit</i>
                            </button>
                        </td>
                    </tr>
                )
            })
        }
    <tbody>

    </tbody>
</table>

</div>
</div>
</div>
    
</div>


)
}
}
const mapStateToProps = (state, ownProps) =>{
    return{
        users: state.firebase.data.users && state.firebase.data.users,
        stats: state.firebase.data.stats && state.firebase.data.stats[ownProps.live.name]
    }
}
const mapDispatchToProps = (dispatch) =>{
    return{
        addStat: data => dispatch(addStat(data)),
        updateStats: data => dispatch(updateStats(data))
    }
}

export default compose(
    firebaseConnect((props)=>{
        return[
            {path: "users"},
            {path: "stats/"+props.live.name}
        ]
    }),
    connect(mapStateToProps, mapDispatchToProps)
)(AdminStats);