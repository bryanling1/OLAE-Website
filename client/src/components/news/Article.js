import React, {Component} from "react"
import firebase from "firebase/app"

class Article extends Component{
    state = {
        title: null,
        date: null
    }
    componentDidMount(){
        firebase.database().ref("news/"+this.props.match.params.id).once("value").then(data=>{
            this.setState({
                title: data.val().title,
                author: data.val().author,
                image: data.val().image,
                text: data.val().text,
                date: data.val().date.split("-")[1] +"/"+ data.val().date.split("-")[2] +"/" +  data.val().date.split("-")[0]  
            })
        })
    }
    render(){
    return(
    <div className="article">
    <div className="container">
    <div className="row">
        <div className="col s12">
        <h1>{this.state.title}</h1>
        <h2> <i className="material-icons">access_time</i>{this.state.date} <span className="author">By {this.state.author}</span></h2>
        </div>
    </div>
    <div className="row">
        <div className="col s12">
            <img alt={this.state.image} className="responsive-img" src={"/images/news/"+this.state.image}/>
            <p dangerouslySetInnerHTML={{ __html: this.state.text}} ></p>
        </div>
    </div>
    </div>
    </div>
    )
    }
}
export default Article