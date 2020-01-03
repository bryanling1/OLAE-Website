import React, {Component} from "react"
import {connect} from "react-redux"
import {compose} from "redux"
import {addUser, editUser} from "../store/actions/adminActions"
import {firebaseConnect} from "react-redux-firebase"
import AdminTeams from "./AdminTeams"
import AdminLive from "./AdminLive"
import AdminSchedule from "./AdminSchedule"
import AdminScrims from "./AdminScrims"
import AdminStats from "./AdminStats"
import AdminMedia from "./AdminMedia"
import AdminNews from "./AdminNews"
import {Redirect} from "react-router-dom"
import firebase from "firebase/app"


class AdminDash extends Component{
    state={
        window: "adduser",
        editUserData: false,
        edit_user_id: null,
        edit_user_username: null,
        edit_user_firstName: null,
        edit_user_lastName: null,
        edit_user_team: null,
        edit_user_summoner: null, 
        event: "None",
        teams:null,
        password: "olae2020"
    }
    handleChange=(e)=>{
        this.setState({
            [e.target.id]: e.target.value
        })
        if(e.target.id === "event"){
                firebase.database().ref("liveEvents/"+e.target.value+"/teams").once("value").then(data=>{
                    if(data.val()){
                        this.setState({teams:data.val(), team:Object.keys(data.val())[0]});
                    }else{
                        this.setState({event: "None", team: null})
                    }
                })
            }
        if(e.target.id === "edit_user_event"){
            firebase.database().ref("liveEvents/"+e.target.value+"/teams").once("value").then(data=>{
                if(data.val()){
                    this.setState({teams:data.val(), edit_user_team:Object.keys(data.val())[0]});
                }else{
                    this.setState({edt_user_event: "None", edit_user_team: null})
                }
            })
        }
            
        }
    handleSumbit=(e)=>{
        e.preventDefault();
        this.props.addUser(this.state);
        document.getElementById("create-user-form").reset();
    }
    handleSubmitEdits=(e)=>{
        e.preventDefault();
        this.props.editUser(
            {
                id: this.state.edit_user_id,
                username: this.state.edit_user_username,
                firstName: this.state.edit_user_firstName,
                lastName: this.state.edit_user_lastName,
                summoner: this.state.edit_user_summoner,
                event: this.state.edit_user_event,
                team: this.state.edit_user_team,
            }
        );
        this.setState({editUserData:false});
    }
    openEditor=(editUserData, edit_user_id, edit_user_username, edit_user_summoner, edit_user_firstName, edit_user_lastName, edit_user_event, edit_user_team)=>{
        this.setState({
            editUserData, 
            edit_user_id,
            edit_user_username,
            edit_user_summoner,
            edit_user_firstName, 
            edit_user_lastName,
            edit_user_event,
            edit_user_team,
        })
        firebase.database().ref("liveEvents/"+edit_user_event+"/teams").once("value").then(data=>{
            if(data.val()){
                this.setState({edit_user_event: edit_user_event,teams:data.val(), edit_user_team:edit_user_team});
            }else{
                this.setState({edit_user_event: "None", team: null})
            }
        })
        
        document.getElementById("edit_user_username").value = edit_user_username;
        document.getElementById("edit_user_firstName").value = edit_user_firstName;
        document.getElementById("edit_user_lastName").value = edit_user_lastName;
        document.getElementById("edit_user_event").value = edit_user_event;
        document.getElementById("edit_user_event").text = edit_user_event;
        document.getElementById("edit_user_summoner").value = edit_user_summoner;
    }
    render(){
    if(!this.props.auth || this.props.auth !== "Fn322uSNGRd6bWPu3hYFtFzVTgQ2") {return <Redirect to="/login"/>}
    return(
    <div className="admindash">
{/* EDIT USER DATA */}
{  
<div className="edit-score-background" style={{display: this.state.editUserData?("block"):("none") }}>
<div className="container">
<div className="row edit-score"><br/><br/>
<h1>Edit User: {this.state.edit_user_id}</h1>

<form className="col s12" onSubmit={this.handleSubmitEdits} id="edit-score-form">
        <div className="row">
        <div className="input-feild col s3">
            <label htmlFor="edit_user_firstName">First Name</label>
            <input id="edit_user_firstName" type="text" placeholder="First Name" onInput={this.handleChange} required/>
        </div>
        <div className="input-feild col s3">
            <label htmlFor="edit_user_lastName" >Last Name</label>
            <input id="edit_user_lastName"type="text" placeholder="Last Name" onInput={this.handleChange} required/>
        </div>
        <div className="input-feild col s6">
            <label htmlFor="edit_user_username">Username</label>
            <input id="edit_user_username" type="text" placeholder="Username" onChange={this.handleChange} required/>
        </div>
        </div>

        <div className="row">
        <div className="input-feild col s3">
            <label htmlFor="edit_user_summoner" >Summoner</label>
            <input id="edit_user_summoner" type="text" placeholder="Summoner" onInput={this.handleChange} required/>
        </div>
        <div className="input-feild col s3">
            <label htmlFor="edit_user_team">Event</label>
            {/* <input id="edit_user_team" type="text" placeholder="Team" onInput={this.handleChange} required/> */}
            <div style={{position:"relative"}}>
                {/* <img style={{position:"absolute", top:"10px", left:10}} width="25px;" alt={this.state.edit_user_team}src={"/images/"+this.state.edit_user_team+".svg"}/> */}
                <select   style={{paddingLeft:40}} name="edit_user_event" id="edit_user_event" required onChange={this.handleChange}>
                
                <option id="edit_user_event"></option>
                
                    {
                        this.props.events && Object.keys(this.props.events).map(data=>{
                            return(
                                <option key={data} value={data}>{data}</option>
                            );
                        })
                    }
                <option value="None">None</option>
                </select>
            </div>
        </div>
        {
        this.state.edit_user_event && this.state.edit_user_event !== "None" && this.state.edit_user_team && 
        <div className="input-feild col s3">
        <label htmlFor="team" >Team</label>
        {/* <input id="team"type="text" placeholder="" onChange={this.handleChange} required/> */}
        <div style={{position:"relative"}}>
        <img style={{position:"absolute", top:"10px", left:10}} width="25px;" alt={this.state.edit_user_team}src={"/images/"+this.state.edit_user_team+".svg"}/>
        <select style={{paddingLeft:40}} name="team" id="edit_user_team" required onChange={this.handleChange}>
            <option key="blank"></option>
            {
                this.state.edit_user_team && <option key={"first"} value={this.state.edit_user_team}>{this.state.edit_user_team}</option>
            }
            {
                this.state.teams && Object.keys(this.state.teams).map(data=>{
                    return(
                        <option key={data} value={data}>{data}</option>
                    );
                })
            }
        </select>
        </div>
    </div>
    }
        </div>
        <button className="btn purple">Update Info</button>
</form>
</div>
</div>
<div className="edit-score-close" onClick={()=>{this.setState({editUserData: false, teams:null, event:"None"})} } >

</div>
</div>
}

    <br/>
    <div className="nav-side-bar">
        <div className="nav-row" onClick={()=>{this.setState({window: "adduser"})}}>
        <i className="material-icons">account_circle</i>USERS
        </div>

        <div className="nav-row" onClick={()=>{this.setState({window: "teams"})}}>
        <i className="material-icons">group</i> TEAMS
        </div>

        <div className="nav-row" onClick={()=>{this.setState({window: "live"})}}>
        <i className="material-icons">settings_input_antenna</i> EVENTS
        </div>

        <div className="nav-row" onClick={()=>{this.setState({window: "schedule"})}}>
        <i className="material-icons">date_range</i> MATCHES
        </div>

        <div className="nav-row" onClick={()=>{this.setState({window: "news"})}}>
        <i className="material-icons">fiber_new</i> NEWS
        </div>

        {/* <div className="nav-row" onClick={()=>{this.setState({window: "scrims"})}}>
        <i className="material-icons">play_circle_outline</i> SCRIMS
        </div> */}

        {/* <div className="nav-row" onClick={()=>{this.setState({window: "stats"})}}>
        <i className="material-icons">trending_up</i> STATS
        </div> */}

        {/* <div className="nav-row" onClick={()=>{this.setState({window: "media"})}}>
        <i className="material-icons">image</i> MEDIA
        </div> */}

    </div>

{
//add user
this.state.window === "adduser" ? (
<div className="container">
<div className="row">
    <div className="col s2">

    </div>
    
    <form className="col s10" onSubmit={this.handleSumbit} id="create-user-form">
    <h1>Add a User</h1>
    <div className="row">
    <div className="input-feild col s12">
        <label htmlFor="username" >Username</label>
        <input id="username"type="text" placeholder="" onChange={this.handleChange} required/>
    </div>
    <div className="input-feild col s12">
        <label htmlFor="password" >Password</label>
        <input id="password" type="text" value="olae2020"placeholder="" onChange={this.handleChange} required/>
    </div>
    <div className="input-feild col s12">
        <label htmlFor="email" >Email</label>
        <input id="email"type="text" placeholder="" onChange={this.handleChange} required/>
    </div>
    <div className="input-feild col s6">
        <label htmlFor="firstName" >First Name</label>
        <input id="firstName"type="text" placeholder="" onChange={this.handleChange} required/>
    </div>
    <div className="input-feild col s6">
        <label htmlFor="lastName" >Last Name</label>
        <input id="lastName"type="text" placeholder="" onChange={this.handleChange} required/>
    </div>
    <div className="input-feild col s12">
        <label htmlFor="event" >Event</label>
        {/* <input id="team"type="text" placeholder="" onChange={this.handleChange} required/> */}
        <div style={{position:"relative"}}>
        {/* <img style={{position:"absolute", top:"10px", left:10}} width="25px;" alt={this.state.team}src={"/images/"+this.state.team+".svg"}/> */}
        <select   style={{paddingLeft:40}} name="event" id="event" required onChange={this.handleChange}>
        
        <option value="none">None</option>
            {

                this.props.events && Object.keys(this.props.events).map(data=>{
                    return(
                        <option key={data} value={data}>{data}</option>
                    );
                })
            }
        </select>
        </div>
    </div>
    {
        this.state.event !== "None" && 
        <div className="input-feild col s12">
        <label htmlFor="team" >Team</label>
        {/* <input id="team"type="text" placeholder="" onChange={this.handleChange} required/> */}
        <div style={{position:"relative"}}>
        <img style={{position:"absolute", top:"10px", left:10}} width="25px;" alt={this.state.team}src={"/images/"+this.state.team+".svg"}/>
        <select style={{paddingLeft:40}} name="team" id="team" required onChange={this.handleChange}>
            {

                this.state.teams && Object.keys(this.state.teams).map(data=>{
                    return(
                        <option key={data} value={data}>{data}</option>
                    );
                })
            }
        </select>
        </div>
    </div>
    }
    <div className="input-feild col s12">
        <label htmlFor="summoner" >Summoner Name</label>
        <input id="summoner"type="text" placeholder="" onChange={this.handleChange} required/>
    </div>
    </div>
    <div className="row"> 
    </div>
    <button className="btn purple">Add</button>
    </form>
    </div>
    <div className="row">
    <div className="col s2"></div>
    <div className="col s10">
    {
        this.props.users && 
            <table className="striped">
            <thead>
            <tr>
                <th>Username</th>
                <th>Summoner</th>
                <th>Name</th>
                <th>Event</th>
            </tr>
            </thead>
            <tbody>  
            {
                this.props.users &&
                Object.entries(this.props.users).map(data=>{
                    return(
                        <tr key={data[0]}>
                            <td>{data[1].username}
                                <a target="_blank" rel="noopener noreferrer" href={"/profile/"+data[0]}><i className="material-icons">link</i></a>
                            </td>
                            <td>{data[1].summoner}</td>
                            <td>{data[1].firstName + " " +data[1].lastName}</td>
                            <td>
                                {/* <img style={{position:"relative", top:"5px"}} width="25px;" alt={data[1].team}src={"/images/"+data[1].team+".svg"}/> */}
                                {data[1].event ?(data[1].event ):("None")}
                            </td>
                            <td>
                                {/* <img style={{position:"relative", top:"5px"}} width="25px;" alt={data[1].team}src={"/images/"+data[1].team+".svg"}/> */}
                                {data[1].team ?(
                                    <img style={{position:"relative", top:"5px"}} width="25px;" alt={data[1].team}src={"/images/"+data[1].team+".svg"}/>
                                 ):(null)}
                            </td>
                            <td><button className="btn-small waves-effect waves-light grey" 
                                onClick={()=>{
                                                this.openEditor(true, data[0], data[1].username, data[1].summoner, data[1].firstName, data[1].lastName, data[1].event, data[1].team)
                                            }}>
                            <i className="material-icons">edit</i>
                            </button>
                            </td>
                        </tr>
                    )
                })
                
            }
            </tbody>
            </table>
    }
    </div>
    </div>

</div>
):(null)
}
{
    //the teams
    this.state.window === "teams" ? (
        <AdminTeams/>
    ):(null)
}

{
    //live
    this.state.window === "live" ? (
        <AdminLive/>
    ):(null)
}

{
    //schedule
    this.state.window === "schedule" ? (
        <AdminSchedule live={this.props.live}/>
    ):(null)
}

{
    //scrims
    this.state.window === "scrims" ? (
        <AdminScrims live={this.props.live}/>
    ):(null)
}

{
    //stats
    this.state.window === "stats" ? (
        <AdminStats live={this.props.live}/>
    ):(null)
}

{
    //news
    this.state.window === "news" ? (
        <AdminNews/>
    ):(null)
}

{
    //media
    this.state.window === "media" ? (
        <AdminMedia live={this.props.live}/>
    ):(null)
}
    
    
    </div>
    )
    }
}

const mapStateToProps = (state, ownProps) =>{
    return{
        auth: state.firebase.auth.uid,
        live: state.firebase.data.admin && state.firebase.data.admin.live,
        users: state.firebase.data.users,
        events: state.firebase.data.liveEvents
    }
}
const mapDispatchToProps = (dispatch) =>{
    return{
        addUser: (data) => dispatch(addUser(data)),
        editUser: (data) => dispatch(editUser(data))
    }
}

export default compose(
    firebaseConnect((props)=>{
        return[
            {path: "admin/live"}, {path: "users"}, {path: "liveEvents"}
        ]
    }),
    connect(mapStateToProps, mapDispatchToProps)
)(AdminDash);