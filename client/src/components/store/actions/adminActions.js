export const addUser = (data) =>{
    return(dispatch, getState, {getFirebase}) =>{
        const firebase = getFirebase();
        let config = {apiKey: "AIzaSyCGsKsCmcbwWtl7FIPkwv6Hc9PGwQxJggs",
            authDomain: "olae-d3d90.firebaseapp.com",
            databaseURL: "https://olae-d3d90.firebaseio.com"};
        let secondaryApp = firebase.initializeApp(config, "Secondary");
        secondaryApp.auth().createUserWithEmailAndPassword(
            data.email,
            data.password,
            
        ).then((res)=>{
            secondaryApp.auth().signOut();
            secondaryApp.delete();
            firebase.database().ref("/users/"+res.user.uid).set({
                username: data.username,
                firstName: data.firstName,
                lastName: data.lastName,
                event: data.event,
                summoner: data.summoner,
                team: data.team ? (data.team) : (null)
            }).then(()=>{
                if(data.team){
                firebase.database().ref("/liveEvents/"+data.event+"/teams/"+data.team+"/"+res.user.uid).set({
                    status: "offline",
                    username: data.username,
                    summoner: data.summoner,
                    firstName: data.firstName,
                    lastName: data.lastName
                }).then(()=>[
                    firebase.database().ref("/liveEvents/"+data.event+"/users/"+res.user.uid).set({
                        username: data.username,
                        summoner: data.summoner,
                        firstName: data.firstName,
                        lastName: data.lastName,
                        team: data.team
                    })
                ])
                }
            })
        })
        
    }
}

export const editUser = (data) =>{
    return (dispatch, getState, {getFirebase})=>{
        const firebase = getFirebase();
        let obj = {}
        let team = null;
        let event = null;
        //lets remove the user from his previous team
        //lets find what team he is on currently
        firebase.database().ref("/users/"+data.id).once("value").then(snap=>{
            team = snap.val().team;
            event = snap.val().event;
        }).then(()=>{
            //if the user is on a team in the same event, I need to remove them
            if(team && data.event === event){
                let obj4 = {}
                obj4["liveEvents/"+event+"/teams/"+team+"/"+data.id] = null;
                firebase.database().ref().update(obj4)
            }
        }).then(()=>{
            obj["/users/"+data.id+"/username"] = data.username;  
            obj["/users/"+data.id+"/firstName"] = data.firstName;  
            obj["/users/"+data.id+"/lastName"] = data.lastName; 
            obj["/users/"+data.id+"/summoner"] = data.summoner; 
            obj["/users/"+data.id+"/event"] = data.event;   
            obj["/users/"+data.id+"/team"] = data.team; 
            firebase.database().ref().update(obj).then(()=>{
                if(data.event && data.event !== "None"){
                    let obj3 = {};
                    obj3["/liveEvents/"+data.event+"/teams/"+data.team+"/"+data.id+"/firstName"] = data.firstName;
                    obj3["/liveEvents/"+data.event+"/teams/"+data.team+"/"+data.id+"/lastName"] = data.lastName;
                    obj3["/liveEvents/"+data.event+"/teams/"+data.team+"/"+data.id+"/status"] = "offline";
                    obj3["/liveEvents/"+data.event+"/teams/"+data.team+"/"+data.id+"/username"] = data.username;
                    obj3["/liveEvents/"+data.event+"/teams/"+data.team+"/"+data.id+"/summoner"] = data.summoner;
                    obj3["/liveEvents/"+data.event+"/users/"+data.id+"/firstName"] = data.firstName;
                    obj3["/liveEvents/"+data.event+"/users/"+data.id+"/lastName"] = data.lastName;
                    obj3["/liveEvents/"+data.event+"/users/"+data.id+"/team"] = data.team;
                    obj3["/liveEvents/"+data.event+"/users/"+data.id+"/username"] = data.username;
                    obj3["/liveEvents/"+data.event+"/users/"+data.id+"/summoner"] = data.summoner;
                    firebase.database().ref().update(obj3);
                }
            });
        })
        
        
    }
}

export const addTeam = (data) =>{
    return (dispatch, getStsate, {getFirebase})=>{
        const firebase = getFirebase();
        let obj = {};
        obj["/liveEvents/"+data.event+"/teams/"+data.team+"/wins"] = 0;
        obj["/liveEvents/"+data.event+"/teams/"+data.team+"/losses"] = 0;
        firebase.database().ref().update(obj);
    }
}

export const updateTeamRecord = (data) =>{
    return (dispatch, getStsate, {getFirebase}) =>{
        const firebase = getFirebase();
        let obj = {};
        obj["/liveEvents/"+data.event+"/teams/"+data.team+"/wins"] = data.wins;
        obj["/liveEvents/"+data.event+"/teams/"+data.team+"/losses"] = data.losses;
        firebase.database().ref().update(obj);
    }
}

export const goOnline = (data) =>{
    return(dispatch, getState, {getFirebase}) =>{
        const firebase = getFirebase();
        let obj = {}
        obj["/admin/live/status"] = "online"
        firebase.database().ref().update(obj);
    }
}

export const goOffline = (data) =>{
    return(dispatch, getState, {getFirebase}) =>{
        const firebase = getFirebase();
        let obj = {}
        obj["/admin/live/status"] = "offline"
        firebase.database().ref().update(obj);
        
    }
}

export const updateLive = (data) =>{
    return(dispatch, getState, {getFirebase}) =>{
        const firebase = getFirebase();
        let obj = {}
        obj["liveEvents/"+data.name+"/name"] = data.name;
        firebase.database().ref().update(obj);
        
    }
}

export const addMatch = (data) =>{
    return(dispatch, getState, {getFirebase}) =>{
        //redteam, blueteam, eventname, date

        const firebase = getFirebase();
        const matchKey = firebase.database().ref("/liveEvents/"+data.event+"/matches/").push().key
        let obj = {}
        obj["/liveEvents/"+data.event+"/matches/"+matchKey+"/blueTeam"] = data.blueTeam
        obj["/liveEvents/"+data.event+"/matches/"+matchKey+"/redTeam"] = data.redTeam
        obj["/liveEvents/"+data.event+"/matches/"+matchKey+"/date"] = data.date
        obj["/liveEvents/"+data.event+"/matches/"+matchKey+"/nextMatch"] = false
        //redteam
        obj["/liveEvents/"+data.event+"/teamMatches/"+data.redTeam+"/"+matchKey+"/blueTeam"] = data.blueTeam
        obj["/liveEvents/"+data.event+"/teamMatches/"+data.redTeam+"/"+matchKey+"/redTeam"] = data.redTeam
        obj["/liveEvents/"+data.event+"/teamMatches/"+data.redTeam+"/"+matchKey+"/date"] = data.date
        obj["/liveEvents/"+data.event+"/teamMatches/"+data.redTeam+"/"+matchKey+"/nextMatch"] = false
        //blueteam
        obj["/liveEvents/"+data.event+"/teamMatches/"+data.blueTeam+"/"+matchKey+"/blueTeam"] = data.blueTeam
        obj["/liveEvents/"+data.event+"/teamMatches/"+data.blueTeam+"/"+matchKey+"/redTeam"] = data.redTeam
        obj["/liveEvents/"+data.event+"/teamMatches/"+data.blueTeam+"/"+matchKey+"/date"] = data.date
        obj["/liveEvents/"+data.event+"/teamMatches/"+data.blueTeam+"/"+matchKey+"/nextMatch"] = false;


        if(data.redTeam !== data.blueTeam){
            firebase.database().ref().update(obj);
        }
    }
}

export const setNextMatch = (data) =>{
    return(dispatch, getState, {getFirebase}) =>{
        //redteam, blueteam, date, event, matchKey
        const firebase = getFirebase();
        let obj = {};
        //unset the current next match by the key
        firebase.database().ref("/liveEvents/"+data.event+"/teamNextMatch/"+data.blueTeam).once("value").then(snap=>{
            if(snap.val() && snap.val().matchKey){
                const old_key = snap.val().matchKey
                let obj2={}
                obj2["/liveEvents/"+data.event+"/matches/"+old_key+"/nextMatch"] = false;
                obj2["/liveEvents/"+data.event+"/teamMatches/"+data.blueTeam+"/"+old_key+"/nextMatch"] = false;
                obj2["/liveEvents/"+data.event+"/teamMatches/"+data.redTeam+"/"+old_key+"/nextMatch"] = false;
                firebase.database().ref().update(obj2).then(()=>{
                    obj["/liveEvents/"+data.event+"/matches/"+data.matchKey+"/nextMatch"] = true;
                    obj["/liveEvents/"+data.event+"/teamMatches/"+data.blueTeam+"/"+data.matchKey+"/nextMatch"] = true;
                    obj["/liveEvents/"+data.event+"/teamMatches/"+data.redTeam+"/"+data.matchKey+"/nextMatch"] = true;
                    //set next info data

                    //redteam
                    obj["/liveEvents/"+data.event+"/teamNextMatch/"+data.redTeam+"/matchKey"] = data.matchKey;
                    obj["/liveEvents/"+data.event+"/teamNextMatch/"+data.redTeam+"/date"] = data.date;
                    obj["/liveEvents/"+data.event+"/teamNextMatch/"+data.redTeam+"/blueTeam"] = data.blueTeam;
                    obj["/liveEvents/"+data.event+"/teamNextMatch/"+data.redTeam+"/redTeam"] = data.redTeam;
                    //blueteam
                    obj["/liveEvents/"+data.event+"/teamNextMatch/"+data.blueTeam+"/matchKey"] = data.matchKey;
                    obj["/liveEvents/"+data.event+"/teamNextMatch/"+data.blueTeam+"/date"] = data.date;
                    obj["/liveEvents/"+data.event+"/teamNextMatch/"+data.blueTeam+"/blueTeam"] = data.blueTeam;
                    obj["/liveEvents/"+data.event+"/teamNextMatch/"+data.blueTeam+"/redTeam"] = data.redTeam;
                    firebase.database().ref().update(obj);
                })
            }
            else{
                obj["/liveEvents/"+data.event+"/matches/"+data.matchKey+"/nextMatch"] = true;
                obj["/liveEvents/"+data.event+"/teamMatches/"+data.blueTeam+"/"+data.matchKey+"/nextMatch"] = true;
                obj["/liveEvents/"+data.event+"/teamMatches/"+data.redTeam+"/"+data.matchKey+"/nextMatch"] = true;
                //set next info data
                obj["/liveEvents/"+data.event+"/teamNextMatch/"+data.redTeam+"/matchKey"] = data.matchKey;
                obj["/liveEvents/"+data.event+"/teamNextMatch/"+data.redTeam+"/date"] = data.date;
                obj["/liveEvents/"+data.event+"/teamNextMatch/"+data.redTeam+"/blueTeam"] = data.blueTeam;
                obj["/liveEvents/"+data.event+"/teamNextMatch/"+data.redTeam+"/redTeam"] = data.redTeam;
                obj["/liveEvents/"+data.event+"/teamNextMatch/"+data.blueTeam+"/matchKey"] = data.matchKey;
                obj["/liveEvents/"+data.event+"/teamNextMatch/"+data.blueTeam+"/date"] = data.date;
                obj["/liveEvents/"+data.event+"/teamNextMatch/"+data.blueTeam+"/blueTeam"] = data.blueTeam;
                obj["/liveEvents/"+data.event+"/teamNextMatch/"+data.blueTeam+"/redTeam"] = data.redTeam;
                firebase.database().ref().update(obj);
            }
        })
        
    }
}


export const deleteMatch = (data) =>{
    return(dispatch, getState, {getFirebase}) =>{
        const firebase = getFirebase();
        //mathKey, blueTeam, redTeam, event
        let obj={}
        obj["/liveEvents/"+data.event+"/matches/"+data.matchKey] = null;
        obj["/liveEvents/"+data.event+"/teamMatches/"+data.blueTeam+"/"+data.matchKey] = null;
        obj["/liveEvents/"+data.event+"/teamMatches/"+data.redTeam+"/"+data.matchKey] = null;
        firebase.database().ref().update(obj).then(()=>{
            //check to see if any of the dates are the current set, and unset them
            firebase.database().ref("/liveEvents/"+data.event+"/teamNextMatch/").orderByChild("matchKey").equalTo(data.matchKey).limitToFirst(2).once("value").then(snap=>{
                if(snap.val()){
                    let obj2 = {}
                    obj2["/liveEvents/"+data.event+"/teamNextMatch/"+data.blueTeam+"/matchKey"] = null;
                    obj2["/liveEvents/"+data.event+"/teamNextMatch/"+data.redTeam+"/matchKey"] = null;
                    firebase.database().ref().update(obj2);
                }
            })
        });
    }
}

export const removeNextMatch = (data) =>{
    return(dispatch, getState, {getFirebase}) =>{
        const firebase = getFirebase();
        //event, matchKey, team, blueTeam, redTeam
        let obj={}
        obj["/liveEvents/"+data.event+"/teamNextMatch/"+data.blueTeam+"/matchKey"] = null;
        obj["/liveEvents/"+data.event+"/teamNextMatch/"+data.redTeam+"/matchKey"] = null;
        obj["/liveEvents/"+data.event+"/matches/"+data.matchKey+"/nextMatch"] = false;
        obj["/liveEvents/"+data.event+"/teamMatches/"+data.blueTeam+"/"+data.matchKey+"/nextMatch"] = false;
        obj["/liveEvents/"+data.event+"/teamMatches/"+data.redTeam+"/"+data.matchKey+"/nextMatch"] = false;
        firebase.database().ref().update(obj)
    }
}

export const onlineMatch = (data) =>{
    return(dispatch, getState, {getFirebase}) =>{
        const firebase = getFirebase();
        //event, blueTeam, redTeam
        let obj={}
        obj["/liveEvents/"+data.event+"/teamNextMatch/"+data.blueTeam+"/status"] = true;
        obj["/liveEvents/"+data.event+"/teamNextMatch/"+data.redTeam+"/status"] = true;
        firebase.database().ref().update(obj)
    }
}

export const offlineMatch = (data) =>{
    return(dispatch, getState, {getFirebase}) =>{
        const firebase = getFirebase();
        //event, blueTeam, redTeam
        let obj={}
        obj["/liveEvents/"+data.event+"/teamNextMatch/"+data.blueTeam+"/status"] = false;
        obj["/liveEvents/"+data.event+"/teamNextMatch/"+data.redTeam+"/status"] = false;
        firebase.database().ref().update(obj)
    }
}




export const editScore = (data) =>{
    return(dispatch, getState, {getFirebase}) =>{
        const firebase = getFirebase();
        //key, blueScore, redScore, event, date, 
        let obj = {};
        obj["/liveEvents/"+data.event+"/matches/"+data.matchKey+"/nextMatch"] = false;
        obj["/liveEvents/"+data.event+"/matches/"+data.matchKey+"/blueScore"] = data.blueScore;
        obj["/liveEvents/"+data.event+"/matches/"+data.matchKey+"/redScore"] = data.redScore;
        obj["/liveEvents/"+data.event+"/matches/"+data.matchKey+"/winner"] = data.winner;
        obj["/liveEvents/"+data.event+"/teamMatches/"+data.blueTeam+"/"+data.matchKey+"/nextMatch"] = false;
        obj["/liveEvents/"+data.event+"/teamMatches/"+data.blueTeam+"/"+data.matchKey+"/blueScore"] = data.blueScore;
        obj["/liveEvents/"+data.event+"/teamMatches/"+data.blueTeam+"/"+data.matchKey+"/redScore"] = data.redScore;
        obj["/liveEvents/"+data.event+"/teamMatches/"+data.blueTeam+"/"+data.matchKey+"/winner"] = data.winner;
        obj["/liveEvents/"+data.event+"/teamMatches/"+data.redTeam+"/"+data.matchKey+"/nextMatch"] = false;
        obj["/liveEvents/"+data.event+"/teamMatches/"+data.redTeam+"/"+data.matchKey+"/blueScore"] = data.blueScore;
        obj["/liveEvents/"+data.event+"/teamMatches/"+data.redTeam+"/"+data.matchKey+"/redScore"] = data.redScore;
        obj["/liveEvents/"+data.event+"/teamMatches/"+data.redTeam+"/"+data.matchKey+"/winner"] = data.winner;
        firebase.database().ref().update(obj);
    }
}


export const addScrim = (data) =>{
    return(dispatch, getState, {getFirebase}) =>{
        const firebase = getFirebase();
        const ref = firebase.database().ref("/scrims/"+data.name+"/day"+data.day);
        var push = ref.push();
        push.set({
            blueteam: data.blueteam,
            redteam: data.redteam
        })
        
    }
}

export const deleteScrim = (data) =>{
    return(dispatch, getState, {getFirebase}) =>{
        const firebase = getFirebase();
        const ref = firebase.database().ref("/scrims/"+data.name+"/"+data.day+"/"+data.id);
        ref.remove();
    }
}

export const editScrim = (data) =>{
    return(dispatch, getState, {getFirebase}) =>{
        const firebase = getFirebase();
        let obj = {};
        obj["/scrims/"+data.name+"/"+data.day+"/"+data.id+"/bluescore"] = data.bluescore;
        obj["/scrims/"+data.name+"/"+data.day+"/"+data.id+"/redscore"] = data.redscore;
        obj["/scrims/"+data.name+"/"+data.day+"/"+data.id+"/winner"] = data.winner;
        firebase.database().ref().update(obj);

    }
}
export const addStat = (data) =>{
    return(dispatch, getState, {getFirebase}) =>{
        //kills, deaths, and asissts will be per game
        //stats are per 5 mins
        const firebase = getFirebase();
        var refkills = firebase.database().ref('liveEvents/'+data.event+"/stats/"+data.id+"/kills");
        var refdeaths = firebase.database().ref('liveEvents/'+data.event+"/stats/"+data.id+"/deaths");
        var refassists = firebase.database().ref('liveEvents/'+data.event+"/stats/"+data.id+"/assists");
        var refgold = firebase.database().ref('liveEvents/'+data.event+"/stats/"+data.id+"/gold");
        var refdamage = firebase.database().ref('liveEvents/'+data.event+"/stats/"+data.id+"/damage");
        var refvisionScore = firebase.database().ref('liveEvents/'+data.event+"/stats/"+data.id+"/visionScore");
        var reftripleKills = firebase.database().ref('liveEvents/'+data.event+"/stats/"+data.id+"/tripleKills");
        var refquadraKills = firebase.database().ref('liveEvents/'+data.event+"/stats/"+data.id+"/quadraKills");
        var refpentaKills = firebase.database().ref('liveEvents/'+data.event+"/stats/"+data.id+"/pentaKills");
        var refmatches = firebase.database().ref('liveEvents/'+data.event+"/stats/"+data.id+"/matches");
        

        //get the number of seconds played
        var totalSecondsPlayed = data.matchTime;
        //ref for individual
        var indData = {
            kills: parseInt(data.kills),
            deaths: parseInt(data.deaths),
            assists: parseInt(data.assists),
            gold: parseFloat((parseInt(data.gold) * 300 / totalSecondsPlayed).toFixed(1)),
            opponent: data.opponent,
            damage: data.damage,
            visionScore: data.visionScore,
            win: data.win,
            champion: data.champion,
            time: data.matchTime
        }
        var updates = {};
        updates['liveEvents/'+data.event+'/individualStats/'+data.id+"/"+data.matchId] = indData;
        let now = new Date(data.date);
        let onejan = new Date(now.getFullYear(), 0, 1);
        const week = Math.ceil( (((now - onejan) / 86400000) + onejan.getDay() + 1) / 7 );
        //stats by day to get top performances
        updates['liveEvents/'+data.event+'/statsByWeek/'+week+"/kills/"+data.id] = {team: data.team, username: data.username, name: data.firstName + " " +data.lastName, kills: parseFloat((indData["kills"] * 300 / totalSecondsPlayed).toFixed(2)), champion: data.champion}; //kills
        updates['liveEvents/'+data.event+'/statsByWeek/'+week+"/assists/"+data.id] = {team: data.team, username: data.username, name: data.firstName + " " +data.lastName, assists: parseFloat((indData["assists"] * 300 / totalSecondsPlayed).toFixed(2)), champion: data.champion}; //assists
        updates['liveEvents/'+data.event+'/statsByWeek/'+week+"/gold/"+data.id] = {team: data.team, username: data.username, name: data.firstName + " " +data.lastName, gold: parseFloat((indData["gold"] * 300 / totalSecondsPlayed).toFixed(1)), champion: data.champion}; //gold
        updates['liveEvents/'+data.event+'/statsByWeek/'+week+"/deaths/"+data.id] = {team: data.team, username: data.username, name: data.firstName + " " +data.lastName, deaths: parseFloat((indData["deaths"] * 300 / totalSecondsPlayed).toFixed(2)), champion: data.champion}; //deaths
        updates['liveEvents/'+data.event+'/statsByWeek/'+week+"/damage/"+data.id] = {team: data.team, username: data.username, name: data.firstName + " " +data.lastName, damage: parseFloat((indData["damage"] * 300 / totalSecondsPlayed).toFixed(2)), champion: data.champion}; //damage
        updates['liveEvents/'+data.event+'/statsByWeek/'+week+"/visionScore/"+data.id] = {team: data.team, username: data.username, name: data.firstName + " " +data.lastName, visionScore: parseFloat((indData["visionScore"] * 300 / totalSecondsPlayed).toFixed(2)), champion: data.champion}; //visionScore
        //set the current set week
        updates['liveEvents/'+data.event+'/statsByWeek/currentWeek'] = week; 
        firebase.database().ref().update(updates);

        // stats will be average per 5 minutes
        refkills.transaction(kills=> {
            const average = parseInt(data.kills) * 300 / totalSecondsPlayed 
            return kills?(parseFloat((((parseInt(kills)||0) + average)/2))):(parseFloat(average));
        }).then(()=>{
        refdeaths.transaction(deaths=> {
            const average = parseInt(data.deaths) * 300 / totalSecondsPlayed 
            return deaths?(parseFloat((((parseInt(deaths)||0) + average)/2))):(parseFloat(average));
        })
        }).then(()=>{
        refassists.transaction(assists=> {
            const average = parseInt(data.assists) * 300 / totalSecondsPlayed 
            return assists?(parseFloat((((parseInt(assists)||0) + average)/2))):(parseFloat(average));
        })
        }).then(()=>{
        refgold.transaction(gold=> {
            const average = parseInt(data.gold) * 300 / totalSecondsPlayed 
            return gold?(parseFloat((((parseInt(gold)||0) + average)/2))):(parseFloat(average));
        })
        }).then(()=>{
        refdamage.transaction(damage=>{
            const average = parseInt(data.damage) * 300 / totalSecondsPlayed 
            return damage?(parseFloat((((parseInt(damage)||0) + average)/2))):(parseFloat(average));
        })
        }).then(()=>{
        refvisionScore.transaction(visionScore=>{
            const average = parseInt(data.visionScore) * 300 / totalSecondsPlayed 
            return visionScore?(parseFloat((((parseInt(visionScore)||0) + average)/2))):(parseFloat(average));
        })
        }).then(()=>{
        reftripleKills.transaction(tripleKills=>{
            return ((parseInt(tripleKills)||0) + data.tripleKills);
        })
        }).then(()=>{
        refquadraKills.transaction(quadraKills=>{
            return ((parseInt(quadraKills)||0) + data.quadraKills);
        })
        }).then(()=>{
        refpentaKills.transaction(pentaKills=>{
            return ((parseInt(pentaKills)||0) + data.pentaKills);
        })
        })
        .then(()=>{
            refmatches.transaction(matches=>{
            return ((parseInt(matches)||0) + 1);
            })
        }).then(()=>{dispatch({type:'ADD_STATS_BY_MATCH_KEY_SUCCESS'})}).catch(err=>{
            dispatch({type:'ADD_STATS_BY_MATCH_KEY_FAILURE'}, err)
        })

    }
}


export const updateStats = (data) =>{
    return(dispatch, getState, {getFirebase}) =>{
        const firebase = getFirebase();
        let obj = {};
        obj["stats/"+data.name+"/"+data.id+"/kills"] = parseFloat(data.kills);
        obj["stats/"+data.name+"/"+data.id+"/deaths"] = parseFloat(data.deaths);
        obj["stats/"+data.name+"/"+data.id+"/assists"] = parseFloat(data.assists);
        obj["stats/"+data.name+"/"+data.id+"/gold"] = parseFloat(data.gold);
        obj["stats/"+data.name+"/"+data.id+"/cs"] = parseFloat(data.cs);
        obj["stats/"+data.name+"/"+data.id+"/matches"] = parseFloat(data.matches);
        firebase.database().ref().update(obj);
    }
}

export const archiveSeason = (data) =>{
return(dispatch, getState, {getFirebase}) => {
const firebase = getFirebase();
firebase.database().ref("/history/allEvents/"+data.name).once("value").then(snapshot=>{
//only create an archive if the name doesnt exist to prevent being overwritten
if(!snapshot.val()){
    let obj = {};
    firebase.database().ref("liveEvents/"+data.name+"/individualStats").once("value").then(snap=>{
        obj["/history/allEvents/"+data.name+"/individualStats"] = snap.val();
    }).then(()=>{
    firebase.database().ref("liveEvents/"+data.name+"/matches").once("value").then(snap=>{
        obj["/history/allEvents/"+data.name+"/matches"] = snap.val();
    }).then(()=>{
    firebase.database().ref("liveEvents/"+data.name+"/scrims").once("value").then(snap=>{
        obj["/history/allEvents/"+data.name+"/scrims"] = snap.val();
    }).then(()=>{
    firebase.database().ref("liveEvents/"+data.name+"/stats").once("value").then(snap=>{
        obj["/history/allEvents/"+data.name+"/stats"] = snap.val();
    }).then(()=>{
    firebase.database().ref("liveEvents/"+data.name+"/statsByDay").once("value").then(snap=>{
        obj["/history/allEvents/"+data.name+"/statsByDay"] = snap.val();
    }).then(()=>{
    firebase.database().ref("liveEvents/"+data.name+"/teams").once("value").then(snap=>{
        obj["/history/allEvents/"+data.name+"/teams"] = snap.val();
    }).then(()=>{
    firebase.database().ref("liveEvents/"+data.name+"/users").once("value").then(snap=>{
        obj["/history/allEvents/"+data.name+"/users"] = snap.val();
    }).then(()=>{
        console.log(obj)
        firebase.database().ref().update(obj);
    }) }) }) }) }) }) })
}
})
}
}

export const addNews = (data) =>{
    return(dispatch, getState, {getFirebase}) =>{
        const firebase = getFirebase()
        let obj = {}
        const newsKey = firebase.database().ref("news").push().key
        obj["news/"+newsKey+"/title"] = data.title
        obj["news/"+newsKey+"/text"] = data.article
        obj["news/"+newsKey+"/date"] = data.date
        obj["news/"+newsKey+"/author"] = data.author
        obj["news/"+newsKey+"/image"] = data.image + ".png"
        firebase.database().ref().update(obj);
    }
}
