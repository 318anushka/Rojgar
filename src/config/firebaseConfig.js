import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

var firebaseConfig = {
    apiKey: "AIzaSyAulJ0duJgFOeWCltpcHV8MlFv_0vkJ_mE",
    authDomain: "job-portal-headstart.firebaseapp.com",
    projectId: "job-portal-headstart",
    storageBucket: "job-portal-headstart.appspot.com",
    messagingSenderId: "1090601158129",
    appId: "1:1090601158129:web:63ad39e6be2347a6c73050",
    measurementId: "G-0PFEBJCTY8"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  //firebase.analytics();
  firebase.firestore().settings({ timestampsInSnapshots: true });

export default firebase 