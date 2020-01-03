import React, {Component} from "react"
import {connect} from "react-redux"
import {compose} from "redux"
import {firebaseConnect} from "react-redux-firebase"


class ProfileRecentStats extends Component{
    
    render(){
    return(
    <div className="profile-stats">
    <h1>RECENT STATISTICS</h1>
    <table>
        <thead>
          <tr>
              <th>OPPONENT</th>
              <th>KILLS</th>
              <th>DEATHS</th>
              <th>ASSISTS</th>
              <th>CS*</th>
              <th>GOLD*</th>
          </tr>
        </thead>

        <tbody>
          {
              this.props.recentStats && 
              Object.entries(this.props.recentStats).splice(0).reverse().map(data=>{
                  return(
                  <tr key={data[0]}>
                      <td><div className="vs-stat" style={{backgroundImage: "url('/images/"+data[1].opponent+"-icon1.png')" }}></div></td>
                      <td>{data[1].kills}</td>
                      <td>{data[1].deaths}</td>
                      <td>{data[1].assists}</td>
                      <td>{data[1].cs}</td>
                      <td>{data[1].gold}</td>
                  </tr>)
              })
          }
        </tbody>
      </table>
      <h4><b>*</b>Per 10 minutes</h4>
    </div>
    )
    }
}

const mapStateToProps = (state, props) =>{
    return{
        recentStats: state.firebase.data.individualStats && state.firebase.data.individualStats[props.id] && state.firebase.data.individualStats[props.id][props.name],
    }
}

export default compose(
    firebaseConnect((props)=>{
        return[
            {path: "/individualStats/"+props.id+"/"+props.name, queryParams: [ 'limitToLast=3' ]},
        ]
    }),
    connect(mapStateToProps)
)(ProfileRecentStats);