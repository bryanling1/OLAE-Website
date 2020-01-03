import firebase from "firebase/app"
import "firebase/firestore";
import "firebase/auth"
  // Initialize Firebase
  var config = {
    apiKey: "AIzaSyCGsKsCmcbwWtl7FIPkwv6Hc9PGwQxJggs",
    authDomain: "olae-d3d90.firebaseapp.com",
    databaseURL: "https://olae-d3d90.firebaseio.com",
    projectId: "olae-d3d90",
    storageBucket: "olae-d3d90.appspot.com",
    messagingSenderId: "65901038805"
  };
  firebase.initializeApp(config);
  export default firebase;