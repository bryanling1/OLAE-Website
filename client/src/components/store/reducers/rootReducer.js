import {combineReducers} from "redux";
import {firebaseReducer} from "react-redux-firebase";
import adminReducer from "./adminReducer";
const rootReducer = combineReducers({
    firebase: firebaseReducer,
    adminActions: adminReducer
});
export default rootReducer