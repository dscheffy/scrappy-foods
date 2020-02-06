// import firebase from "../components/firebase";
import { firestore } from '../components/firebase'

export const USER_COLLECTION = "users"

export const userDetail = (uid: string) => firestore.collection(USER_COLLECTION).doc(uid);
