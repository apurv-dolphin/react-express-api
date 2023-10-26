const firebase = require("firebase");
const firebaseConfig = {
  apiKey: "AIzaSyAo3ZaJvuJPr48XdrRjttuBgVyGwHKnXhw",
  authDomain: "node-with-express-curd.firebaseapp.com",
  projectId: "node-with-express-curd",
  storageBucket: "node-with-express-curd.appspot.com",
  messagingSenderId: "845677133111",
  appId: "1:845677133111:web:555d6e171c7c848f48eeb2",
  measurementId: "G-XCJSCZTYLC"
};
firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();
const User = db.collection("Users");
module.exports = User;
