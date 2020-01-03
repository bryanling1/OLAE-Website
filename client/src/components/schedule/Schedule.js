import React, {Component} from "react"
import firebase from "firebase/app"
import {fullTeamName, shortFormTeamName} from "../class/Teams"
import EventsDropdown from "../layout/EventsDropdown"

class Schedule extends Component{
state={
    dates: [],
    week: 0,
    isLoaded: false
}
componentDidMount(){
    this.getSchedule("olae2020-preseason")
}

handleChangeEvent =(event) =>{
    this.getSchedule(event)
}

getSchedule=(event)=>{
    this.setState({
        isLoaded: false,
        dates: []
    })
    firebase.database().ref("liveEvents/"+event+"/matches").orderByChild("Date").once('value').then(snap=>{
        snap.forEach(data => {
            if (!this.state.dates.includes(data.val().date)){
                this.setState({
                    dates: [
                        ...this.state.dates,
                        data.val().date 
                    ],
                    [data.val().date]: []
                })
            }
    
            if(!data.val().winner && this.state.week === 0){
                this.setState({week: this.state.dates.length - 1})
            }
    
            this.setState({
                [data.val().date]: [
                    ...this.state[data.val().date],
                    data.val()
                ]
            })
        });
    
        this.setState({
            isLoaded: true
        })
    })
}


render(){
return(
<div className="schedule">
    <div className="container">
        <div className="row">
            <div className="col s12 m8">
            <h1>SCHEDULE</h1>
            </div>
            <div className="col s12 m4 schedule-dropdown">
                <EventsDropdown currentEvent="olae2020-preseason" handleChangeEvent={this.handleChangeEvent}/>
            </div>
        </div>
    </div>
    {
        !this.state.isLoaded && 
        <div id="wrapper">
    
            <div className="profile-main-loader">
            <div className="loader">
                <svg className="circular-loader"viewBox="25 25 50 50" >
                <circle className="loader-path" cx="50" cy="50" r="20" fill="none" stroke="#ddd" strokeWidth="2" />
                </svg>
            </div>
            </div>
                            
        </div>
    }
    {
        this.state.isLoaded && this.state.dates.length <= 0 && <p className="week-no-matches">No matches found</p>
    }
    {
    this.state.isLoaded && this.state.dates.length > 0 &&
    <div className="week-row">
        <div className="container">
            <div className="row">
                <div className="week-desktop">
                {
                    this.state.isLoaded && this.state.dates.length > 0 && this.state.dates.map((data, i)=>{
                        return(
                            <div key={i}className="week" onClick={()=>{this.setState({week: i})}}>
                                {"WEEK " + (i+1)}
                            </div>
                        )
                    })
                }
                </div>
                <div className="week-mobile">
                    <div className="week">WEEK</div>
                    <div className="week-ns">
                {
                    this.state.isLoaded && this.state.dates.length > 0 && this.state.dates.map((data, i)=>{
                        return(
                            <div key={i}className="week-n" onClick={()=>{this.setState({week: i})}}>
                                {(i+1)}
                            </div>
                        )
                    })
                }
                    </div>
                </div>
            </div>
        </div>
    </div>
    }
    <div className="container">
        <div className="row">
        <div className="center week-title">
        {
                    this.state.isLoaded && this.state.dates.length > 0 && <h1>{"WEEK "+(this.state.week + 1) + ": " + (new Date(this.state.dates[this.state.week]).getMonth() + 1) + "/" +new Date(this.state.dates[this.state.week]).getDate()+"/"+new Date(this.state.dates[this.state.week]).getFullYear()}</h1>
        }
        </div>
            {
                this.state.isLoaded && this.state.dates.length > 0 && this.state[this.state.dates[this.state.week]].map((data, i)=>{
        if (data.winner && data.date){
        return(
            <div key={i} style={{
                backgroundColor:  "white",
                borderBottom: 0,
                marginBottom: 4,
                marginTop: 4,
                borderColor: "white",
                borderWidth: 1,
                borderStyle: 'solid'
            }}>
            <div className="profile-schedule-wrapper" style={{
                border:0
            }}>
            <h1 className="leftTeam long">{fullTeamName(data.blueTeam)}</h1>
            <h1 className="leftTeam short">{shortFormTeamName(data.blueTeam)}</h1>
            <div style={{backgroundImage: "url('/images/"+data.blueTeam+".svg')"}} className="schedule-team-image"></div>
            <div className="score">
                <div>
                    FINAL
                </div>
                <span className={data.blueTeam === data.winner ? ("winner"):(null)} >
                {data.blueScore}
                </span>-
                <span className={data.redTeam === data.winner ? ("winner"):(null)} >
                {data.redScore}
                </span>
            </div>
            <div style={{backgroundImage: "url('/images/"+data.redTeam+".svg')"}} className="schedule-team-image"></div>
            <h1 className="long">{fullTeamName(data.redTeam)}</h1>
            <h1 className="short">{shortFormTeamName(data.redTeam)}</h1>
            </div>
            </div>
        )
        }
        if (!data.winner && data.date){
        return(
            <div key={i} className="profile-schedule-wrapper" style={{backgroundColor: "white"}}>
            <h1 className="leftTeam long">{fullTeamName(data.blueTeam)}</h1>
            <h1 className="leftTeam short">{shortFormTeamName(data.blueTeam)}</h1>
            <div style={{backgroundImage: "url('/images/"+data.blueTeam+".svg')"}} className="schedule-team-image"></div>
            <div className="profile-schedule-time">
                <div className="time" style={{backgroundColor: "#282828"}} >{new Date(data.date).getHours()+":"+ (new Date(data.date).getMinutes() < 10 ? ("0"+new Date(data.date).getMinutes()):(new Date(data.date).getMinutes()))}</div>
                <div className="date"> {(new Date(data.date).getMonth() + 1) + "/" +new Date(data.date).getDate()+"/"+new Date(data.date).getFullYear()}</div>
            </div>
            <div style={{backgroundImage: "url('/images/"+data.redTeam+".svg')"}} className="schedule-team-image"></div>
            <h1 className="long">{fullTeamName(data.redTeam)}</h1>
            <h1 className="short">{shortFormTeamName(data.redTeam)}</h1>
            </div>
        )
        }else return null;
    })
            }
        </div>
    </div>
    
</div>
)
}
}
export default Schedule