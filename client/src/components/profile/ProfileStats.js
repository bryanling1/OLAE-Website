import React, {Component} from "react"
import {connect} from "react-redux"
import {compose} from "redux"
import {firebaseConnect} from "react-redux-firebase"
import firebase from "firebase/app"


class ProfileStats extends Component{
    state={
        killsRank: null,
        deathsRank: null,
        assistsRank: null,
        goldRank: null,
        visionScoreRank: null,
        damageRank: null,
        isLoaded: null,
        event: null
    }
    componentDidMount(){
      this.setState({event: this.props.event})
    }
    componentDidUpdate(){
        if(!this.state.killsRank){
        var ref = firebase.database().ref("/liveEvents/"+this.props.event+"/stats/")
        this.props.stats && ref.orderByChild("kills").startAt(this.props.stats.kills+0.00000001).once("value").then(data=>{
            this.setState({killsRank: (data.val() && Object.keys(data.val()).length)+1 || 1})
        }).then(
            this.props.stats && ref.orderByChild("deaths").startAt(0).endAt(this.props.stats.deaths-0.00000001).once("value").then(data=>{
                this.setState({deathsRank: (data.val() && Object.keys(data.val()).length)+1 || 1})
        }).then(
            this.props.stats && ref.orderByChild("assists").startAt(this.props.stats.assists+0.00000001).once("value").then(data=>{
                this.setState({assistsRank: (data.val() && Object.keys(data.val()).length)+1 || 1})
        }).then(
            this.props.stats && ref.orderByChild("gold").startAt(this.props.stats.gold + 0.00000001 ).once("value").then(data=>{
                this.setState({goldRank: (data.val() && Object.keys(data.val()).length)+1 || 1})
        }).then(
            this.props.stats && ref.orderByChild("visionScore").startAt(this.props.stats.visionScore+0.00000001).once("value").then(data=>{
                this.setState({visionScoreRank: (data.val() && Object.keys(data.val()).length) + 1 || 1})
            }) 
        ).then(
          this.props.stats && ref.orderByChild("damage").startAt(this.props.stats.damage+0.00000001).once("value").then(data=>{
              this.setState({damageRank: (data.val() && Object.keys(data.val()).length) + 1 || 1, isLoaded: true})
          }) 
      )    
        )
        )
        )
    }

    }

    render(){
    return(
    <div className="profile-stats">
      
    <div className="match-count" style={{backgroundColor: this.props.teamData && this.props.teamData.dark}}>
      <svg  x="0px" y="0px" width="15px" viewBox="0 0 1000 1000" enableBackground="new 0 0 1000 1000">
      <g><path d="M59.2,12.1c43.2,2.8,78,19.8,107.1,48.9C280,174.4,393.6,288.1,507.2,401.7c52.2,52.2,104.6,104.3,156.5,157c5.4,5.5,9.5,14.1,10.3,21.7c0.6,6.4-2.8,15-7.4,19.8c-21.9,23.2-44.7,45.6-67.5,68c-12.7,12.4-28.2,11.6-41.8-2c-66-65.9-131.9-131.8-197.8-197.7C259.9,368.9,160.5,269.4,61,170c-27.6-27.6-44.8-60.1-50.2-98.9C6.7,41.8,18.4,20,42.6,14C48.5,12.5,54.7,12.5,59.2,12.1z"/><path d="M633.8,474.5c-35.9-36-71-71.1-106.5-106.6c1.3-1.5,2.9-3.5,4.6-5.3C632.5,261.9,733.1,161.2,833.9,60.7c28.3-28.3,62.2-45.7,102.6-48.2c37.1-2.4,57.2,19,53,55.9c-4.3,37.1-19,69.7-45.3,96.1C842.1,267,739.8,369.1,637.6,471.3C636.5,472.4,635.2,473.3,633.8,474.5z"/><path d="M396.2,855.4c-2.6-3.4-5.3-6.9-7.9-10.3c-18.4-24.5-36.6-49.1-55.1-73.6c-10.9-14.5-21.8-15.1-34.6-2.3c-69.2,69.1-138.3,138.3-207.4,207.4c-15,15-26.5,15.1-41.4,0.4c-8.9-8.8-17.9-17.7-26.7-26.7c-12.6-12.9-12.6-25.1,0.1-37.8c68-68,136-136,203.9-204c3.4-3.4,6.9-7.1,8.8-11.3c3.8-8.2,0.5-15.9-9-21.9c-32.7-20.6-65.5-41-98.3-61.6c-2.5-1.6-4.9-3.3-7.4-4.9c0.2-0.8,0.4-1.7,0.6-2.5c3-0.3,6-1,8.9-0.8c49.5,2.1,97.7,10.8,144.2,28.7c46.7,17.9,77,51.2,95.1,96.9c14.4,36.4,23.4,74.2,28.8,112.9c0.5,3.5-0.3,7.2-0.4,10.8C397.7,854.9,397,855.1,396.2,855.4z"/><path d="M878.5,608.4c-1.6,1.4-3,3-4.8,4.1c-32.8,20.4-65.7,40.8-98.5,61.2c-15.9,9.9-16.9,20.2-3.6,33.5c67.8,67.8,135.5,135.5,203.3,203.3c15.3,15.3,15.2,26.4-0.3,42c-8.7,8.7-17.3,17.4-26,26c-12.6,12.4-25.4,12.4-38-0.1c-68.7-68.7-137.4-137.3-206-206c-17.1-17.2-26-16.7-40.3,2.5c-18.9,25.3-37.7,50.7-56.6,76c-1.2,1.6-3,2.8-7.1,3.4c0.6-6.4,1.1-12.9,2-19.3c5-35.5,14.1-69.9,27.1-103.4c18.9-49,52.3-82.4,101.9-100.2c44.1-15.7,89.5-23.9,136.1-26c3.4-0.2,6.8,0.3,10.2,0.4C878,606.7,878.2,607.5,878.5,608.4z"/><path d="M366,529.5c35.7,35.7,71,70.9,106.3,106.2c-11.1,11.3-22.2,23.5-34.2,34.6c-10.3,9.4-25.7,8.9-36-1.1c-23.5-22.9-46.8-46.2-69.7-69.7c-9.7-10-10.1-26-0.7-36.1C342.6,551.6,354.5,540.8,366,529.5z"/></g>
      </svg>
      {/*Matches Played */}
      <div>{this.props.stats && this.props.stats.matches?(this.props.stats.matches):(0)}</div>
      <svg width="20px" x="0px" y="0px" viewBox="0 0 512.01 512.01" enableBackground="new 0 0 512.01 512.01" >
		  <g>
      <path className="gold"d="M507.804,200.28L262.471,12.866c-3.84-2.923-9.131-2.923-12.949,0L4.188,200.28c-3.605,2.773-5.077,7.531-3.648,11.84    l93.717,281.92c1.451,4.373,5.525,7.296,10.133,7.296h303.253c4.587,0,8.683-2.944,10.133-7.296l93.717-281.92    C512.882,207.789,511.41,203.053,507.804,200.28z"/>
      </g>
      </svg>
      <svg width="20px"className="skull-icon" version="1.1" x="0px" y="0px" viewBox="0 0 1000 1000" enableBackground="new 0 0 1000 1000" >
      
      <g><g style={{fill: this.props.teamData && this.props.teamData.light}}transform="translate(0.000000,511.000000) scale(0.100000,-0.100000)"><path style={{fill: this.props.teamData && this.props.teamData.dark}}d="M4713.5,3296.7c-322.8-40.9-754-212.5-1074.8-427c-200.2-134.9-598.7-533.3-729.5-731.5c-222.7-335.1-359.6-688.6-416.8-1066.6c-53.1-363.7,16.4-1452.8,118.5-1857.4c89.9-359.6,298.3-645.7,535.3-733.5c255.4-96,388.2-190,474.1-339.2c26.6-45,85.8-194.1,132.8-329c102.2-302.4,153.2-378,306.5-478.1c406.6-263.6,1430.3-265.6,1834.9-4.1c151.2,100.1,206.4,183.9,310.6,482.2c47,134.9,100.1,271.8,116.5,304.4c61.3,120.6,185.9,228.8,337.1,296.3c259.5,114.4,290.1,132.8,396.4,239.1c171.7,167.5,292.2,470,353.5,876.6c71.5,478.1,92,1440.5,36.8,1681.6c-122.6,529.2-347.4,933.8-737.6,1324.1c-255.4,255.4-453.6,396.4-756,541.5C5522.6,3280.4,5126.3,3349.8,4713.5,3296.7z M4147.5,244c175.7-36.8,296.3-104.2,347.4-190c53.1-89.9,79.7-322.9,55.2-490.4c-24.5-171.6-120.6-365.8-226.8-463.8c-114.4-102.2-310.6-192.1-457.7-206.4c-261.5-26.6-641.6,91.9-801,251.3c-114.4,114.4-155.3,214.6-165.5,408.7c-20.4,390.3,167.5,617.1,578.3,700.8C3614.2,280.8,4000.4,276.7,4147.5,244z M6542.3,233.8c382.1-98.1,537.4-302.4,517-682.5c-6.1-134.9-20.4-185.9-67.4-275.8c-104.2-190-331-318.8-647.7-369.8c-206.4-34.7-351.5-14.3-525.1,73.6c-314.6,157.3-467.9,482.2-412.8,874.5c24.5,181.9,59.3,245.2,167.6,308.5C5769.9,276.7,6237.8,311.4,6542.3,233.8z M5095.6-914.6c67.4-32.7,94-83.8,220.7-404.6c118.5-306.5,130.8-376,81.7-467.9c-42.9-83.8-128.7-112.4-306.5-98.1c-81.7,6.1-183.9,2-228.9-6.1c-165.5-38.8-333.1,69.5-333.1,214.6c0,67.4,143,470,226.8,637.5C4834-885.9,4950.5-843,5095.6-914.6z"/></g></g>
      </svg>
      {/*Penta Kills*/}
      <div>{this.props.stats && this.props.stats.pentaKills?(this.props.stats.pentaKills):(0)}</div>
      <div className="quadra-icon"></div>
      <svg title="Penta Kills" width="20px"className="skull-icon skull-icon-2" version="1.1" x="0px" y="0px" viewBox="0 0 1000 1000" enableBackground="new 0 0 1000 1000" >
      
      <g><g transform="translate(0.000000,511.000000) scale(0.100000,-0.100000)"><path style={{fill: this.props.teamData && this.props.teamData.dark}} d="M4713.5,3296.7c-322.8-40.9-754-212.5-1074.8-427c-200.2-134.9-598.7-533.3-729.5-731.5c-222.7-335.1-359.6-688.6-416.8-1066.6c-53.1-363.7,16.4-1452.8,118.5-1857.4c89.9-359.6,298.3-645.7,535.3-733.5c255.4-96,388.2-190,474.1-339.2c26.6-45,85.8-194.1,132.8-329c102.2-302.4,153.2-378,306.5-478.1c406.6-263.6,1430.3-265.6,1834.9-4.1c151.2,100.1,206.4,183.9,310.6,482.2c47,134.9,100.1,271.8,116.5,304.4c61.3,120.6,185.9,228.8,337.1,296.3c259.5,114.4,290.1,132.8,396.4,239.1c171.7,167.5,292.2,470,353.5,876.6c71.5,478.1,92,1440.5,36.8,1681.6c-122.6,529.2-347.4,933.8-737.6,1324.1c-255.4,255.4-453.6,396.4-756,541.5C5522.6,3280.4,5126.3,3349.8,4713.5,3296.7z M4147.5,244c175.7-36.8,296.3-104.2,347.4-190c53.1-89.9,79.7-322.9,55.2-490.4c-24.5-171.6-120.6-365.8-226.8-463.8c-114.4-102.2-310.6-192.1-457.7-206.4c-261.5-26.6-641.6,91.9-801,251.3c-114.4,114.4-155.3,214.6-165.5,408.7c-20.4,390.3,167.5,617.1,578.3,700.8C3614.2,280.8,4000.4,276.7,4147.5,244z M6542.3,233.8c382.1-98.1,537.4-302.4,517-682.5c-6.1-134.9-20.4-185.9-67.4-275.8c-104.2-190-331-318.8-647.7-369.8c-206.4-34.7-351.5-14.3-525.1,73.6c-314.6,157.3-467.9,482.2-412.8,874.5c24.5,181.9,59.3,245.2,167.6,308.5C5769.9,276.7,6237.8,311.4,6542.3,233.8z M5095.6-914.6c67.4-32.7,94-83.8,220.7-404.6c118.5-306.5,130.8-376,81.7-467.9c-42.9-83.8-128.7-112.4-306.5-98.1c-81.7,6.1-183.9,2-228.9-6.1c-165.5-38.8-333.1,69.5-333.1,214.6c0,67.4,143,470,226.8,637.5C4834-885.9,4950.5-843,5095.6-914.6z"/></g></g>
      </svg>
      {/*Quarda Kills*/}
      <div>{this.props.stats && this.props.stats.quadraKills?(this.props.stats.quadraKills):(0)}</div>
      <svg version="1.1" width="20px" x="0px" y="0px" viewBox="0 0 1000 1000" enableBackground="new 0 0 1000 1000">
      <g><path className="bronze-triple" d="M990,85.4L462.3,914.6L10,85.4H990z"/></g>
      </svg>
      <svg  width="20px"className="skull-icon skull-icon-3" version="1.1" x="0px" y="0px" viewBox="0 0 1000 1000" enableBackground="new 0 0 1000 1000" >
      
      <g><g transform="translate(0.000000,511.000000) scale(0.100000,-0.100000)"><path style={{fill: this.props.teamData && this.props.teamData.dark}}d="M4713.5,3296.7c-322.8-40.9-754-212.5-1074.8-427c-200.2-134.9-598.7-533.3-729.5-731.5c-222.7-335.1-359.6-688.6-416.8-1066.6c-53.1-363.7,16.4-1452.8,118.5-1857.4c89.9-359.6,298.3-645.7,535.3-733.5c255.4-96,388.2-190,474.1-339.2c26.6-45,85.8-194.1,132.8-329c102.2-302.4,153.2-378,306.5-478.1c406.6-263.6,1430.3-265.6,1834.9-4.1c151.2,100.1,206.4,183.9,310.6,482.2c47,134.9,100.1,271.8,116.5,304.4c61.3,120.6,185.9,228.8,337.1,296.3c259.5,114.4,290.1,132.8,396.4,239.1c171.7,167.5,292.2,470,353.5,876.6c71.5,478.1,92,1440.5,36.8,1681.6c-122.6,529.2-347.4,933.8-737.6,1324.1c-255.4,255.4-453.6,396.4-756,541.5C5522.6,3280.4,5126.3,3349.8,4713.5,3296.7z M4147.5,244c175.7-36.8,296.3-104.2,347.4-190c53.1-89.9,79.7-322.9,55.2-490.4c-24.5-171.6-120.6-365.8-226.8-463.8c-114.4-102.2-310.6-192.1-457.7-206.4c-261.5-26.6-641.6,91.9-801,251.3c-114.4,114.4-155.3,214.6-165.5,408.7c-20.4,390.3,167.5,617.1,578.3,700.8C3614.2,280.8,4000.4,276.7,4147.5,244z M6542.3,233.8c382.1-98.1,537.4-302.4,517-682.5c-6.1-134.9-20.4-185.9-67.4-275.8c-104.2-190-331-318.8-647.7-369.8c-206.4-34.7-351.5-14.3-525.1,73.6c-314.6,157.3-467.9,482.2-412.8,874.5c24.5,181.9,59.3,245.2,167.6,308.5C5769.9,276.7,6237.8,311.4,6542.3,233.8z M5095.6-914.6c67.4-32.7,94-83.8,220.7-404.6c118.5-306.5,130.8-376,81.7-467.9c-42.9-83.8-128.7-112.4-306.5-98.1c-81.7,6.1-183.9,2-228.9-6.1c-165.5-38.8-333.1,69.5-333.1,214.6c0,67.4,143,470,226.8,637.5C4834-885.9,4950.5-843,5095.6-914.6z"/></g></g>
      </svg>
      {/*Triple Kills*/}
      <div>{this.props.stats && this.props.stats.tripleKills?(this.props.stats.tripleKills):(0)}</div>
    </div>
  <div className='statsummary'>
    
	<div className='row'>
  <div className='col s4'>
    <div className='tip' data-placement='bottom' href='/' data-toggle='tooltip' > 
      {/* kills*/this.props.stats && this.props.stats.kills?(this.props.stats.kills.toFixed(2)):(0)}
      <span className="stats-rate">/5mins</span>
      <span className="stats-rank">{this.state.killsRank && this.props.stats && "#" + this.state.killsRank}</span>
      { this.state.killsRank && this.props.stats && <i className="material-icons">arrow_drop_up</i> }
      { this.state.killsRank && this.props.stats &&
      <span className='span-tip'>
        {this.props.eventData && this.props.stats && this.state.killsRank && ("Top " + Math.floor(this.state.killsRank / this.props.eventData.participants*100)+"% of participants")}
      </span>
      }<br/>
      <div className='progress-stats' style={{width: '100%'}}>
        <div className='progress-bar' role='progressbar' style={{backgroundColor: this.props.teamData && this.props.teamData.light, width: this.props.eventData &&this.props.stats&& this.state.killsRank?((100 - this.state.killsRank / this.props.eventData.participants*100)+"%"):(0)}} ></div>
      </div>
    </div>
    <span className='category'>Kills</span>
  </div>
	<div className='col s4'>
    <div className='tip' data-placement='bottom' href='#' data-toggle='tooltip' > 
      {/* deaths*/this.props.stats && this.props.stats.deaths?(this.props.stats.deaths.toFixed(2)):(0)}
      <span className="stats-rate">/5mins</span>
      <span className="stats-rank">{this.state.deathsRank && this.props.stats && "#" + this.state.deathsRank}</span>
      { this.state.deathsRank && this.props.stats &&<i className="material-icons">arrow_drop_up</i> }
      { this.state.deathsRank && this.props.stats &&
      <span className='span-tip'>
        {this.props.eventData && this.props.stats && this.state.deathsRank && ("Top " + Math.floor(this.state.deathsRank / this.props.eventData.participants*100)+"% of participants")}
      </span>
      }<br/>
      <div className='progress-stats' style={{width: '100%'}}>
        <div className='progress-bar' role='progressbar' style={{backgroundColor: this.props.teamData && this.props.teamData.light, width: this.props.eventData && this.props.stats && this.state.deathsRank?((100 - this.state.deathsRank / this.props.eventData.participants*100)+"%"):(0)}} ></div>
      </div>
    </div>
    <span className='category'>Deaths</span>
  </div>
	<div className='col s4'>
    <div className='tip' data-placement='bottom' href='#' data-toggle='tooltip' > 
      {/* assists*/this.props.stats && this.props.stats.assists?(this.props.stats.assists.toFixed(2)):(0)}
      <span className="stats-rate">/5mins</span>
      <span className="stats-rank">{this.state.assistsRank && this.props.stats && "#" + this.state.assistsRank}</span>
      { this.state.assistsRank && this.props.stats && <i className="material-icons">arrow_drop_up</i> }
      { this.state.assistsRank && this.props.stats &&
      <span className='span-tip'>
        {this.props.eventData && this.props.stats && this.state.assistsRank && ("Top " + Math.floor(this.state.assistsRank / this.props.eventData.participants*100)+"% of participants")}
      </span>
      }<br/>
      <div className='progress-stats' style={{width: '100%'}}>
        <div className='progress-bar' role='progressbar' style={{backgroundColor: this.props.teamData && this.props.teamData.light, width: this.props.eventData && this.props.stats && this.state.assistsRank?((100 - this.state.assistsRank / this.props.eventData.participants*100)+"%"):(0)}} ></div>
      </div>
    </div>
    <span className='category'>Assists</span>
  </div>
  </div>
	<div className='row'> 
  <div className='col s4'>
    <div className='tip' data-placement='bottom' href='#' data-toggle='tooltip' > 
      {/* damage*/this.props.stats && this.props.stats.damage?(this.props.stats.damage.toFixed(1)):(0)}
      <span className="stats-rate">/5mins</span>
      <span className="stats-rank">{this.state.damageRank && this.props.stats && "#" + this.state.damageRank}</span>
      { this.state.damageRank && this.props.stats && <i className="material-icons">arrow_drop_up</i> }
      { this.state.damageRank && this.props.stats &&
      <span className='span-tip'>
        {this.props.eventData && this.props.stats && this.state.damageRank && ("Top " + Math.floor(this.state.damageRank / this.props.eventData.participants*100)+"% of participants")}
      </span>
      }<br/>
      <div className='progress-stats' style={{width: '100%'}}>
        <div className='progress-bar' role='progressbar' style={{backgroundColor: this.props.teamData && this.props.teamData.light, width: this.props.eventData && this.props.stats && this.state.damageRank?((100 - this.state.damageRank / this.props.eventData.participants*100)+"%"):(0)}} ></div>
      </div>
    </div>
    <span className='category'>Damage</span>
  </div>
  <div className='col s4'>
    <div className='tip' data-placement='bottom' href='#' data-toggle='tooltip' > 
      {/* gold*/this.props.stats && this.props.stats.gold?(this.props.stats.gold.toFixed(1)):(0)}
      <span className="stats-rate">/5mins</span>
      <span className="stats-rank">{this.state.goldRank && this.props.stats && "#" + this.state.goldRank}</span>
      { this.state.goldRank && this.props.stats && <i className="material-icons">arrow_drop_up</i> }
      { this.state.goldRank && this.props.stats &&
      <span className='span-tip'>
        {this.props.eventData && this.props.stats&& this.state.goldRank && ("Top " + Math.floor(this.state.goldRank / this.props.eventData.participants*100)+"% of participants")}
      </span>
      }<br/>
      <div className='progress-stats' style={{width: '100%'}}>
        <div className='progress-bar' role='progressbar' style={{backgroundColor: this.props.teamData && this.props.teamData.light, width: this.props.eventData && this.props.stats && this.state.goldRank?((100 - this.state.goldRank / this.props.eventData.participants*100)+"%"):(0)}} ></div>
      </div>
    </div>
    <span className='category'>Gold</span>
  </div>
  <div className='col s4'>
    <div className='tip' data-placement='bottom' href='#' data-toggle='tooltip' > 
      {/* visionScore*/this.props.stats && this.props.stats.visionScore?(this.props.stats.visionScore.toFixed(1)):(0)}
      <span className="stats-rate">/5mins</span>
      <span className="stats-rank">{this.state.visionScoreRank && this.props.stats && "#" + this.state.visionScoreRank}</span>
      { this.state.visionScoreRank && this.props.stats && <i className="material-icons">arrow_drop_up</i> }
      { this.state.visionScoreRank && this.props.stats &&
      <span className='span-tip'>
        {this.props.eventData && this.props.stats&& this.state.visionScoreRank && ("Top " + Math.floor(this.state.visionScoreRank / this.props.eventData.participants*100)+"% of participants")}
      </span>
      }<br/>
      <div className='progress-stats' style={{width: '100%'}}>
        <div className='progress-bar' role='progressbar' style={{backgroundColor: this.props.teamData && this.props.teamData.light, width: this.props.eventData && this.props.stats && this.state.visionScoreRank?((100 - this.state.visionScoreRank / this.props.eventData.participants*100)+"%"):(0)}} ></div>
      </div>
    </div>
    <span className='category'>Vision Score</span>
  </div>
    </div>
    {/* <table>
        <thead>
          <tr>
              <th>CATEGORY</th>
              <th>AVERAGE</th>
              <th>RANK</th>
          </tr>
        </thead>

        <tbody>
          <tr>
            <td>Kills</td>
            <td>{this.props.stats && this.props.stats.kills.toFixed(2)}</td>
            <td>{this.state.killsRank && <b>{this.state.killsRank}</b>}</td>
          </tr>
          <tr>
            <td>Deaths</td>
            <td>{this.props.stats && this.props.stats.deaths.toFixed(2)}</td>
            <td>{this.state.deathsRank && <b>{this.state.deathsRank}</b>}</td>
          </tr>
          <tr>
            <td>Assists</td>
            <td>{this.props.stats && this.props.stats.assists.toFixed(2)}</td>
            <td>{this.state.assistsRank && <b>{this.state.assistsRank}</b>}</td>
          </tr>
          <tr>
            <td>Gold (per 10 mins)</td>
            <td>{this.props.stats && this.props.stats.gold.toFixed(1)}</td>
            <td>{this.state.goldRank && <b>{this.state.goldRank}</b>}</td>
          </tr>
          <tr>
            <td>CS (per 10 mins)</td>
            <td>{this.props.stats && this.props.stats.cs.toFixed(1) }</td>
            <td>{this.state.csRank && <b>{this.state.csRank}</b>}</td>
          </tr>
        </tbody>
      </table> */}

    </div>
    
    </div>
    )
    }
}

const mapStateToProps = (state, props) =>{
    return{
        stats: state.firebase.data && state.firebase.data.liveEvents && state.firebase.data.liveEvents[props.event] && state.firebase.data.liveEvents[props.event].stats && state.firebase.data.liveEvents[props.event].stats[props.id],
        eventData: state.firebase.data && state.firebase.data.eventData && state.firebase.data.eventData[props.event],
        teamData: state.firebase.data && state.firebase.data.teamData && state.firebase.data.teamData[props.team.split("-")[0]]
    
    }
}

export default compose(
    firebaseConnect((props)=>{
        return[
            {path: "/liveEvents/"+props.event+"/stats/"+props.id},
            {path: "/eventData/"+props.event},
            {path: "/teamData/"+props.team.split("-")[0]},
        ]
    }),
    connect(mapStateToProps)
)(ProfileStats);