export const login = (data) =>{
    return(dispatch, getState, {getFirestore, getFirebase} ) =>{
        const firebase = getFirebase();
        firebase.auth().signInWithEmailAndPassword(
            data.email,
            data.password
        ).then(()=>{
            dispatch({type: "LOGIN_SUCCESS"});
        }).catch((err)=>{
            dispatch({type: "LOGIN_FAILURE", err})
        })
        
    }
}

export const signOut = (data) =>{
    return(dispatch, getState, {getFirestore, getFirebase} ) =>{
        const firebase = getFirebase();
        firebase.auth().signOut()
    }
}