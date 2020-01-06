import React, {Component} from "react"
import firebase from "firebase/app"
import {getTeamOrg} from "../class/Teams"
import {fullTeamName, shortFormTeamName} from "../class/Teams"

class Event extends Component{
state={
    frostbite_academy: [],
    wizards_academy: [],
    warhawks_academy: [], 
    tempo_academy: [],
    mischief_academy: [],
    hydra_academy: [],
    eclipse_academy: [],
    honor_academy: [],
    orgs: ['frostbite_academy', 'wizards_academy', 'warhawks_academy', 'tempo_academy', 'mischief_academy', 'hydra_academy', 'eclipse_academy', 'honor_academy'],
    isLoaded: false,
    dates: [],
    week: 0,
    standings: [],
    topKills: [],
    topAssists: [],
    topDeaths: [],
    topDamage: [],
    topGold: [],
    topVision: [],
    stats: ["topKills", "topAssists", "topDeaths", "topDamage", "topGold", "topVision"],
    statsTitles: ["Eliminations", "Assists", "Deaths", "Damage", "Gold", "Vision Score"]
}
componentDidMount(){
    firebase.database().ref("liveEvents/"+this.props.match.params.event+"/teams").orderByChild("wins").once("value").then(snap=>{
    snap.forEach(data=>{
        const org = getTeamOrg(data.key)
        this.setState({
            [org] : [
                ...this.state[org],
                data.key
            ],
            standings:[
                ...this.state.standings,
                {
                    team: data.key,
                    wins: data.val().wins,
                    losses: data.val().losses
                }
            ]
        })
    })
    }).then(()=>{
        firebase.database().ref("liveEvents/"+this.props.match.params.event+"/matches").orderByChild("Date").once('value').then(snap=>{
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
        }).then(()=>{
            firebase.database().ref("liveEvents/"+this.props.match.params.event+"/stats").orderByChild("kills").limitToLast(3).once('value').then(snap=>{
                snap.forEach(data=>{
                    firebase.database().ref("liveEvents/"+this.props.match.params.event+"/users/"+data.key).once("value").then(user=>{
                        this.setState({
                            topKills: [
                                ...this.state.topKills,
                                {
                                    name: user.val().firstName.charAt(0).toUpperCase()+user.val().firstName.slice(1) +" "+ user.val().lastName.charAt(0).toUpperCase()+user.val().lastName.slice(1),
                                    data: data.val().kills.toFixed(2),
                                    team: user.val().team,
                                    id: data.key
                                }
                            ]
                        })
                    })
                })
            }).then(()=>{
                firebase.database().ref("liveEvents/"+this.props.match.params.event+"/stats").orderByChild("deaths").limitToFirst(3).once('value').then(snap=>{
                    snap.forEach(data=>{
                        firebase.database().ref("liveEvents/"+this.props.match.params.event+"/users/"+data.key).once("value").then(user=>{
                            this.setState({
                                topDeaths: [
                                    ...this.state.topDeaths,
                                    {
                                        name: user.val().firstName.charAt(0).toUpperCase()+user.val().firstName.slice(1) + " " + user.val().lastName.charAt(0).toUpperCase()+user.val().lastName.slice(1),
                                        data: data.val().deaths.toFixed(2),
                                        team: user.val().team,
                                        id: data.key
                                    }
                                ]
                            })
                        })
                    })
                }).then(()=>{
                    firebase.database().ref("liveEvents/"+this.props.match.params.event+"/stats").orderByChild("assists").limitToLast(3).once('value').then(snap=>{
                        snap.forEach(data=>{
                            firebase.database().ref("liveEvents/"+this.props.match.params.event+"/users/"+data.key).once("value").then(user=>{
                                this.setState({
                                    topAssists: [
                                        ...this.state.topAssists,
                                        {
                                            name: user.val().firstName.charAt(0).toUpperCase()+user.val().firstName.slice(1) + " " + user.val().lastName.charAt(0).toUpperCase()+user.val().lastName.slice(1),
                                            data: data.val().assists.toFixed(2),
                                            team: user.val().team,
                                            id: data.key
                                        }
                                    ]
                                })
                            })
                        })
                    }).then(()=>{
                        firebase.database().ref("liveEvents/"+this.props.match.params.event+"/stats").orderByChild("damage").limitToLast(3).once('value').then(snap=>{
                            snap.forEach(data=>{
                                firebase.database().ref("liveEvents/"+this.props.match.params.event+"/users/"+data.key).once("value").then(user=>{
                                    this.setState({
                                        topDamage: [
                                            ...this.state.topDamage,
                                            {
                                                name: user.val().firstName.charAt(0).toUpperCase()+user.val().firstName.slice(1) + " " + user.val().lastName.charAt(0).toUpperCase()+user.val().lastName.slice(1),
                                                data: data.val().damage.toFixed(1),
                                                team: user.val().team,
                                                id: data.key
                                            }
                                        ]
                                    })
                                })
                            })
                        }).then(()=>{
                            firebase.database().ref("liveEvents/"+this.props.match.params.event+"/stats").orderByChild("gold").limitToLast(3).once('value').then(snap=>{
                                snap.forEach(data=>{
                                    firebase.database().ref("liveEvents/"+this.props.match.params.event+"/users/"+data.key).once("value").then(user=>{
                                        this.setState({
                                            topGold: [
                                                ...this.state.topGold,
                                                {
                                                    name: user.val().firstName.charAt(0).toUpperCase()+user.val().firstName.slice(1) + " " + user.val().lastName.charAt(0).toUpperCase()+user.val().lastName.slice(1),
                                                    data: data.val().gold.toFixed(1),
                                                    team: user.val().team,
                                                    id: data.key
                                                }
                                            ]
                                        })
                                    })
                                })
                            }).then(()=>{
                                firebase.database().ref("liveEvents/"+this.props.match.params.event+"/stats").orderByChild("visionScore").limitToLast(3).once('value').then(snap=>{
                                    snap.forEach(data=>{
                                        firebase.database().ref("liveEvents/"+this.props.match.params.event+"/users/"+data.key).once("value").then(user=>{
                                            this.setState({
                                                topVision: [
                                                    ...this.state.topVision,
                                                    {
                                                        name: user.val().firstName.charAt(0).toUpperCase()+user.val().firstName.slice(1) + " " + user.val().lastName.charAt(0).toUpperCase()+user.val().lastName.slice(1),
                                                        data: data.val().visionScore.toFixed(2),
                                                        team: user.val().team,
                                                        id: data.key
                                                    }
                                                ]
                                            })
                                        })
                                    })
                                }).then(()=>{
                                    this.setState({ 
                                        standings: this.state.standings.reverse(),
                                        topKills: this.state.topKills.reverse(),
                                        topAssists: this.state.topAssists.reverse(),
                                        topDamage: this.state.topDamage.reverse(),
                                        topVision: this.state.topVision.reverse(),
                                        topGold: this.state.topGold.reverse()
                                    })
                                    this.setState({
                                        isLoaded: true
                                    })
                                })
                            })
                        })
                    })
                })
            })
    
        })
    })
    
    
}
render(){
return(
<div className="event">
    <br/>
    {
        this.state.isLoaded && 
    <div className="event-banner">
        {
            this.state.isLoaded && this.state.standings.length > 0 &&
            <img alt={this.props.match.params.event} className="event-logo" src={"/images/"+this.props.match.params.event+".png"}/>
        }
        {
            this.state.isLoaded && !this.state.standings.length > 0 &&
            <p>event doesn't exist</p>
        }
    </div>
    }
    {
        !this.state.isLoaded && 
       
        <div id="wrapper">
            <br/> <br/>
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
this.state.isLoaded && 
<div className="container">
<div className="row">
        {
            this.state.isLoaded && this.state.standings.length > 0 &&
            <h1>Upcoming Matches</h1>
        }
        
    </div>
    <div className="row">
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
                borderStyle: 'solid',
                outline: '1px solid rgb(245, 245, 245)'
            }}>
            <div className="profile-schedule-wrapper" style={{
                border:0
            }}>
            
            <h1 className="leftTeam long"><a href={"/events/"+this.props.match.params.event+"/teams/"+data.blueTeam}>{fullTeamName(data.blueTeam)}</a></h1>
            <h1 className="leftTeam short"><a href={"/events/"+this.props.match.params.event+"/teams/"+data.blueTeam}>{shortFormTeamName(data.blueTeam)}</a></h1>
            
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
            <h1 className="long"><a href={"/events/"+this.props.match.params.event+"/teams/"+data.redTeam}>{fullTeamName(data.redTeam)}</a></h1>
            <h1 className="short"><a href={"/events/"+this.props.match.params.event+"/teams/"+data.redTeam}>{shortFormTeamName(data.redTeam)}</a></h1>
            </div>
            </div>
        )
        }
        if (!data.winner && data.date){
        return(
            <div key={i} className="profile-schedule-wrapper" style={{backgroundColor: "white", outline: '1px solid rgb(245, 245, 245)'}}>
            <h1 className="leftTeam long"><a href={"/events/"+this.props.match.params.event+"/teams/"+data.blueTeam}>{fullTeamName(data.blueTeam)}</a></h1>
            <h1 className="leftTeam short"><a href={"/events/"+this.props.match.params.event+"/teams/"+data.blueTeam}>{shortFormTeamName(data.blueTeam)}</a></h1>
            <div style={{backgroundImage: "url('/images/"+data.blueTeam+".svg')"}} className="schedule-team-image"></div>
            <div className="profile-schedule-time">
                <div className="time" style={{backgroundColor: "#282828"}} >{new Date(data.date).getHours()+":"+ (new Date(data.date).getMinutes() < 10 ? ("0"+new Date(data.date).getMinutes()):(new Date(data.date).getMinutes()))}</div>
                <div className="date"> {(new Date(data.date).getMonth() + 1) + "/" +new Date(data.date).getDate()+"/"+new Date(data.date).getFullYear()}</div>
            </div>
            <div style={{backgroundImage: "url('/images/"+data.redTeam+".svg')"}} className="schedule-team-image"></div>
            <h1 className="long"><a href={"/events/"+this.props.match.params.event+"/teams/"+data.redTeam}>{fullTeamName(data.redTeam)}</a></h1>
            <h1 className="short"><a href={"/events/"+this.props.match.params.event+"/teams/"+data.redTeam}>{shortFormTeamName(data.redTeam)}</a></h1>
            </div>
        )
        }else return null;
    })
            }
    </div>

    {
        this.state.isLoaded && this.state.topKills.length > 0 && 
    <div className="row">
        <h1>Top Players</h1>
    </div>
    }
    <div className="row">
        {
            //top kills
            <div className="col s12 m6 l4">
                { this.state.isLoaded && this.state.topKills.length > 0 && 
                <div className="stats-header">
                    Eliminations
                </div>
                }
                {
                    this.state.isLoaded && this.state.topKills.map((data, i)=>{
                        return(
                            <a className="stats-anchor" href={"/profile/"+data.id} key={i}>
                            <div className="standings-row" >
                                <div className="standings-placement">{i + 1}</div>
                                <div className="standings-image" style={{backgroundImage: "url('/images/"+data.team+"-icon2.svg')"}}></div>
                                <div className="stats-name">
                                    <div className="stats-name-line">{data.name}</div>
                                    <div className="stats-name-line">{data.data}<span> /5mins</span></div>
                                </div>
                            </div>
                            </a>
                        )
                    })
                }
            </div>
        }
        {
            //top assists
            <div className="col s12 m6 l4">
                { this.state.isLoaded && this.state.topKills.length > 0 && 
                <div className="stats-header">
                    Assists
                </div>
                }
                {
                    this.state.isLoaded && this.state.topAssists.map((data, i)=>{
                        return(
                            <a className="stats-anchor" href={"/profile/"+data.id} key={i}>
                            <div className="standings-row">
                                <div className="standings-placement">{i + 1}</div>
                                <div className="standings-image" style={{backgroundImage: "url('/images/"+data.team+"-icon2.svg')"}}></div>
                                <div className="stats-name">
                                    <div className="stats-name-line">{data.name}</div>
                                    <div className="stats-name-line">{data.data}<span> /5mins</span></div>
                                </div>
                            </div>
                            </a>
                        )
                    })
                }
            </div>
        }
        {
            //top deaths
            <div className="col s12 m6 l4">
                { this.state.isLoaded && this.state.topKills.length > 0 && 
                <div className="stats-header">
                    Deaths
                </div>
                }
                {
                    this.state.isLoaded && this.state.topDeaths.map((data, i)=>{
                        return(
                            <a className="stats-anchor" href={"/profile/"+data.id} key={i}>
                            <div className="standings-row">
                                <div className="standings-placement">{i + 1}</div>
                                <div className="standings-image" style={{backgroundImage: "url('/images/"+data.team+"-icon2.svg')"}}></div>
                                <div className="stats-name">
                                    <div className="stats-name-line">{data.name}</div>
                                    <div className="stats-name-line">{data.data}<span> /5mins</span></div>
                                </div>
                            </div>
                            </a>
                        )
                    })
                }
            </div>
        }
        {
            //top damage
            <div className="col s12 m6 l4">
                { this.state.isLoaded && this.state.topKills.length > 0 && 
                <div className="stats-header">
                    Damage
                </div>
                }
                {
                    this.state.isLoaded && this.state.topDamage.map((data, i)=>{
                        return(
                            <a className="stats-anchor" href={"/profile/"+data.id} key={i}>
                            <div className="standings-row">
                                <div className="standings-placement">{i + 1}</div>
                                <div className="standings-image" style={{backgroundImage: "url('/images/"+data.team+"-icon2.svg')"}}></div>
                                <div className="stats-name">
                                    <div className="stats-name-line">{data.name}</div>
                                    <div className="stats-name-line">{data.data}<span> /5mins</span></div>
                                </div>
                            </div>
                            </a>
                        )
                    })
                }
            </div>
        }
        {
            //top gold
            <div className="col s12 m6 l4">
                { this.state.isLoaded && this.state.topKills.length > 0 && 
                <div className="stats-header">
                    Gold
                </div>
                }
                {
                    this.state.isLoaded && this.state.topGold.map((data, i)=>{
                        return(
                            <a className="stats-anchor" href={"/profile/"+data.id} key={i}>
                            <div className="standings-row">
                                <div className="standings-placement">{i + 1}</div>
                                <div className="standings-image" style={{backgroundImage: "url('/images/"+data.team+"-icon2.svg')"}}></div>
                                <div className="stats-name">
                                    <div className="stats-name-line">{data.name}</div>
                                    <div className="stats-name-line">{data.data}<span> /5mins</span></div>
                                </div>
                            </div>
                            </a>
                        )
                    })
                }
            </div>
        }
        {
            //top vision
            <div className="col s12 m6 l4">
                { this.state.isLoaded && this.state.topKills.length > 0 && 
                <div className="stats-header">
                    Vision Score
                </div>
                }
                {
                    this.state.isLoaded && this.state.topVision.reverse().map((data, i)=>{
                        return(
                            <a className="stats-anchor" href={"/profile/"+data.id} key={i}>
                            <div className="standings-row">
                                <div className="standings-placement">{i + 1}</div>
                                <div className="standings-image" style={{backgroundImage: "url('/images/"+data.team+"-icon2.svg')"}}></div>
                                <div className="stats-name">
                                    <div className="stats-name-line">{data.name}</div>
                                    <div className="stats-name-line">{data.data}<span> /5mins</span></div>
                                </div>
                            </div>
                            </a>
                        )
                    })
                }
            </div>
        }
    </div>
    <div className="row">
    {this.state.isLoaded && this.state.standings.length > 0 &&
        <h1>Standings</h1>
    }
    </div>
    <div className="row">
        {this.state.isLoaded && this.state.standings.length > 0 &&
        <div className="standings-label">
        <p className="standings-wins">W</p>
        <p className="standings-losses">L</p>
        </div>
        }
        {
            this.state.isLoaded && this.state.standings.slice(0,7).map((data, i)=>{
                return(
                    <div className="standings-row" key={i}>
                        <div className="standings-placement">{i + 1}</div>
                        <div className="standings-image" style={{backgroundImage: "url('/images/"+data.team+"-icon2.svg')"}}></div>
                        <a href={"/events/"+this.props.match.params.event+"/teams/"+data.team}>
                        <div className="standings-team">
                            <div className="standings-team-long">{fullTeamName(data.team)}</div>
                            <div className="standings-team-short">{shortFormTeamName(data.team)}</div>
                        </div>
                        </a>
                        <p className="standings-wins">{data.wins}</p>
                        <p className="standings-losses">{data.losses}</p>
                    </div>
                )
            })
        }
    </div>
    
    <div className="row">
        {this.state.isLoaded && this.state.standings.length > 0 &&
        <h1>The Teams</h1>
        }
    </div>
</div>
}
   
        {
            this.state.isLoaded && this.state.orgs.map(team=>{
                if (this.state[team].length > 0){
                    return(
                        <div key={team} className="container">
                        <div className="row">
                        <div className="s12 m12 l12">
                        <div className={team.split("_")[0] === "hydra" ? ("academy-title-row hydra-background2"):("academy-title-row "+team.split("_")[0]+"-background")}>
                            <img alt={team} height="50px"width="50px"src={"/images/"+team.split("_")[0]+"-icon1.png"} />
                            {team.replace("_", " ")}
                        </div>
                        </div>
                        </div>
                        <div className="row academy-teams-back">
                        {
                            this.state[team].map(data=>{
                                return(
                                    <div key={data} className="col l4 m6 s12" >
                                        <a href={"/events/"+this.props.match.params.event+"/teams/"+data}>
                                        <div className="academy-team-row">
                                            <img alt={data} width="50px" height="50px" src={"/images/"+data+".svg"}/>
                                            <span>
                                            {
                                                data
                                            }
                                            </span>
                                        </div>
                                        </a>
                                    </div>
                                )
                            })
                        }
                        </div>
                        </div>
                    )
                }else{return null}
            })
        }
</div>
)}}

export default Event