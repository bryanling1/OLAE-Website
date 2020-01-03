import React, {Component} from "react"
import {compose} from "redux"
import html2canvas from 'html2canvas';
import firebase from "firebase/app";
import {fullTeamName} from "../class/Teams"


class AdminMedia extends Component{
state={
    top6kills: null,
    day: 6,
    stateDate: "May 19, 2019"
}

handleDownloadAll = (e) =>{
    this.handleRender();
    this.handleRenderAssists();
    this.handleRenderCS();
    this.handleRenderKDA();
    this.handleRenderGold();
    this.handleRenderStandings();
    this.handleRenderResults();
}

handleRender = (e) =>{
    html2canvas(document.getElementById("stage"), {scale: 5}).then(function(canvas) {
        //document.getElementById("generatedCanvas").appendChild(canvas);
        var a = document.createElement('a');
        // toDataURL defaults to png, so we need to request a jpeg, then convert for file download.
        a.href = canvas.toDataURL("image/jpeg").replace("image/jpeg", "image/octet-stream");
        a.download = 'OLAEtop6kills.jpg';
        a.click();
    });
}
handleRenderAssists = (e) =>{
    html2canvas(document.getElementById("stageAssists"), {scale: 5}).then(function(canvas) {
        //document.getElementById("generatedCanvas").appendChild(canvas);
        var a = document.createElement('a');
        // toDataURL defaults to png, so we need to request a jpeg, then convert for file download.
        a.href = canvas.toDataURL("image/jpeg").replace("image/jpeg", "image/octet-stream");
        a.download = 'OLAEtop6assists.jpg';
        a.click();
    });
}
handleRenderKDA = (e) =>{
    html2canvas(document.getElementById("stageKDA"), {scale: 5}).then(function(canvas) {
        //document.getElementById("generatedCanvas").appendChild(canvas);
        var a = document.createElement('a');
        // toDataURL defaults to png, so we need to request a jpeg, then convert for file download.
        a.href = canvas.toDataURL("image/jpeg").replace("image/jpeg", "image/octet-stream");
        a.download = 'OLAEtopKDA.jpg';
        a.click();
    });
}
handleRenderGold = (e) =>{
    html2canvas(document.getElementById("stageGold"), {scale: 5}).then(function(canvas) {
        //document.getElementById("generatedCanvas").appendChild(canvas);
        var a = document.createElement('a');
        // toDataURL defaults to png, so we need to request a jpeg, then convert for file download.
        a.href = canvas.toDataURL("image/jpeg").replace("image/jpeg", "image/octet-stream");
        a.download = 'OLAEtop6Gold.jpg';
        a.click();
    });
}
handleRenderCS = (e) =>{
    html2canvas(document.getElementById("stageCS"), {scale: 5}).then(function(canvas) {
        //document.getElementById("generatedCanvas").appendChild(canvas);
        var a = document.createElement('a');
        // toDataURL defaults to png, so we need to request a jpeg, then convert for file download.
        a.href = canvas.toDataURL("image/jpeg").replace("image/jpeg", "image/octet-stream");
        a.download = 'OLAEtop6CS.jpg';
        a.click();
    });
}
handleRenderStandings = (e) =>{
    html2canvas(document.getElementById("stageStandings"), {scale: 5}).then(function(canvas) {
        //document.getElementById("generatedCanvas").appendChild(canvas);
        var a = document.createElement('a');
        // toDataURL defaults to png, so we need to request a jpeg, then convert for file download.
        a.href = canvas.toDataURL("image/jpeg").replace("image/jpeg", "image/octet-stream");
        a.download = 'OLAEstandings.jpg';
        a.click();
    });
}
handleRenderResults = (e) =>{
    html2canvas(document.getElementById("stageResults"), {scale: 5}).then(function(canvas) {
        //document.getElementById("generatedCanvas").appendChild(canvas);
        var a = document.createElement('a');
        // toDataURL defaults to png, so we need to request a jpeg, then convert for file download.
        a.href = canvas.toDataURL("image/jpeg").replace("image/jpeg", "image/octet-stream");
        a.download = 'OLAEresults.jpg';
        a.click();
    });
}
componentDidMount(){
//top6kills
this.props.live.name && this.props.live.day &&
firebase.database().ref("statsByDay/"+this.props.live.name+"/kills/"+(this.props.live.day-1)).orderByChild("kills").limitToLast(6).once("value").then(snapshot=>{
var kills=[];
snapshot.forEach(data=>{
kills.push(data.val());
})
this.setState({top6kills: kills})
}).then(()=>{
firebase.database().ref("statsByDay/"+this.props.live.name+"/assists/"+(this.props.live.day-1)).orderByChild("assists").limitToLast(6).once("value").then(snapshot=>{
var assists=[];
snapshot.forEach(data=>{
assists.push(data.val());
})
this.setState({top6assists: assists})
}).then(()=>{
firebase.database().ref("statsByDay/"+this.props.live.name+"/kda/"+(this.props.live.day-1)).orderByChild("kda").limitToLast(6).once("value").then(snapshot=>{
var kda=[];
snapshot.forEach(data=>{
kda.push(data.val());
})
this.setState({top6kda: kda})
}).then(()=>{
firebase.database().ref("statsByDay/"+this.props.live.name+"/cs/"+(this.props.live.day-1)).orderByChild("cs").limitToLast(6).once("value").then(snapshot=>{
var cs=[];
snapshot.forEach(data=>{
cs.push(data.val());
})
this.setState({top6cs: cs})
}).then(()=>{
firebase.database().ref("statsByDay/"+this.props.live.name+"/gold/"+(this.props.live.day-1)).orderByChild("gold").limitToLast(6).once("value").then(snapshot=>{
var gold=[];
snapshot.forEach(data=>{
gold.push(data.val());
})
this.setState({top6gold: gold})
}).then(()=>{
firebase.database().ref("teams").orderByChild("wins").once("value").then(snapshot=>{
var teams=[];
snapshot.forEach(data=>{
teams.push(data.val())
})
this.setState({teams})
}).then(()=>{
firebase.database().ref("matches/"+this.props.live.name+"/day"+(this.props.live.day-1)).once("value").then(data=>{
    this.setState({results: data.val()})
})
})
})
})
})
})   
})
    
    
    
   
}
render(){
let killsRank = 0;
let assistsRank = 0;
let kdaRank = 0;
let csRank = 0;
let goldRank = 0;
let teamsRank = 0;
let resultsRow = 0;
return(
<div className="admin-media">
    <div className="container">
    <h1>Stats</h1><button className="green btn" onClick={this.handleDownloadAll }>Download All</button>
        <div className="row">
            
            <div id="stage" className="stage center">
                <h1>TOP 6 PERFORMANCES: KILLS</h1>
                <h2>{this.state.stateDate}</h2>
                <br/>
            <table>
        <thead>
          <tr>
              <th>Rank</th>
              <th>Team</th>
              <th>Name</th>
              <th>Handle</th>
              <th>Kills</th>
          </tr>
        </thead>

        <tbody>
            {
                
                this.state.top6kills && this.state.top6kills.slice(0).reverse().map(data=>{
                    killsRank ++ ;
                    return(
                        <tr className="stats-rank-row" key={killsRank}>
                            <td>{killsRank}</td>
                            <td><img width="55px;"alt={data.team} src={"/images/"+data.team+"-icon1.png"}/></td>
                            <td>{data.name}</td>
                            <td>{data.username}</td>
                            <td>{data.kills}</td>
                        </tr>
                    )
                })
            }
          
        </tbody>
      </table>
    
        </div>
        <button onClick={this.handleRender} className="btn blue">Download</button>
        </div>
        <div className="row">
            <div id="stageAssists" className="stage center">
                <h1>TOP 6 PERFORMANCES: ASSISTS</h1>
                <h2>{this.state.stateDate}</h2>
                <br/>
            <table>
        <thead>
          <tr>
              <th>Rank</th>
              <th>Team</th>
              <th>Name</th>
              <th>Handle</th>
              <th>Assists</th>
          </tr>
        </thead>

        <tbody>
            {
                
                this.state.top6assists && this.state.top6assists.slice(0).reverse().map(data=>{
                    assistsRank ++ ;
                    return(
                        <tr className="stats-rank-row" key={assistsRank}>
                            <td>{assistsRank}</td>
                            <td><img width="55px;"alt={data.team} src={"/images/"+data.team+"-icon1.png"}/></td>
                            <td>{data.name}</td>
                            <td>{data.username}</td>
                            <td>{data.assists}</td>
                        </tr>
                    )
                })
            }
          
        </tbody>
      </table>
      
        </div>
        <button onClick={this.handleRenderAssists} className="btn blue">Download</button>
        </div>
        <div className="row">
            
            <div id="stageKDA" className="stage center">
                <h1>TOP 6 PERFORMANCES: KDA</h1>
                <h2>{this.state.stateDate}</h2>
                <br/>
            <table>
        <thead>
          <tr>
              <th>Rank</th>
              <th>Team</th>
              <th>Name</th>
              <th>Handle</th>
              <th>KDA</th>
          </tr>
        </thead>

        <tbody>
            {
                
                this.state.top6kda && this.state.top6kda.slice(0).reverse().map(data=>{
                    kdaRank ++ ;
                    return(
                        <tr className="stats-rank-row" key={kdaRank}>
                            <td>{kdaRank}</td>
                            <td><img width="55px;"alt={data.team} src={"/images/"+data.team+"-icon1.png"}/></td>
                            <td>{data.name}</td>
                            <td>{data.username}</td>
                            <td>{data.kda && data.kda.toFixed(1)}</td>
                        </tr>
                    )
                })
            }
          
        </tbody>
      </table>
    
        </div>
        <button onClick={this.handleRenderKDA} className="btn blue">Download</button>
        </div>
        <div className="row">
            
            <div id="stageCS" className="stage center">
                <h1>TOP 6 PERFORMANCES: CS</h1>
                <h2>{this.state.stateDate}</h2>
                <br/>
            <table>
        <thead>
          <tr>
              <th>Rank</th>
              <th>Team</th>
              <th>Name</th>
              <th>Handle</th>
              <th>CS / 10mins</th>
          </tr>
        </thead>

        <tbody>
            {
                
                this.state.top6cs && this.state.top6cs.slice(0).reverse().map(data=>{
                    csRank ++ ;
                    return(
                        <tr className="stats-rank-row" key={csRank}>
                            <td>{csRank}</td>
                            <td><img width="55px;"alt={data.team} src={"/images/"+data.team+"-icon1.png"}/></td>
                            <td>{data.name}</td>
                            <td>{data.username}</td>
                            <td>{data.cs && data.cs.toFixed(1)}</td>
                        </tr>
                    )
                })
            }
          
        </tbody>
      </table>
    
        </div>
        <button onClick={this.handleRenderCS} className="btn blue">Download</button>
        </div>
        <div className="row">
            
            <div id="stageGold" className="stage center">
                <h1>TOP 6 PERFORMANCES: GOLD</h1>
                <h2>{this.state.stateDate}</h2>
                <br/>
            <table>
        <thead>
          <tr>
              <th>Rank</th>
              <th>Team</th>
              <th>Name</th>
              <th>Handle</th>
              <th>GOLD / 10mins</th>
          </tr>
        </thead>

        <tbody>
            {
                
                this.state.top6gold && this.state.top6gold.slice(0).reverse().map(data=>{
                    goldRank ++ ;
                    return(
                        <tr className="stats-rank-row" key={goldRank}>
                            <td>{goldRank}</td>
                            <td><img width="55px;"alt={data.team} src={"/images/"+data.team+"-icon1.png"}/></td>
                            <td>{data.name}</td>
                            <td>{data.username}</td>
                            <td>{data.gold && data.gold.toFixed(1)}</td>
                        </tr>
                    )
                })
            }
          
        </tbody>
      </table>
    
        </div>
        <button onClick={this.handleRenderGold} className="btn blue">Download</button>
        </div>

        <div className="row white-text">
            
            <div id="stageStandings" className="stage center stage-standings">
                <h1>STANDINGS</h1>
                <h2>Week: {this.state.day}</h2>
            <table className="striped">
        <thead>
          <tr>
              <th>Rank</th>
              <th className="center">Team</th>
              <th></th>
              <th>W</th>
              <th>L</th>
              <th>MP</th>
          </tr>
        </thead>

        <tbody className="standings-tbody">
            {
                
                this.state.teams && this.state.teams.slice(0).reverse().map(data=>{
                    teamsRank ++ ;
                    return(
                        <tr className="stats-rank-row" key={teamsRank}>
                            <td className="center" style={{width: "30px", fontWeight: "bold"}}>{teamsRank}</td>
                            <td style={{width: "60px"}}><img style={{float: "left"}}img width="55px;"alt={data.name} src={"/images/"+data.name+"-icon1.png"}/></td>
                            <td style={{fontWeight: "bold"}}>{fullTeamName(data.name)}</td>
                            <td>{data.wins}</td>
                            <td>{data.losses}</td>
                            <td style={{width: "30px"}}>{data.wins + data.losses}</td>
                        </tr>
                    )
                })
            }
          
        </tbody>
      </table>
    
        </div>
        <button onClick={this.handleRenderStandings} className="btn blue">Download</button>
        </div>
        <div className="results-stage" id="stageResults">
            {
                this.state.results && Object.values(this.state.results).map(data=>{
                    resultsRow ++ ;
                    return(
                        <div id={resultsRow} className="results-team-row">
                            <div className="results-score">
                                {data.blueteam === data.winner ? 
                                (<div>{data.bluescore}-<span className="loser">{data.redscore}</span></div>):(
                                    <div><span className="loser">{data.bluescore}</span>-{data.redscore}</div> 
                                )}
                            </div>
                            <div style={{backgroundColor: data.blueteam}} className={"results-team "+data.blueteam+"-background-results"}>
                                    <img alt={data.blueteam} height="72.5%" src={"/images/big2/"+data.blueteam+"-big2.png"}/>
                            </div>
                            <div style={{backgroundColor: data.redteam }} className={"results-team "+data.redteam+"-background-results"}>
                                <img alt={data.redteam} height="72.5%" src={"/images/big2/"+data.redteam+"-big2.png"}/>
                            </div>
                       
                        </div>
                    )
                   
                })
            }
            <div className="results-date">
                {this.state.stateDate}
            </div>

        </div>
        <button onClick={this.handleRenderResults} className="btn blue">Download</button>
    </div>
</div>


)
}
}


export default compose(
)(AdminMedia);