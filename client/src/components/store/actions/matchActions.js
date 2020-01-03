export const offlineuser = (data) =>{
    return(dispatch, getState, {getFirebase}) =>{
        const firebase = getFirebase();
        var ref = firebase.database().ref("teams/"+getState().firebase.profile.team+"/"+getState().firebase.auth.uid+"/status");
        ref.onDisconnect().set("offline")
    }
}

export const onlineuser = (data) =>{
    return(dispatch, getState, {getFirebase}) =>{
        const firebase = getFirebase();
        var ref = firebase.database().ref("teams/"+getState().firebase.profile.team+"/"+getState().firebase.auth.uid+"/status");
        ref.set("online")
    }
}