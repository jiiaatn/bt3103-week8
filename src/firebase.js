import firebase from "firebase";

  // Your web app's Firebase configuration
  // For Firebase JS SDK v7.20.0 and later, measurementId is optional
  const firebaseConfig = {
    apiKey: "AIzaSyClpaeYEzimKQjrayuUg9oxDKXQdHpBtLY",
    authDomain: "bt3103-week-6-b65ad.firebaseapp.com",
    projectId: "bt3103-week-6-b65ad",
    storageBucket: "bt3103-week-6-b65ad.appspot.com",
    messagingSenderId: "767532502191",
    appId: "1:767532502191:web:eeff8416d6e2ea0a5c585a",
    measurementId: "G-BX4FN0Z2TH"
  };

firebase.initializeApp(firebaseConfig);
var database = firebase.firestore();
export default database;