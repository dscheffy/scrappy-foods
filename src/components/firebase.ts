import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyCyha94Ia_9hgWGwMttczBmXlPVFl99UlE",
  authDomain: "scrappy-foods.firebaseapp.com",
  databaseURL: "https://scrappy-foods.firebaseio.com",
  projectId: "scrappy-foods",
  storageBucket: "gs://scrappy-foods.appspot.com",
  messagingSenderId: "1001622754522"
};

firebase.initializeApp(firebaseConfig);

export default firebase;

export const auth = firebase.auth();
export const storage = firebase.storage();
export const firestore = firebase.firestore();
export const googleAuthProvider = new firebase.auth.GoogleAuthProvider();
export const FieldValue = firebase.firestore.FieldValue;
export const Timestamp = firebase.firestore.Timestamp;