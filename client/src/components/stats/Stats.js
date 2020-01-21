import React, {Component} from "react"
import {shortFormTeamName} from "../class/Teams"
import firebase from "firebase/app"
import EventsDropdown from "../layout/EventsDropdown"

class Stats extends Component{
    state={
        isLoaded: false,
        topKills: [],
        topAssists: [],
        topDeaths: [],
        topDamage: [],
        topGold: [],
        topVision: [],
        topKillsWeek: [],
        topAssistsWeek: [],
        topDeathsWeek: [],
        topDamageWeek: [],
        topGoldWeek: [],
        topVisionWeek: [],
        weekStatsLoaded: 0
    }
    handleChangeEvent =(event) =>{
        this.getStats(event)
    }    
    componentDidMount(){
        this.getStats(this.props.match.params.event)  
    }
getStats(event){
this.setState({isLoaded: false, 
topKills: [],
topAssists: [],
topDeaths: [],
topDamage: [],
topGold: [],
topVision: [],
topKillsWeek: [],
topAssistsWeek: [],
topDeathsWeek: [],
topDamageWeek: [],
topGoldWeek: [],
topVisionWeek: [],
weekStatsLoaded: 0
})
firebase.database().ref("liveEvents/"+event+"/stats").orderByChild("kills").limitToLast(5).once('value').then(snap=>{
snap.forEach(data=>{
firebase.database().ref("liveEvents/"+event+"/users/"+data.key).once("value").then(user=>{
if(user.val()){
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
})}
})
})
}).then(()=>{
firebase.database().ref("liveEvents/"+event+"/stats").orderByChild("deaths").limitToFirst(5).once('value').then(snap=>{
snap.forEach(data=>{
firebase.database().ref("liveEvents/"+event+"/users/"+data.key).once("value").then(user=>{
    if(user.val()){
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
    })}
})
})
}).then(()=>{
firebase.database().ref("liveEvents/"+event+"/stats").orderByChild("assists").limitToLast(5).once('value').then(snap=>{
snap.forEach(data=>{
    firebase.database().ref("liveEvents/"+event+"/users/"+data.key).once("value").then(user=>{
        if(user.val()){
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
        })}
    })
})
}).then(()=>{
firebase.database().ref("liveEvents/"+event+"/stats").orderByChild("damage").limitToLast(5).once('value').then(snap=>{
    snap.forEach(data=>{
        firebase.database().ref("liveEvents/"+event+"/users/"+data.key).once("value").then(user=>{
            if(user.val()){
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
            })}
        })
    })
}).then(()=>{
    firebase.database().ref("liveEvents/"+event+"/stats").orderByChild("gold").limitToLast(5).once('value').then(snap=>{
        snap.forEach(data=>{
            firebase.database().ref("liveEvents/"+event+"/users/"+data.key).once("value").then(user=>{
                if(user.val()){
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
                })}
            })
        })
    }).then(()=>{
        firebase.database().ref("liveEvents/"+event+"/stats").orderByChild("visionScore").limitToLast(5).once('value').then(snap=>{
            snap.forEach(data=>{
                firebase.database().ref("liveEvents/"+event+"/users/"+data.key).once("value").then(user=>{
                    if(user.val()){
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
                    })}
                })
            })
        }).then(()=>{
            firebase.database().ref("liveEvents/"+event+"/statsByWeek/currentWeek").once("value").then(data=>{
                return data.val()
            }).then((week)=>{
                firebase.database().ref("liveEvents/"+event+"/statsByWeek/"+week+"/kills").orderByChild('kills').limitToLast(5).once("value").then(snap=>{
                    snap.forEach(stat=>{
                        this.setState({
                            topKillsWeek: [
                                ...this.state.topKillsWeek,
                                {
                                    champion: stat.val().champion,
                                    data: stat.val().kills,
                                    name: stat.val().name,
                                    team: stat.val().team,
                                    username: stat.val().username,
                                    id: stat.key
                                }
                            ]
                        })
                    })
                }).then(()=>{
                    this.setState({
                        weekStatsLoaded : this.state.weekStatsLoaded + 1
                    })
                })
                firebase.database().ref("liveEvents/"+event+"/statsByWeek/"+week+"/deaths").orderByChild('deaths').limitToFirst(5).once("value").then(snap=>{
                    snap.forEach(stat=>{
                        this.setState({
                            topDeathsWeek: [
                                ...this.state.topDeathsWeek,
                                {
                                    champion: stat.val().champion,
                                    data: stat.val().deaths,
                                    name: stat.val().name,
                                    team: stat.val().team,
                                    username: stat.val().username,
                                    id: stat.key
                                }
                            ]
                        })
                    })
                }).then(()=>{
                    this.setState({
                        weekStatsLoaded : this.state.weekStatsLoaded + 1
                    })
                })
            firebase.database().ref("liveEvents/"+event+"/statsByWeek/"+week+"/assists").orderByChild('assists').limitToLast(5).once("value").then(snap=>{
                snap.forEach(stat=>{
                    this.setState({
                        topAssistsWeek: [
                            ...this.state.topAssistsWeek,
                            {
                                champion: stat.val().champion,
                                data: stat.val().assists,
                                name: stat.val().name,
                                team: stat.val().team,
                                username: stat.val().username,
                                id: stat.key
                            }
                        ]
                    })
                })
            }).then(()=>{
                this.setState({
                    weekStatsLoaded : this.state.weekStatsLoaded + 1
                })
            })
            firebase.database().ref("liveEvents/"+event+"/statsByWeek/"+week+"/damage").orderByChild('damage').limitToLast(5).once("value").then(snap=>{
                snap.forEach(stat=>{
                    this.setState({
                        topDamageWeek: [
                            ...this.state.topDamageWeek,
                            {
                                champion: stat.val().champion,
                                data: stat.val().damage,
                                name: stat.val().name,
                                team: stat.val().team,
                                username: stat.val().username,
                                id: stat.key
                            }
                        ]
                    })
                })
            }).then(()=>{
                this.setState({
                    weekStatsLoaded : this.state.weekStatsLoaded + 1
                })
            })
            firebase.database().ref("liveEvents/"+event+"/statsByWeek/"+week+"/gold").orderByChild('gold').limitToLast(5).once("value").then(snap=>{
                snap.forEach(stat=>{
                    this.setState({
                        topGoldWeek: [
                            ...this.state.topGoldWeek,
                            {
                                champion: stat.val().champion,
                                data: stat.val().gold,
                                name: stat.val().name,
                                team: stat.val().team,
                                username: stat.val().username,
                                id: stat.key
                            }
                        ]
                    })
                })
            }).then(()=>{
                this.setState({
                    weekStatsLoaded : this.state.weekStatsLoaded + 1
                })
            })
            firebase.database().ref("liveEvents/"+event+"/statsByWeek/"+week+"/visionScore").orderByChild('visionScore').limitToLast(5).once("value").then(snap=>{
                snap.forEach(stat=>{
                    this.setState({
                        topVisionWeek: [
                            ...this.state.topVisionWeek,
                            {
                                champion: stat.val().champion,
                                data: stat.val().visionScore,
                                name: stat.val().name,
                                team: stat.val().team,
                                username: stat.val().username,
                                id: stat.key
                            }
                        ]
                    })
                })
            }).then(()=>{
                this.setState({
                    weekStatsLoaded : this.state.weekStatsLoaded + 1
                })
            })
            this.setState({ 
                topKills: this.state.topKills.reverse(),
                topAssists: this.state.topAssists.reverse(),
                topDamage: this.state.topDamage.reverse(),
                topVision: this.state.topVision.reverse(),
                topGold: this.state.topGold.reverse(),
            })
            this.setState({
                isLoaded: true
            })
        })})})})})})})

    }
render(){

return(
<div className="stats">
    <div className="event-banner">
        <div className="container">
            <div className="row">
            <div className="col s12 m8">
                    <h1>STATISTICS</h1>
                    </div>
                    <div className="col s12 m4 stats-dropdown">
                        <EventsDropdown currentEvent={this.props.match.params.event} handleChangeEvent={this.handleChangeEvent}/>
                    </div>
            </div>
        </div>
    </div>
    <div className="container">
    <div className="row center">
        {
            !this.state.isLoaded && this.state.weekStatsLoaded !== 6  && 
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
            this.state.isLoaded && this.state.weekStatsLoaded === 6 && this.state.topVisionWeek.length <= 0 &&
            <p>No Stats Found</p>
        }
        {
            this.state.isLoaded && this.state.weekStatsLoaded === 6 && this.state.topVisionWeek.length > 0 &&
            <h1>Recent Performances</h1>
        }
        
    </div>
    <div className="row">
    {
            //top kills
            <div className="col s12 m6">
                { this.state.weekStatsLoaded === 6 && this.state.topKillsWeek.length > 0 && 
                <div className="stats-header">
                    Eliminations
                </div>
                }
                {
                    this.state.weekStatsLoaded === 6 && this.state.topKillsWeek.reverse().map((data, i)=>{
                        return(
                            <a className="stats-anchor" href={"/profile/"+data.id} key={i}>
                            <div className="standings-row" key={i}>
                                <div className="standings-placement">{i + 1}</div>
                                <div className="standings-image" style={{backgroundImage: "url('http://ddragon.leagueoflegends.com/cdn/9.24.2/img/champion/"+data.champion+".png')"}}></div>
                                <div className="standings-image-team" style={{backgroundImage: "url('/images/"+data.team+"-icon2.svg')"}}></div>
                                <div className="stats-name">
                                    <div className="stats-name-line">{data.name}<span className="team">{shortFormTeamName(data.team)}</span></div>
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
            <div className="col s12 m6">
                { this.state.weekStatsLoaded === 6 && this.state.topAssistsWeek.length > 0 && 
                <div className="stats-header">
                    Assists
                </div>
                }
                {
                    this.state.weekStatsLoaded === 6 && this.state.topAssistsWeek.reverse().map((data, i)=>{
                        return(
                            <a className="stats-anchor" href={"/profile/"+data.id} key={i}>
                            <div className="standings-row">
                                <div className="standings-placement">{i + 1}</div>
                                <div className="standings-image" style={{backgroundImage: "url('http://ddragon.leagueoflegends.com/cdn/9.24.2/img/champion/"+data.champion+".png')"}}></div>
                                <div className="standings-image-team" style={{backgroundImage: "url('/images/"+data.team+"-icon2.svg')"}}></div>
                                <div className="stats-name">
                                    <div className="stats-name-line">{data.name}<span className="team">{shortFormTeamName(data.team)}</span></div>
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
            <div className="col s12 m6">
                { this.state.weekStatsLoaded === 6 && this.state.topDeathsWeek.length > 0 && 
                <div className="stats-header">
                    Deaths
                </div>
                }
                {
                    this.state.weekStatsLoaded === 6 && this.state.topDeathsWeek.map((data, i)=>{
                        return(
                            <a className="stats-anchor" href={"/profile/"+data.id} key={i}>
                            <div className="standings-row">
                                <div className="standings-placement">{i + 1}</div>
                                <div className="standings-image" style={{backgroundImage: "url('http://ddragon.leagueoflegends.com/cdn/9.24.2/img/champion/"+data.champion+".png')"}}></div>
                                <div className="standings-image-team" style={{backgroundImage: "url('/images/"+data.team+"-icon2.svg')"}}></div>
                                <div className="stats-name">
                                    <div className="stats-name-line">{data.name}<span className="team">{shortFormTeamName(data.team)}</span></div>
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
            <div className="col s12 m6">
                { this.state.weekStatsLoaded === 6 && this.state.topDamageWeek.length > 0 && 
                <div className="stats-header">
                    Damage
                </div>
                }
                {
                    this.state.weekStatsLoaded === 6 && this.state.topDamageWeek.reverse().map((data, i)=>{
                        return(
                            <a className="stats-anchor" href={"/profile/"+data.id} key={i}>
                            <div className="standings-row">
                                <div className="standings-placement">{i + 1}</div>
                                <div className="standings-image" style={{backgroundImage: "url('http://ddragon.leagueoflegends.com/cdn/9.24.2/img/champion/"+data.champion+".png')"}}></div>
                                <div className="standings-image-team" style={{backgroundImage: "url('/images/"+data.team+"-icon2.svg')"}}></div>
                                <div className="stats-name">
                                    <div className="stats-name-line">{data.name}<span className="team">{shortFormTeamName(data.team)}</span></div>
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
            <div className="col s12 m6">
                { this.state.weekStatsLoaded === 6 && this.state.topGoldWeek.length > 0 && 
                <div className="stats-header">
                    Gold
                </div>
                }
                {
                    this.state.weekStatsLoaded === 6 && this.state.topGoldWeek.reverse().map((data, i)=>{
                        return(
                            <a className="stats-anchor" href={"/profile/"+data.id} key={i}>
                            <div className="standings-row">
                                <div className="standings-placement">{i + 1}</div>
                                <div className="standings-image" style={{backgroundImage: "url('http://ddragon.leagueoflegends.com/cdn/9.24.2/img/champion/"+data.champion+".png')"}}></div>
                                <div className="standings-image-team" style={{backgroundImage: "url('/images/"+data.team+"-icon2.svg')"}}></div>
                                <div className="stats-name">
                                    <div className="stats-name-line">{data.name}<span className="team">{shortFormTeamName(data.team)}</span></div>
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
            <div className="col s12 m6">
                { this.state.weekStatsLoaded === 6 && this.state.topVisionWeek.length > 0 && 
                <div className="stats-header">
                    Vision Score
                </div>
                }
                {
                    this.state.weekStatsLoaded === 6 && this.state.topVisionWeek.reverse().map((data, i)=>{
                        return(
                            <a className="stats-anchor" href={"/profile/"+data.id} key={i}>
                            <div className="standings-row">
                                <div className="standings-placement">{i + 1}</div>
                                <div className="standings-image" style={{backgroundImage: "url('http://ddragon.leagueoflegends.com/cdn/9.24.2/img/champion/"+data.champion+".png')"}}></div>
                                <div className="standings-image-team" style={{backgroundImage: "url('/images/"+data.team+"-icon2.svg')"}}></div>
                                <div className="stats-name">
                                    <div className="stats-name-line">{data.name}<span className="team">{shortFormTeamName(data.team)}</span></div>
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
        {
            this.state.isLoaded && this.state.weekStatsLoaded === 6 && this.state.topVisionWeek.length > 0 &&
            <h1>Top Players</h1>
        }
    </div>

    <div className="row">
        {
            //top kills
            <div className="col s12 m6 l4">
                { this.state.weekStatsLoaded === 6 &&this.state.isLoaded && this.state.topKills.length > 0 && 
                <div className="stats-header">
                    Eliminations
                </div>
                }
                {
                    this.state.weekStatsLoaded === 6 &&this.state.isLoaded && this.state.topKills.map((data, i)=>{
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
            //top assists
            <div className="col s12 m6 l4">
                { this.state.weekStatsLoaded === 6 &&this.state.isLoaded && this.state.topKills.length > 0 && 
                <div className="stats-header">
                    Assists
                </div>
                }
                {
                    this.state.weekStatsLoaded === 6 &&this.state.isLoaded && this.state.topAssists.map((data, i)=>{
                        return(
                            <a className="stats-anchor" href={"/profile/"+data.id}>
                            <div className="standings-row" key={i}>
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
                {this.state.weekStatsLoaded === 6 && this.state.isLoaded && this.state.topKills.length > 0 && 
                <div className="stats-header">
                    Deaths
                </div>
                }
                {
                    this.state.weekStatsLoaded === 6 && this.state.isLoaded && this.state.topDeaths.map((data, i)=>{
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
                {this.state.weekStatsLoaded === 6 && this.state.isLoaded && this.state.topKills.length > 0 && 
                <div className="stats-header">
                    Damage
                </div>
                }
                {
                    this.state.weekStatsLoaded === 6 && this.state.isLoaded && this.state.topDamage.map((data, i)=>{
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
                { this.state.weekStatsLoaded === 6 &&this.state.isLoaded && this.state.topKills.length > 0 && 
                <div className="stats-header">
                    Gold
                </div>
                }
                {
                    this.state.weekStatsLoaded === 6 && this.state.isLoaded && this.state.topGold.map((data, i)=>{
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
                { this.state.weekStatsLoaded === 6 &&this.state.isLoaded && this.state.topKills.length > 0 && 
                <div className="stats-header">
                    Vision Score
                </div>
                }
                {
                    this.state.weekStatsLoaded === 6 && this.state.isLoaded && this.state.topVision.reverse().map((data, i)=>{
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
    </div>
</div>
)
}
}
export default Stats