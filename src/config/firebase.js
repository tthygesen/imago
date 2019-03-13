import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";
import "firebase/storage";

//Firebase config
import config from "./config";

firebase.initializeApp(config);
firebase.firestore().settings({});

export default firebase;
