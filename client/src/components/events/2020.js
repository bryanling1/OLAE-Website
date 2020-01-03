import React, {Component} from "react"

class TwentyTwenty extends Component{
state={
    isLoaded: false
}
render(){
return(
<div className="twentytwenty">
{
    /*loader*/
    
    <div className="loader-2020" id={this.state.isLoaded?("hide-loader2"):(null)} >
        <div className="progress-wrapper"id={this.state.isLoaded?("hide-loader1"):(null)}>
        <img alt="2020-logo" src="/images/2020logo.png" width="280px"/>
        <i class="progress"></i>
        </div>
        
    </div>
}
<div className="signup-main">
    <div className="center-wrapper">
    <img alt="2020 olae logo" src="/images/2020logo.png" width="100%"/>
    <div className="students-and-teachers">Students & Teachers: </div>
    <a href="https://forms.gle/u1HCb3h1svy4ka7i8"><div className="register-button">REGISTER</div></a>
    <a rel="noopener noreferrer" href="https://www.youtube.com/watch?v=C9KK5C-3-rI&feature=youtu.be" target="_blank"><div className="watch-info-button">WATCH INFO VIDEO</div></a>
    <a href="#faq" className="faq">Read FAQ</a>
    </div>
</div>
<div className="how-it-works">
<div className="container">
    <div className="row">
        <div className="col s12">
        <br/><br/>
        <img alt="3-stages" src="/images/3-stages.png" width="100%" style={{maxWidth:"700px", display:"block", margin:"auto"}}/>
        </div>
    </div>
    <div className="row">
        <div className="col s12">
        <h1 className="how-it-works-title">HOW IT WORKS</h1>
        <ol className="how-it-works-list">
            <li>Students and Teachers join our <span className="font-bold">Captain's Committee</span></li>
            <li>Captains Run <span className="font-bold">School Clubs</span> with our Startup Package</li>
            <li>Club Teams compete once a week in our <span className="font-bold">Online Tournament</span></li>
            <li>Top players will be Selected to join <span className="font-bold">Provincial Teams</span></li>
        </ol>
        </div>
    </div>
</div>
</div>
<div className="captains-committee">
    <div className="container">
        <div className="row">
            <div className="col s5" style={{position: "relative"}}>
            <img alt="toronto-academy" className="toronto-academy" src="/images/toronto academy.png" width="160px" style={{position: "absolute", right: "-60px", top: "75px",zIndex: 2}}/>
            <img alt="captains-committee" className="captains-committee-mobile" src="/images/Captains-Committee-mobile.png" height="700px" style={{zIndex: 1, position: "relative", left:"-100px"}}/>
            
            </div>
            <div className="black-backing"></div>
            <div className="col s7">
                <br/><br/>
                <img className="cclogo"src="/images/CCLogo.svg" alt="CCLogo" width="370px" style={{margin: "auto", display:"block"}}/>
                <br/>
                <div className="cc-desktop-text">
                    <h1>WHY JOIN?</h1>
                    <ol>
                        <li>Fast setup with our <span className="cc-bold">Startup Package</span></li>
                        <li><span className="cc-bold">Free Leadership Opportunity</span> for Resume and University Applications</li>
                        <li><span className="cc-bold">No Prior Experience</span> with League of Legends necessary</li>
                        <li>Time Commitment: <span className="cc-bold">1 Hour Each Week</span></li>
                        <li>Average Club Size: ~40 Students</li>
                    </ol>
                </div>
            </div>
        </div>
        <div className="row">
        <div className="cc-mobile-text">
                    <br/>
                    <h1>WHY JOIN?</h1>
                    <ol>
                        <li>Fast setup with our <span className="cc-bold">Startup Package</span></li>
                        <li><span className="cc-bold">Free Leadership Opportunity</span> for Resume and University Applications</li>
                        <li><span className="cc-bold">No Prior Experience</span> with League of Legends necessary</li>
                        <li>Time Commitment: <span className="cc-bold">1 Hour Each Week</span></li>
                        <li>Average Club Size: ~40 Students</li>
                    </ol>
                    <br/>
                </div>
        </div>
    </div>
</div>
<div className="startup-package">
    <div className="container">
        <div className="row">
            <div className="col s12">
            <h1>THE STARTUP PACKAGE</h1>
            </div>
        </div>
        <div className="row">
            <div className="col s12 m1 l2"></div>
            <div className="col s12 m5 l4">
                <p>1. A Club Proposal</p>
                <p>2. Permission Forms</p>
            </div>
            <div className="col s12 m5 l4">
                <p>3. Posters, Announcements</p>
                <p>4. Step by step slideshows</p>
            </div>
            <div className="col s12 m1 l2"></div>
        </div>
        <div className="row">
            <div className="col s12">
                <img alt="startup package" src="/images/startup.png"/>
            </div>
        </div>
    </div>
</div>
 <div className="provincials" style={{position: "relative"}}>
     <div className="container">
         <div className="row">
             <div className="col s11 m7">
                <div className="provincials-text">
                <h1>PROVINCIALS <img alt="2020 Logo" src="/images/2020logo.png"/></h1>
                <p>Select students and teams will be invited to play for our <span className="cc-bold">8 Provincial Teams</span>, representing cities across the province. </p>
                <p>Decisions will be made based on:</p>
                <ol>
                    <li>Talent</li>
                    <li>Team Play</li>
                    <li>Leadership</li>
                    <li>Dedication to the Sport</li>
                </ol>
                </div>
             </div>
            <div className="col s1 m5" >
                <img alt="Provincials Recruit" onLoad={()=>{this.setState({isLoaded: true})}}src="/images/recruit.png" height="700px" style={{position: "relative", zIndex: 2}} />
                
            </div>
         </div>
     </div>
     <div className="black-back"></div>
     <div  id="faq"></div>
 </div>

<div className="faq-main" >
    <div className="container">
        <div className="row">
            <div className="col s12">
                <h1 >FAQ</h1>
            </div>
        </div>
        <div className="row" >
            <div className="col s12 m6">
                <p>What is OLAE?</p>
                <p>The Ontario League of Associated Esports provides a free and professional online
                esports experience in the academic environment, partnering with high school student leaders 
                and teachers to setup esports clubs in the academic environment. Our services include online tournaments, club branding,  
                 and full live coverage of tournament events on our website.</p>
            </div>
            <div className="col s12 m6">
                <p>How is OLAE run without violating any school policies, and what activities occur during school clubs?</p>
                <p>Our program provides slideshows, vidoes, and other resources for club captains to run during in-school meetings. 
                    That being said, no video game playing occurs during school hours, and we strictly monitor online activities
                    with teacher supervisors from each school. </p>
            </div>
        </div>
        <div className="row">
            <div className="col s12 m6">
                <p>I am a student who wants to start a club at my school. How do I get started?</p>
                <p>First, complete a short application form at the top of page.  From there, the OLAE lead team 
                    will establish a communication with you through social media or email. We will then give you 
                    further instructions as we run you through our online <b>Startup Package. </b></p>
            </div>
            <div className="col s12 m6">
                <p> I want to participate in OLAE, but don’t want to run a club at my school. What are my options?</p>
                <p>We understand that this leadership opportunity is not for everyone. 
                    Because our philosophy follows the collegiate esports mentality, you will not 
                    be able to participate. Your best option is to <b>refer other students or teachers </b>
                    from your school to sign up. It only takes 1 student and 1 teacher to get started. 
</p>
            </div>
        </div>
        <div className="row">
            <div className="col s12 s6">
                <p>How will I know people will be interested in the club?</p>
                <p>From our experience with running seasons in the past, 
                    on average high school clubs generate around 30-40 students.
                     As long as you follow our simple procedure using the startup package,
                      you should find enough players to form teams, especially students you may not know! </p>
            </div>
            <div className="col s12 s6">
                <p></p>
                <p></p>
            </div>
        </div>
    </div>
</div>
<div className="the-vision">
    <div className="container">
        <div className="row">
            <div className="col s12">
                <h1>THE VISION</h1>
                <p>As the development of esports progresses, <b>OLAE</b> hopes to set a president 
                    by establishing gaming in early academia, providing a unique platform 
                    allowing Canadian amateurs to further discover their passions, meet others
                     with similar interests, and to provide a premier <b>Path to Pro.</b></p>
                <img alt="LOL cat thing" src="/images/cat-thing.png"/>
            </div>
        </div>
    </div>
</div>

</div>
)
}
}

export default TwentyTwenty