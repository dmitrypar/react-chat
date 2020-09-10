import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';
import 'firebase/storage';




  //  web app's Firebase configuration
  const firebaseConfig = {
    apiKey: "AIzaSyB9PwfkkN0k1P728YX40EP1J7gXxzrJSrM",
    authDomain: "react-chat-1008.firebaseapp.com",
    databaseURL: "https://react-chat-1008.firebaseio.com",
    projectId: "react-chat-1008",
    storageBucket: "react-chat-1008.appspot.com",
    messagingSenderId: "433281177047",
    appId: "1:433281177047:web:23f440ba6442cd260ee792",
    measurementId: "G-GLHVDZBQL5"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  //firebase.analytics();

  export default firebase ;