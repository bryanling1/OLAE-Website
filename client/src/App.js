import React, { Component } from 'react';
import {BrowserRouter, Route, Switch} from "react-router-dom";
import Home from "./components/home/Home";
import Nav from "./components/layout/Nav";
import Footer from "./components/layout/Footer"
import Login from "./components/login/Login";
import AdminDash from "./components/admin/AdminDash"
import Profile from "./components/profile/Profile"
import TwentyTwenty from "./components/events/2020"
import TwentyNineTeen from "./components/events/2019"
import Teachers from "./components/captains/Teachers"
import Article from "./components/news/Article"
import Schedule from "./components/schedule/Schedule"
import Event from "./components/events/Event"
import Standings from "./components/standings/Standings"
import Stats from "./components/stats/Stats"
import News from "./components/news/News"
import Team from "./components/teams/Team"

class App extends Component {
render(){
return (
<div>
<BrowserRouter>
<div className="App">
<Nav/>
<Switch>
<Route path="/login" component={Login} exact={true}/>
<Route path="/admindash" component={AdminDash} exact={true}/>
<Route path="/schedule/:event" component={Schedule} exact={true}/>
<Route path="/schedule" component={Schedule} exact={true}/>
<Route path="/events/2020" component={TwentyTwenty} exact={true}/>
<Route path="/events/2019" component={TwentyNineTeen} exact={true}/>
<Route path="/captains/supervisors" component={Teachers} exact={true}/>
<Route path="/profile/:id" component={Profile}/>
<Route path="/news/:id" component={Article}/>
<Route path="/news" component={News}/>
<Route path="/events/:event" component={Event} exact={true}/>
<Route path="/events/:event/teams/:team" component={Team} exact={true}/>
<Route path="/stats/:event" component={Stats}/>
<Route path="/standings/:event" component={Standings}/>
<Route path="/" component={Home} exact={true}/>
</Switch>
</div>

</BrowserRouter>
<span id="demo" style={{display: "none"}}></span>
<Footer/>
</div>
);
}
}
export default App;
