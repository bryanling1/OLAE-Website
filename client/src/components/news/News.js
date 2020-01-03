import React, {Component} from "react"
import firebase from "firebase/app"

class News extends Component{
    state={
        articles: [],
        isLoaded: false,
        articles_n: null,
        articles_loaded: 0,
        months: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]
    }
    componentDidMount(){
        firebase.database().ref("news").orderByChild("date").once("value").then(snap=>{
            this.setState({articles_n: snap.numChildren()})
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
                    articles_loaded: this.state.articles_loaded + 1
                })
            });
        })
    }
    render(){

    return(
    <div className="news">
        <div className="container">
            <div className="row">
                <h1 className="title">NEWS</h1>
            </div>
        </div>
    <div className="home-news-row">
    <div className="container">
        <div className="row">
            {
                this.state.articles_n !== this.state.articles_loaded &&
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
                this.state.articles_n === this.state.articles_loaded && this.state.articles.reverse().map((data, i)=>{
                    return(
                        <div key={i} className="col s12 m4">
                        <a href={"news/"+data.id}>
                        <div className="news-tile">
                        <div className="news-tile-date">{ this.state.months[(new Date(data.date).getMonth())]+" "+ new Date(data.date).getDate()}</div>
                        <img alt={data.image} width="100%" src={"/images/news/"+data.image}/>
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
    </div>
    )
    }
}
export default News