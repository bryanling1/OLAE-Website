import React, {Component} from "react"
import {connect} from "react-redux"
import {compose} from "redux"
import {firebaseConnect} from "react-redux-firebase"
import {addScrim, deleteScrim, editScrim} from "../store/actions/adminActions"


class AdminScrims extends Component{
state={
    editscore: false,
    day: null,
    id: null,
    blue: null,
    red: null,
    bluescore: null,
    redscore: null, 
    winner: null
}
handleEditScore=(e)=>{
    e.preventDefault();
    this.props.editScrim({
        name: this.props.live.name, 
        id: this.state.id, 
        day: this.state.day, 
        bluescore: this.state.bluescore,
        redscore: this.state.redscore,
        winner: this.state.winner
    });
    this.setState({editscore: false})
    document.getElementById("edit-score-form").reset();
}
handleChange=(e)=>{
    this.setState({
        [e.target.id] : e.target.value
    })
}
handleSumbit=(e)=>{
    e.preventDefault();
    this.props.addScrim({...this.state, name: this.props.live.name})
    document.getElementById("create-user-form").reset();

}
render(){

return(
<div className="admin-schedule">
{/* EDIT SCORE */}
{
this.state.editscore &&     
<div className="edit-score-background">
<div className="container">
<div className="row edit-score"><br/><br/>
<h1>Edit Score 
<img style={{borderRight: "solid 4px #2196f3", paddingRight: "6px", marginRight: "6px", marginLeft: "30px"}} alt="blue" height="30px"src={"/images/"+this.state.blue+".svg"}/>
VS
<img style={{borderLeft: "solid 4px #f44336", paddingLeft: "6px", marginLeft: "6px"}} alt="red" height="30px"src={"/images/"+this.state.red+".svg"}/>

</h1>

<form className="col s12" onSubmit={this.handleEditScore} id="edit-score-form">
        <div className="row">
        <div className="input-feild col s3">
            <label htmlFor="bluescore" >Blue Team Score</label>
            <input id="bluescore"type="number" placeholder="blue" onInput={this.handleChange} required/>
        </div>
        <div className="input-feild col s3">
            <label htmlFor="redscore" >Red Team Score</label>
            <input id="redscore"type="number" placeholder="red" onInput={this.handleChange} required/>
        </div>
        <div className="input-feild col s6">
            <label htmlFor="winner">Winner</label>
            <input id="winner"type="text" placeholder="team name" onChange={this.handleChange} required/>
        </div>
        </div>
        <button className="btn purple">Update Score</button>
</form>
</div>
</div>
<div className="edit-score-close" onClick={()=>{this.setState({editscore: false})} } >

</div>
</div>
}
<div className="container">
<div className="row">
    
    <div className="col s2">
    
    </div>
    <form className="col s10" onSubmit={this.handleSumbit} id="create-user-form">
        <h1>Add a Scrim</h1>
        <div className="row">
        <div className="input-feild col s5">
            <label htmlFor="blueteam" >Blue Team</label>
            <input id="blueteam"type="text" placeholder="blue" onChange={this.handleChange} required/>
        </div>
        <div className="input-feild col s5">
            <label htmlFor="redteam" >Red Team</label>
            <input id="redteam"type="text" placeholder="red" onChange={this.handleChange} required/>
        </div>
        <div className="input-feild col s2">
            <label htmlFor="day">Day</label>
            <input id="day"type="number" placeholder="0" onInput={this.handleChange} required/>
        </div>
        </div>
        <button className="btn purple">Add</button>
        </form>
    </div>
<div className="row">

<div className="col s2"></div>
<div className="col s10">
{/* {
this.props.scrims && this.props.live.name &&  Object.keys(this.props.scrims[this.props.live.name]).map(data=>{
    return(
        <div key={data}>
        <h1 className="schedule-day">{data}</h1>
        <table className="centered">
                <thead>
                    <tr>
                        <th></th>
                        <th className="blue-text">Blue Team</th>
                        <th className="red-text">Red Team</th>
                        <th className="blue-text text-darken-3">Blue Score</th>
                        <th className="red-text text-darken-3">Red Score</th>
                        <th>Winner</th>
                        <th></th>
                    </tr>
                </thead>

                <tbody>{
    
    this.props.scrims && Object.entries(this.props.scrims[this.props.live.name]["day"+data[data.length-1]]).map(match=>{
        return(
        <tr key={match[0]}>
            <td><button className="btn-small waves-effect waves-light grey" onClick={()=>{this.setState({id: match[0], day: data, editscore: true, blue: match[1].blueteam, red: match[1].redteam});}}>
                <i className="material-icons">edit</i>
                </button>
            </td>
            <td>{<img alt="team" width="33px"src={"/images/"+match[1].blueteam+".svg"}/>}</td>
            <td>{<img alt="team" width="33px"src={"/images/"+match[1].redteam+".svg"}/>}</td>
            <td className="blue-text" style={{fontWeight: "bold"}}>{match[1].bluescore}</td>
            <td className="red-text" style={{fontWeight: "bold"}}>{match[1].redscore}</td>
            <td>{match[1].winner && match[1].winner!== "false" ? (<img alt="team" width="33px"src={"/images/"+match[1].winner+".svg"}/>):(null)}</td>
            <td><button className="btn-floating btn-small waves-effect waves-light red" onClick={()=>{this.props.deleteScrim({id: match[0], name: this.props.live.name, day: data}); }}>
                <i className="material-icons">remove</i>
                </button>
            </td>
        </tr>      
        )
    }) 
    } 
    </tbody>
            </table>
            </div>
    )
})
} */}
<br/>

</div>
</div>
</div>
    
</div>


)
}
}
const mapStateToProps = (state, ownProps) =>{
    return{
        scrims: state.firebase.data.scrims && state.firebase.data.scrims
    }
}
const mapDispatchToProps = (dispatch) =>{
    return{
        addScrim: data => dispatch(addScrim(data)),
        deleteScrim: data => dispatch(deleteScrim(data)),
        editScrim: data => dispatch(editScrim(data))
    }
}

export default compose(
    firebaseConnect((props)=>{
        return[
            {path: "scrims/"+props.live.name},
        ]
    }),
    connect(mapStateToProps, mapDispatchToProps)
)(AdminScrims);