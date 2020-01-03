import React, {Component} from "react"
import InstagramEmbed from 'react-instagram-embed';

class TwentyNineTeen extends Component{
state={
    isLoaded: false
}
render(){
return(
<div className="twenty-nine-teen-wrapper">
{
    /*loader*/
    
    <div className="loader-2020" id={this.state.isLoaded?("hide-loader2"):(null)} >
        <div className="progress-wrapper"id={this.state.isLoaded?("hide-loader1"):(null)}>
        <img alt="2020 Logo" src="/images/2020logo.png" width="280px"/>
        <i class="progress"></i>
        </div>
        
    </div>
}
<div className="twenty-nine-teen" >
    <div className="container">
        <div className="row">
            <div className="col s12">
                <img alt="2019 Champs"src="/images/2019champs.svg" width="100%"/>
            </div>
        </div>
        <div className="row">
            <div className="col s12 m6">
            <a href="/profile/A9CEGcaXqPbSrgpWZ9RmsBJb7JC2" style={{textDecoration: "none"}}>
            <div class="profile-player honor-border">
                <div class="profile-player-pic" style={{backgroundImage: "url('/images/honor-icon1.png')"}}></div>
                <div class="profile-player-name"><h1>Hectic</h1><p>Edward Ju</p>
                </div></div>
                </a>
            </div>
            <div className="col s12 m6">
            <a href="/profile/A9CEGcaXqPbSrgpWZ9RmsBJb7JC2" style={{textDecoration: "none"}}>
            <div class="profile-player honor-border">
                <div class="profile-player-pic" style={{backgroundImage: "url('/images/honor-icon1.png')"}}></div>
                <div class="profile-player-name"><h1>i3imbi</h1><p>Sangar Sivasubramaniam</p>
                </div></div>
                </a>
            </div>
            <div className="col s12 m6">
            <a href="/profile/A9CEGcaXqPbSrgpWZ9RmsBJb7JC2" style={{textDecoration: "none"}}>
            <div class="profile-player honor-border">
                <div class="profile-player-pic" style={{backgroundImage: "url('/images/honor-icon1.png')"}}></div>
                <div class="profile-player-name"><h1>aquanthony</h1><p>Anthony Shen</p>
                </div></div>
                </a>
            </div>
            <div className="col s12 m6">
            <a href="/profile/A9CEGcaXqPbSrgpWZ9RmsBJb7JC2" style={{textDecoration: "none"}}>
            <div class="profile-player honor-border">
                <div class="profile-player-pic" style={{backgroundImage: "url('/images/honor-icon1.png')"}}></div>
                <div class="profile-player-name"><h1>Asol</h1><p>Markos Georghiades</p>
                </div></div>
                </a>
            </div>
            <div className="col s12 m6">
            <a href="/profile/A9CEGcaXqPbSrgpWZ9RmsBJb7JC2" style={{textDecoration: "none"}}>
            <div class="profile-player honor-border">
                <div class="profile-player-pic" style={{backgroundImage: "url('/images/honor-icon1.png')"}}></div>
                <div class="profile-player-name"><h1>Dopa</h1><p>Vlad Comsa</p>
                </div></div>
                </a>
            </div>
            <div className="col s12 m6">
            <a href="/profile/A9CEGcaXqPbSrgpWZ9RmsBJb7JC2" style={{textDecoration: "none"}}>
            <div class="profile-player honor-border">
                <div class="profile-player-pic" style={{backgroundImage: "url('/images/honor-icon1.png')"}}></div>
                <div class="profile-player-name"><h1>Aditya Moon</h1><p>Aditya Peetush</p>
                </div></div>
                </a>
            </div>
        </div>
    </div>
    <div className="confetti-back"></div>
</div>
<div className="recap-map">
    <div className="container">
        <div className="row">
            <div className="col s12 m6">
                <img alt="2019 Map" src="/images/2019map.png" width="100%" onLoad={()=>{this.setState({isLoaded: true})}}/>
            </div>
            <div className="col s12 m6">
                <div className="recap-text">
                <h1>2019 RECAP</h1>
                <p>Applicants were selected from a pool of high school students in the <b>Waterloo Region</b>, with additional participants coming from elsewhere in the GTA. 
                       Clubs had been previously established at Waterloo Collegiate, SJAM, and Waterloo Oxford</p>
                </div>
            </div>
        </div>
    </div>
</div>
<div className="instagram-2019-section">
    <div className="container">
        <div className="row">
            <div className="col s12 m6">
                <h1>THE FORMAT</h1>
                <p>Applicants were placed on 7 of OLAE's <b>Provincial Teams</b>. 
                    They played in an online environment once a week during the regular season,
                     as a round-robin format was used to determine team seedings for playoffs.</p>
            </div>
            <div className="col s12 m6">
                <div className="instagram-roster">
                <InstagramEmbed
                url='https://www.instagram.com/p/Bv5Mw_gnxn-/'
                maxWidth={320}
                hideCaption={true}
                containerTagName='div'
                protocol=''
                injectScript
                onLoading={() => {}}
                onSuccess={() => {}}
                onAfterRender={() => {}}
                onFailure={() => {}}/>
                </div>
            </div>
        </div>
    </div>
</div>

<div className="instagram-2019-section">
    <div className="container">
        <div className="row">
            <div className="col s12 m6">
                    <div className="instagram-roster">
                    <InstagramEmbed
                    url='https://www.instagram.com/p/BxJFabthLlC/'
                    maxWidth={320}
                    hideCaption={true}
                    containerTagName='div'
                    protocol=''
                    injectScript
                    onLoading={() => {}}
                    onSuccess={() => {}}
                    onAfterRender={() => {}}
                    onFailure={() => {}}/>
                    </div>
            </div>
            <div className="col s12 m6">
                <h1>THE REGULAR SEASON</h1>
                <p>From April 6 to May 19, it was evident that the <b>Hamilton Warhawks</b> and <b>Burlington 
                    Frostbite</b> were establishing dominance in the league, with both teams almost destined
                    to meet one another in the grand-finals, having only lost 1 match each. </p>
            </div>
            
        </div>
    </div>
</div>

<div className="instagram-2019-section">
    <div className="container">
        <div className="row">
            <div className="col s12 m6">
                <h1>PLAYOFFS BEGIN</h1>
                <p>After the first round of playoffs, the <b>Ottawa Honor</b> upset 
                the <b>Burlington Frostbite</b> in a 2 match thriller, while the Warhawks 
                trampled over the 4th seed Hydra during the semi-final matchups.</p>
            </div>
            <div className="col s12 m6">
                    <div className="instagram-roster">
                    <InstagramEmbed
                    url='https://www.instagram.com/p/BygdrG0pNDO/'
                    maxWidth={320}
                    hideCaption={true}
                    containerTagName='div'
                    protocol=''
                    injectScript
                    onLoading={() => {}}
                    onSuccess={() => {}}
                    onAfterRender={() => {}}
                    onFailure={() => {}}/>
                    </div>
            </div>
            
            
        </div>
    </div>
</div>

<div className="instagram-2019-section instagram-2019-section-last">
    <div className="container">
        <div className="row">
            <div className="col s12">
                <h1>THE TITLE</h1>
                <p>The Championship was decided after the <b>Ottawa Honor</b> reverse 
                swept Hamilton 2-1 in a back and forth, highlighted-filled battle, 
                claiming the 2019 OLAE Title. </p>
            </div>
            <div className="col s12">
                    <div className="instagram-roster">
                        
                    <InstagramEmbed
                    
                    url='https://www.instagram.com/p/BzUQvzFHGsk/'
                    maxWidth={320}
                    hideCaption={true}
                    containerTagName='div'
                    protocol=''
                    injectScript
                    onLoading={() => {}}
                    onSuccess={() => {}}
                    onAfterRender={() => {}}
                    onFailure={() => {}}/>
                    </div>
            </div>
            
            
        </div>
    </div>
</div>
</div>

)
}
}
export default TwentyNineTeen