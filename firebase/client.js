import * as firebase from "firebase";

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyCn7YeiQdEyfWNt9a5mxDifWLhj9jU35eg",
    authDomain: "chronomaths-f7cfb.firebaseapp.com",
    projectId: "chronomaths-f7cfb",
    storageBucket: "chronomaths-f7cfb.firebasestorage.app",
    messagingSenderId: "70384972164",
    appId: "1:70384972164:web:daa10bb0e21d68fa736dd1",
    measurementId: "G-P70RPKKD7X"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export const loginWithGoogle = () => {
    const GoogleProvider = new firebase.auth.GoogleAuthProvider();
    return firebase.auth().signInWithPopup(GoogleProvider);
}