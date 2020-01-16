import React, {Component} from "react"
import {connect} from "react-redux"
import {compose} from "redux"
import {firebaseConnect} from "react-redux-firebase"


class EventsDropdown extends Component{
    state={
        event: null
    }
    handleChange=(e)=>{
        this.setState({
            [e.target.id]: e.target.value
        })
        this.props.handleChangeEvent(e.target.value)
    }
    componentDidMount(){
        this.setState({event: this.props.currentEvent})
    }
    render(){
    console.log(this.props)
    return(
    <div className="events-dropdown" style={{position:"relative"}}>
        <img style={{position:"absolute", top:"10px", left:10}} width="40px;" alt={this.state.event}src={"/images/"+this.state.event+".png"}/>
        <select value={this.state.event?(this.state.event):("")} id='event' style={{paddingLeft:50}} name="team" required onChange={this.handleChange}>
            {
                this.props.eventData && Object.entries(this.props.eventData).map(event=>{
                    if(event[1].displayName === "olaetest"){
                        if(this.props.auth === "Fn322uSNGRd6bWPu3hYFtFzVTgQ2"){
                            return(
                        <option key={event[0]} value={event[0]}>{event[1] && event[1].displayName}</option>
                        );
                        }else{return null}
                    
                    }else{
                    return(
                    <option key={event[0]} value={event[0]}>{event[1] && event[1].displayName}</option>
                    );
                    }
                    
                })
            }
        </select>
        </div>
    )
    }
}

const mapStateToProps = (state, props) =>{
    return{
        eventData: state.firebase.data.eventData,
        auth: state.firebase.auth.uid
    }
}

export default compose(
    firebaseConnect((props)=>{
        return[
            {path: "/eventData"},
        ]
    }),
    connect(mapStateToProps)
)(EventsDropdown);