import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCyha94Ia_9hgWGwMttczBmXlPVFl99UlE",
  authDomain: "scrappy-foods.firebaseapp.com",
  projectId: "scrappy-foods",
  messagingSenderId: "1001622754522"
};

firebase.initializeApp(firebaseConfig);

export default firebase;

export const auth = firebase.auth();
export const googleAuthProvider = new firebase.auth.GoogleAuthProvider();
