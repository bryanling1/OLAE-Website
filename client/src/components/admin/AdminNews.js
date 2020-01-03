import React, {Component} from "react"
import {connect} from "react-redux"
import {compose} from "redux"
import {addNews} from "../store/actions/adminActions"
import {firebaseConnect} from "react-redux-firebase"
import {Redirect} from "react-router-dom"
// import listReactFiles from 'list-react-files'

class AdminNews extends Component{
    handleChange=(e)=>{
        this.setState({
            [e.target.id]: e.target.value
        })
        }
    handleSumbit=(e)=>{
        e.preventDefault();
        this.props.addNews(this.state);
        document.getElementById("create-news").reset()
    }

    render(){
    if(!this.props.auth || this.props.auth !== "Fn322uSNGRd6bWPu3hYFtFzVTgQ2") {return <Redirect to="/login"/>}
    return(
    <div className="admindash">

<div className="container">
<div className="row">
    <div className="col s2">

    </div>
    
    <form className="col s10" onSubmit={this.handleSumbit} id="create-news">
    <h1>Add Article</h1>
    <div className="row">
    <div className="input-feild col s12">
        <label htmlFor="username" >Title</label>
        <input id="title"type="text" placeholder="" onChange={this.handleChange} required/>
    </div>
    <div className="input-feild col s4">
        <label htmlFor="Date" >Date</label>
        <input id="date" type="date" placeholder="" onChange={this.handleChange} required/>
    </div>
    <div className="input-feild col s4">
        <label htmlFor="Author" >Author</label>
        <input id="author"type="text" placeholder="" onChange={this.handleChange} required/>
    </div>
    <div className="input-feild col s4">
        <label htmlFor="image" >png file name</label>
        <input id="image"type="text" placeholder="" onChange={this.handleChange} required/>
    </div>
    <div className="input-feild col s12">
        <label htmlFor="text" >text</label>
        <textarea style={{height: "300px"}}  id="article" type="textarea" placeholder="" onChange={this.handleChange} required/>
    </div>

    </div>
    <button className="btn purple">Post</button>
    </form>
    </div>

    </div>
    </div>)
    }
}

const mapStateToProps = (state, ownProps) =>{
    return{
        auth: state.firebase.auth.uid,
    }
}
const mapDispatchToProps = (dispatch) =>{
    return{
        addNews: (data) => dispatch(addNews(data)),
    }
}

export default compose(
    firebaseConnect((props)=>{
        return[
            {path: "admin/live"}, {path: "users"}, {path: "liveEvents"}
        ]
    }),
    connect(mapStateToProps, mapDispatchToProps)
)(AdminNews);