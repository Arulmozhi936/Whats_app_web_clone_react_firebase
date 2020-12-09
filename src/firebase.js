import firebase from "firebase";

const firebaseConfig = {
    apiKey: "AIzaSyDpxGo6wHvepmp6bptbyAuI_fHBcvTRLxA",
    authDomain: "whats-app-bcffa.firebaseapp.com",
    databaseURL: "https://whats-app-bcffa.firebaseio.com",
    projectId: "whats-app-bcffa",
    storageBucket: "whats-app-bcffa.appspot.com",
    messagingSenderId: "554561724193",
    appId: "1:554561724193:web:c5ac95f9e18c4dd4d3e860"
};
  
const firebaseApp = firebase.initializeApp
  (firebaseConfig);
const db = firebaseApp.firestore();
const auth=firebase.auth();
const provider = new firebase.auth.GoogleAuthProvider();

export { auth, provider };
export default db;