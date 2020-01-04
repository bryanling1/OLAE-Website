import React, {Component} from "react";
import {Link} from "react-router-dom"
import {connect} from "react-redux"
import {signOut} from "../store/actions/authActions"

class Nav extends Component{
state={
  sidenav: false,
  eventsnav: false,
}
handlesignout = () =>{
  this.props.signOut()
  window.location("/login")
}

sidenavToggle = () =>{
  this.setState({
    sidenav: !this.state.sidenav
  })
}
dropdownToggle = () =>{
  this.setState({
    eventsnav: !this.state.eventsnav
  })
}

showDropdownEvents = () =>{
  this.setState({
    eventsnav: true
  })
}

hideDropdownEvents = () =>{
  this.setState({
    eventsnav: false
  })
}
render(){
  return(
    <div style={{height: "100%"}}>
    <div className="sidenavv" style={{left: this.state.sidenav?("0px"):("-300px")}}>
      <div className="sidenav-head"></div>
      <div className="sidenav-item"><a href="/home">EVENTS</a></div>
        <div className="sidenav-item-secondary current-event"><a href="/events/2020">2020: Registration</a></div>
        <div className="sidenav-item-secondary"><a href="/events/olae2020-preseason">2020 Preseason</a></div>
        <div className="sidenav-item-secondary"><a href="/events/2019">2019: Recap</a></div>
      <div className="sidenav-item"><a href="/schedule">SCHEDULE</a></div>
      <div className="sidenav-item"><a href="/standings/olae2020-preseason">STANDINGS</a></div>
      <div className="sidenav-item"><a href="/stats/olae2020-preseason">STATS</a></div>
      <div className="sidenav-item"><a href="/news">NEWS</a></div>
      <div className="sidenav-item"><a href="/home">VIDEOS</a></div>
      {
            this.props.auth && this.props.auth?(<a className="sidenav-login" href={"/profile/"+this.props.auth}>MY ACCOUNT</a>):(<a className="sidenav-login" href="/login">LOGIN</a>)
      }
      {
            this.props.auth && this.props.auth?(<Link className="sidenav-logout"  onClick={this.handlesignout} to="/login">SIGN OUT</Link>):(null)
      }
      
    </div>
    <div className="sidenav-back" onClick={this.sidenavToggle} style={{visibility: this.state.sidenav?("visible"):("hidden"), opacity: this.state.sidenav?(1):(0)}}>

    </div>
    <nav className="white z-depth-0">
    <div className="nav-wrapper">
      <div className="container" style={{position: "relative", zIndex: 2}}>
      <i onClick={this.sidenavToggle} className="material-icons black-text menu" style={{position: "relative", float:"left", top: 0}}>menu</i>
      <a href={"/"} ><img style={{marginTop: "8px", zIndex: 100, position: "absolute", left:0}}alt="OLAE Logo" src="/images/OLAE1.svg" width= "90px;"/></a>
      <ul  className="left black-text nav-list">
        <li style={{position: "relative"}}>
          <div className="nav-nolink" onClick={this.dropdownToggle} >EVENTS 
            <span className="nav-arrow" style={{transform: this.state.eventsnav?("rotate(180deg)"):("rotate(0deg)")}}>▼</span>
          </div>
          {
            this.state.eventsnav?(
              <div className="nav-events-dropdown">
                <div ><a className="nav-events-item current_event" href="/events/2020">2020: Registration</a></div>
                <div ><a className="nav-events-item" href="/events/olae2020-preseason">2020 Preseason</a></div>
                <div ><a className="nav-events-item" href="/events/2019">2019 Recap</a></div>
              </div>
            ):(null)
          }
          
        </li>
        <li><a href="/schedule">SCHEDULE</a></li>
        <li><a href="/standings/olae2020-preseason">STANDINGS</a></li>
        <li><a href="/stats/olae2020-preseason">STATS</a></li>
        <li><a href="/news">NEWS</a></li>
        <li><a className="disabled" href="/home">VIDEOS</a></li>
      </ul>
      <ul  className="right black-text nav-list">
        <li>
          {
            this.props.auth && this.props.auth?(<a href={"/profile/"+this.props.auth}>MY ACCOUNT</a>):(<a href="/login">LOGIN</a>)
          }
          
        </li>
        
        {
            this.props.auth && this.props.auth?(<li><Link onClick={this.handlesignout} to="/login">SIGN OUT</Link></li>):(null)
        }
        
      </ul>
      
      </div>
      <div className="back-white">

      </div>
      {
      
    //watch now
    window.location.pathname === "/" && 
    <div className="watch-now">
        <div className="container">
          <div className="row">
            <div className="btn-floating red pulse"></div>
            <div>LIVE: </div>
            <img alt="olae2020-preseason"height="30px" src="/images/olae2020-preseason.png"/> 
            <div className="banner-long-name">OLAE2020 Pre-season</div>
            <a href="/events/olae2020-preseason">
            <div className="btn white black-text pulse">WATCH NOW</div>
            </a>
          </div>
        </div>
    </div>
    } 
    </div>
  </nav>
  </div>
)
}

}

const mapStateToProps = (state) =>{
  return{
      auth: state.firebase.auth.uid,
  }
}
const mapDispatchToProps = (dispatch)=>{
  return{
      signOut: () => {dispatch(signOut())}
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(Nav)