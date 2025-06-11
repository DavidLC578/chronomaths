// Firebase App (the core Firebase SDK) is always required
import { initializeApp } from 'firebase/app';
import {
    getAuth,
    GoogleAuthProvider,
    signInWithPopup
} from 'firebase/auth';

// Your web app's Firebase configuration
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
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

const mapUserFromFirebaseAuthToUser = (user) => {
    const { displayName, photoURL, email } = user;
    return { username: displayName, avatar: photoURL, email };
}

export const onAuthStateChanged = (onChange) => {
    return auth.onAuthStateChanged(user => {
        const normalizedUser = user ? mapUserFromFirebaseAuthToUser(user) : null
        onChange(normalizedUser)
    });
};


// Configura el proveedor de Google
const googleProvider = new GoogleAuthProvider();

export const loginWithGoogle = async () => {
    try {
        const result = await signInWithPopup(auth, googleProvider);
        const { user } = result;
        return mapUserFromFirebaseAuthToUser(user);
    } catch (error) {
        console.error("Error while logging in:", error);
        throw error;
    }
};

export const logout = async () => {
    try {
        await auth.signOut();
        return true;
    } catch (error) {
        console.error("Error while logging out:", error);
        throw error;
    }
};
