import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import {createStore, applyMiddleware, compose} from "redux";
import {Provider} from "react-redux";
import rootReducer from "./components/store/reducers/rootReducer"
import thunk from "redux-thunk"
import {getFirebase, reactReduxFirebase} from "react-redux-firebase";
import FBConfig from "./components/config/FBconfig"
import  'firebase/database'


const store = createStore(rootReducer, 
    compose(
    applyMiddleware(thunk.withExtraArgument({getFirebase})),
    reactReduxFirebase(FBConfig, {userProfile:"users", attachAuthIsReady: true})
    )
);
store.firebaseAuthIsReady.then(()=>{
    ReactDOM.render(<Provider store={store}><App /></Provider>, document.getElementById('root'));
})
    


// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
