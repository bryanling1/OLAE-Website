import React, {Component} from "react"
import {connect} from "react-redux"
import {compose} from "redux"
import {firebaseConnect} from "react-redux-firebase"
import {goOnline, goOffline, updateLive, archiveSeason} from "../store/actions/adminActions"


class AdminLive extends Component{
handleChange=(e)=>{
    this.setState({
        [e.target.id] : e.target.value
    })
}
handleSumbit=(e)=>{
    e.preventDefault()
    this.props.updateLive(this.state)
    document.getElementById("create-user-form").reset();
}

handleArchive=(e)=>{
    this.props.archiveSeason({name: e.target.id})
}
render(){
return(
<div className="admin-live">
<br/><br/><br/>
<div className="container">
<div className="row">
<div className="col s2"></div>
<div className="col s10">
<div className="center">
<h1>Live Events</h1>
</div>
<table className="centered">
    <tbody>
        {
            this.props.live && Object.keys(this.props.live).map(data=>{
                return(
                    <tr key={data}>
                        <td>{data}</td><td><div id={data} onClick={this.handleArchive}className="btn purple">Archive</div></td>
                    </tr>
                )
            })
        }
        
    </tbody>
</table>

<div className="center">
<h1>Archived Events</h1>
</div>
<table className="centered">
    <tbody>
        {
            this.props.past && Object.keys(this.props.past).map(data=>{
                return(
                    <tr key={data}>
                        <td>{data}</td>
                    </tr>
                )
            })
        }
        
    </tbody>
</table>

<br/>
<div className="center">
   {/* {
       this.props.live && this.props.live.status === "online"?(
        <button className="red btn" onClick={()=>{this.props.goOffline()}}>
                Go Offline
        </button>
       ):(
        <button className="btn red pulse" onClick={()=>{this.props.goOnline()}}>
                GO LIVE
        </button>
       )
   }  */}

</div>
</div>
</div>
<div className="row">
    
<div className="col s2">

</div>
<form className="col s10" onSubmit={this.handleSumbit} id="create-user-form">
    <h1>Add a Live Event</h1>
    <div className="row">
    <div className="input-feild col s6">
        <label htmlFor="name" >Name</label>
        <input id="name"type="text" placeholder="Event Name" onChange={this.handleChange} required/>
    </div>
    {/* <div className="input-feild col s3">
        <label htmlFor="matchdays" >Matchdays</label>
        <input id="matchdays"type="number" placeholder="0" onInput={this.handleChange} required/>
    </div>
    <div className="input-feild col s3">
        <label htmlFor="currentday" >Currentday</label>
        <input id="currentday"type="number" placeholder="0" onInput={this.handleChange} required/>
    </div>
    </div>
    <div className="row"> 
    <div className="input-feild col s6">
        <label htmlFor="nextdate" >Nextdate</label>
        <input id="nextdate"type="datetime-local" placeholder="0" onInput={this.handleChange} required/>
    </div>
    <div className="input-feild col s6">
        <label htmlFor="type" >Type</label>
        <input id="type"type="text" placeholder="scrimmage/match" onChange={this.handleChange} required/>
    </div> */}
    </div>
    <button className="btn purple">Update</button>
    </form>
</div>
</div>

</div>
)
}
}
const mapStateToProps = (state, ownProps) =>{
    return{
        past: state.firebase.data.history && state.firebase.data.history.allEvents,
        live: state.firebase.data.liveEvents
    }
}
const mapDispatchToProps = (dispatch) =>{
    return{
        goOnline: (data) => dispatch(goOnline(data)),
        goOffline: (data) => dispatch(goOffline(data)),
        updateLive: (data) =>dispatch(updateLive(data)),
        archiveSeason: (data) => dispatch(archiveSeason(data))
    }
}

export default compose(
    firebaseConnect((props)=>{
        return[
            {path: "history/allEvents"},
            {path: "liveEvents"}
        ]
    }),
    connect(mapStateToProps, mapDispatchToProps)
)(AdminLive);