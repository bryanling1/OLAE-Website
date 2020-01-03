import React, {Component} from "react"
import {connect} from "react-redux"
import {compose} from "redux"
import {Redirect} from "react-router-dom"
import {login} from "../store/actions/authActions"



class Login extends Component{
    handleChange=(e)=>{
        this.setState({
            [e.target.id]: e.target.value
        })
    }
    handleSumbit=(e)=>{
        e.preventDefault();
        this.props.login(this.state)

    }
    render(){
    if(this.props.auth) return < Redirect to={"/profile/"+this.props.auth}/>
    return(
    <div className="login">
    <div className="container">
        <h1 className="center">Login</h1>
        <div className="row">
            <form className="col s12" onSubmit={this.handleSumbit}>
            <div className="row">
            <div className="input-feild col s12">
                <label htmlFor="email" >Email</label>
                <input id="email"type="text" placeholder="" onChange={this.handleChange} required/>
            </div>
            <div className="input-feild col s12">
                <label htmlFor="password" >Password</label>
                <input id="password"type="password" placeholder="" onChange={this.handleChange} required/>
            </div>
            </div>
            <button className="btn purple">Login</button>
            </form>
        </div>
    </div>
    
    </div>
    )
    }
}

const mapStateToProps = (state, ownProps) =>{
    return{
        auth: state.firebase.auth.uid
    }
}
const mapDispatchToProps = (dispatch) =>{
    return{
        login: (Data) => dispatch(login(Data))
    }
}

export default compose(
    connect(mapStateToProps, mapDispatchToProps)
)(Login);