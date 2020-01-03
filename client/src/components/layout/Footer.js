import React, {Component} from "react"

class Footer extends Component{
render(){
return(
<div className="footer">
    <br/><br/><br/>
    <img alt="2020 Logo" src="/images/2020logo.png" width="200px"/>
    <div className="social-media-footer-wrapper">
        <a rel="noopener noreferrer"  target="_blank" href="https://www.instagram.com/olae.ca/"><img alt="Instagram" src="/images/instagram.png" width="50px"/></a>
        <a rel="noopener noreferrer" target="_blank" href="https://www.facebook.com/Ontario-League-of-Associated-Esports-114362153262252/"><img  alt="Facebook" src="/images/facebook.png" width="55px"/></a>
        <a rel="noopener noreferrer"  target="_blank" href="https://www.youtube.com/channel/UC0Lg2uuywdRmtJJmdD9hJZA?view_as=subscriber"><img alt="YouTube" src="/images/youtube.png" width="45px"/></a>
    </div>
    <p>info@olae.ca</p>
    <br/><br/>
    <div className="footer-end">
        ©OLAE 2020 Website by Bryan Ling
    </div>           
</div>
)
        
}
}

export default Footer