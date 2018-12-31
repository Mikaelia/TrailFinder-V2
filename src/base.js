import firebase from "firebase";
import "firebase/firestore";

// Connect app to database
const firebaseConfig = {
  apiKey: "AIzaSyBZApjnfLec8gCEAXT7BpDL7YZlx2MwXjY",
  authDomain: "trailfinder2.firebaseapp.com",
  databaseURL: "https://trailfinder2.firebaseio.com",
  projectId: "trailfinder2",
  storageBucket: "trailfinder2.appspot.com",
  messagingSenderId: "160149604415"
};

// Init firebase instance
const app = firebase.initializeApp(firebaseConfig);
// const base = Rebase.createClass(app.database());
const db = firebase.firestore();
db.settings({ timestampsInSnapshots: true });
const facebookProvider = new firebase.auth.FacebookAuthProvider();

export { app, db, facebookProvider };
