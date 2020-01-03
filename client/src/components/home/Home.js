import React, {Component} from "react"
import firebase from "firebase/app"

class Home extends Component{
state={
    meetBackgroundColor: "#d12027",
    meetBackgroundImage: "warhawks-big2.svg",
    meetShadow: "url('/images/meet-shadow.png')",
    width: "0%",
    isLoaded: false,
    isHide: false,
    articles: [],
    newsLoaded: 0,
    months: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]
}
componentDidMount(){
    firebase.database().ref("news").orderByChild("date").limitToLast(3).once("value").then(snap=>{
        snap.forEach(data => {
            this.setState({
                articles:[
                    ...this.state.articles,
                    {
                        title: data.val().title,
                        image: data.val().image,
                        text: data.val().text,
                        date: data.val().date,
                        id: data.key
                    }
                ],
                newsLoaded: this.state.newsLoaded + 1
            })
        });
    })
}
handleOutMeet = () =>{
    this.setState({
        width: 0,
        meetShadow: "url('/images/meet-shadow.png')"
    })
}
handleHoverMeet = (e) =>{
    const team = e.target.id;
    let color, image = "";
    switch (team){
        case "frostbite":
            color="#48dbfb";
            image="frostbite-big2.svg";
            break;
        case "wizard":
            color="#ff5c9e";
            image="wizard-big2.svg";
            break;
        case "warhawks":
            color="#d12027";
            image="warhawks-big2.svg";
            break;
        case "tempo":
            color="#202f3e";
            image="tempo-big2.svg"
            break;
        case "michief":
            color="#4eb748";
            image="michief-big2.svg"
            break;
        case "thunder":
            color="#1c1c1c";
            image="hydra-big.svg"
            break;
        case "eclipse":
            color="#ff9f1a";
            image="elipse-big2.svg"
            break;
        case "honor":
            color="#eee";
            image="honor-big.svg"
            break;
        default:
            color="black"
            break;
    }
    this.setState({
        meetBackgroundImage: image
    })
    this.setState({
        meetShadow: "url('/images/meet-shadow-none.png')",
        meetBackgroundColor: color, 
        width: "100%",
    })
    setTimeout(()=>{this.handleOutMeet()}, 350);
}


render(){
const title = this.state.articles.length > 1 && this.state.articles[this.state.articles.length-1].title
const img = this.state.articles.length > 1 && this.state.articles[this.state.articles.length-1].image
const subtitle = this.state.articles.length > 1 && this.state.articles[this.state.articles.length-1].text.substring(0, 125) + "..."
const id = this.state.articles.length > 1 && this.state.articles[this.state.articles.length-1].id
return(
<div className="Home">
{
    /*loader*/
    
    <div className="loader-2020" id={this.state.isLoaded?("hide-loader2"):(null)} >
        <div className="progress-wrapper"id={this.state.isLoaded?("hide-loader1"):(null)}>
        <img alt="2020 Logo" src="./images/2020logo.png" width="280px"/>
        <i className="progress"></i>
        </div>
        
    </div>
}
{/*Preload Imasges*/}
<div className="preload-images">
<img alt="meh" src="/images/frostbite-big2.svg"/>
<img alt="meh" src="/images/wizard-big2.svg"/>
<img alt="meh" src="/images/warhawks-big2.svg"/>
<img alt="meh" src="/images/tempo-big2.svg"/>
<img alt="meh" src="/images/michief-big2.svg"/>
<img alt="meh" src="/images/thunder-big2.svg"/>
<img alt="meh" src="/images/elipse-big2.svg"/>
<img alt="meh" src="/images/honor-big2.svg" onLoad={()=>{this.setState({isLoaded: true})}}/>
</div>
{/* Video Background */}
{/* 
<div className="home-main center">
    <div className="container">
    <div className="row">
    <div className="col s12">

    <div className="main-2020-words" >
    <div className="main-2020-words-logo" id={this.state.isLoaded?("main-2020-words-logo-animation"):(null)}></div>
    <div className="main-2020-words-ontario-highschool-wrapper">
        <div className="main-2020-words-ontario" id={this.state.isLoaded?("main-2020-words-ontario-animation"):(null)}>ONTARIO</div>
        <div className="main-2020-words-highschool" id={this.state.isLoaded?("main-2020-words-highschool-animation"):(null)}>HIGH SCHOOL</div>
    </div>
    <div className="main-2020-words-championships" id={this.state.isLoaded?("main-2020-words-championships-animation"):(null)}>CHAMPIONSHIPS</div>
    <div className={this.state.isLoaded?("main-2020-words-bottom"):(null)}>
        <div className="main-2020-registration">REGISTRATION ENDS: January 18</div>
        <div className="main-2020-icons-wrapper">
            <div className="main-2020-icon" id="tempo"></div>
            <div className="main-2020-icon" id="michief"></div>
            <div className="main-2020-icon" id="warhawks"></div>
            <div className="main-2020-icon" id="honor"></div>
            <div className="main-2020-icon" id="thunder"></div>
            <div className="main-2020-icon" id="eclipse"></div>
            <div className="main-2020-icon" id="wizard"></div>
            <div className="main-2020-icon" id="frostbite"></div>
        </div>
        <div className="main-2020-buttons">
            <a href="/events/2020"><div className="main-2020-learn">JOIN NOW</div></a>
            <a rel="noopener noreferrer" target="_blank" href="https://www.youtube.com/watch?v=53L8eBZGt5I&feature=youtu.be"><div className="main-2020-trailer">WATCH TRAILER</div></a>
        </div>
        <div className="main-2020-video">
        <iframe onLoad={()=>{this.setState({isLoaded: true})}} title="teaster" id="main-video" src="https://www.youtube.com/embed/53L8eBZGt5I?autoplay=1&playlist=53L8eBZGt5I&loop=1&controls=0&rel=0&vq=240&mute=1&modestbranding=1&autohide=1" frameBorder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>
        </div>
    </div>
    </div>

    </div>
    </div>
    </div>
    <div className="home-tibbers" id={this.state.isLoaded?("home-tibbers-animation"):(null)}></div>
</div> */}

{/* Latest News Article*/}
<div id="myCarousel" className="carousel slide" data-ride="carousel">
    <div className="carousel-wrapper">
    
    <div className="container">
    <div className="row">
    <a href={"/news/"+id}>
        <div className="carousel-caption">
          <h2>{title}</h2>
          <div className="outer"><div className="inner"></div></div>
          <p>{subtitle}</p>
        </div>
    </a>
    </div>
    </div>
    </div>
    <img alt="news-banner" src={"./images/news/"+img} className="news-banner-image"/>
    <img alt="banner-shadow" src="./images/bannerShadow.png"  id="bannershad" />
</div>
<div className="home-banner">
    <div className="container">
        <div className="row">
            <div className="col s12 m2"></div>
            <div className="col s12 m4 center">
                <img alt="2020 logo"width="190px" src="/images/2020logo.png" />
            </div>
            <div className="col s12 m4 center">
                <div className="registerButton" id="frontRegister" >
                <div className="registerButtoninner">
                <a href="/events/2020">REGISTER NOW</a>
                </div>
                </div>
                <br/>
                Closes January 18
            </div>
            <div className="col s12 m2"></div>
        </div>
    </div>
</div>
<div className="home-news-row">
    
    <div className="container">
        <a href="news">
        <div className="more-news">
            More News >
        </div>
        </a>
        <div className="row">
            {
                this.state.newsLoaded === 3 && this.state.articles.reverse().map(data=>{
                    return(
                        <div key={data.id} className="col s12 m4">
                        <a href={"news/"+data.id}>
                        <div className="news-tile">
                        <div className="news-tile-date">{ this.state.months[(new Date(data.date).getMonth())]+" "+ new Date(data.date).getDate()}</div>
                        <img alt={data.title} width="100%" src={"/images/news/"+data.image}/>
                        <div className="hover-bar">
                            <div className="inner"></div>
                        </div>
                        <h1>{data.title}</h1>
                        </div>
                        </a>
                        </div>
                    )
                })
            }
        </div>
    </div>
</div>

<div className="container">

{/* Welcome To The League*/}
<div className="row">
<div className="col s12 m6">
    <h1>WELCOME TO THE LEAGUE</h1>
    <p>Ontario's League of Associated Esports was designed to celebrate top talent from eastern Canada, 
        providing a professional collegiate platform to showcase the best of amateur esports 
        from across the province. Our goal is to host a unique experience to help introduce, celebrate, and distinguish tomorrow's 
        superstars, available to all with a passion for the game.</p>
</div>
<div className="col s12 m6 center welcome-right">
    <img alt="Mischief" className="welcome-image responsive-img" src="/images/OLAE1.svg" width="300px;"/>
</div>
</div>
</div>
{/*Meet the teams*/}
<div className="meet-teams" style={{backgroundColor: this.state.meetBackgroundColor}}>
    <div className="meet-teams-back"  style={{backgroundColor: this.state.meetBackgroundColor, width: this.state.width}}></div>
    <div className="meet-teams-shadow"  style={{backgroundImage: this.state.meetShadow}}></div>
<div className="meet-teams-top">
<h1 className="white-text center" style={{marginTop: "15px"}}>MEET THE TEAMS</h1>
<p className="center white-text " style={{marginTop: "-30px", fontSize: "18px"}}>Click on icons to see</p>
<div className="container">
<div className="row">
<div className="col s12 l7 center ">
    <div className="meet-left">
    <img  alt="Meet Team Big" className="meet-image responsive-img" src={"/images/"+this.state.meetBackgroundImage} />
    </div>
</div>
<div className="col s12 l5 center">
    <div className="meet-right">
    <div className="row">
        <div className="col s3 center"><div className="team-icon-meet" id="frostbite" onClick={this.handleHoverMeet} ></div></div>
        <div className="col s3 center"><div className="team-icon-meet" id="wizard" onClick={this.handleHoverMeet} ></div></div>
        <div className="col s3 center"><div className="team-icon-meet" id="warhawks" onClick={this.handleHoverMeet}></div></div>
        <div className="col s3 center"><div className="team-icon-meet" id="tempo" onClick={this.handleHoverMeet}></div></div>
    </div>
    <div className="row">
        <div className="col s3 center"><div className="team-icon-meet" id="michief" onClick={this.handleHoverMeet} ></div></div>
        <div className="col s3 center"><div className="team-icon-meet" id="thunder" onClick={this.handleHoverMeet} ></div></div>
        <div className="col s3 center"><div className="team-icon-meet" id="eclipse" onClick={this.handleHoverMeet} ></div></div>
        <div className="col s3 center"><div className="team-icon-meet" id="honor" onClick={this.handleHoverMeet} ></div></div>
    </div>
    </div>
</div>
</div>
</div>
</div>
</div>
{/*How to apply*/ }
<div className="container">
<div className="row">
<div className="col s12 m5">    
    <h1>HOW IT WORKS</h1>
    <div className="number-list-apply">1</div><p className="word-list-apply"><a href="/events/2020">Apply</a> By The Deadline</p>
    <div className="number-list-apply">2</div><p className="word-list-apply">Join Clubs & Compete</p>
    <div className="number-list-apply">3</div><p className="word-list-apply">Qualify for Provincials</p>
</div>
<div className="col s12 m7 center">
    <h1>2019-2020 DATES</h1>
    <div className="row">
    <div className="col s12 m6">
        <h2>Pre-season</h2>
        <h3>November 23rd</h3>
        <br/>
        <h2>Season Starts</h2>
        <h3>February 14th</h3>
        <br/>
        
    </div>
    <div className="col s12 m6">
        
        <h2>Registration Ends</h2>
        <h3>January 18th</h3>
        <br/>
        <h2>Provincials</h2>
        <h3>TBD</h3>
    </div>
    </div>
</div>
</div>
</div>


</div>
)
}
}
export default Home