// Firebase App (the core Firebase SDK) is always required
import { initializeApp } from 'firebase/app';
import {
    getAuth,
    GoogleAuthProvider,
    signInWithPopup,
} from 'firebase/auth';
import {
    getFirestore,
    collection,
    query,
    where,
    getDocs,
    updateDoc,
    doc,
    addDoc
} from 'firebase/firestore';

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

const db = getFirestore(app);

const mapUserFromFirebaseAuthToUser = (user) => {
    const { uid, displayName, photoURL, email } = user;
    return { userId: uid, username: displayName, avatar: photoURL, email };
}

export const onAuthStateChanged = (onChange) => {
    return auth.onAuthStateChanged(user => {
        const normalizedUser = user ? mapUserFromFirebaseAuthToUser(user) : null
        onChange(normalizedUser)
    });
};


// Configure Google providerhttps://tinyurl.com/3st65xj2
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

export const saveResult = async ({ userId, username, avatar, score, mode, date }) => {
    try {
        const resultsRef = collection(db, 'results');

        // Check if a record already exists for this user and mode
        const q = query(
            resultsRef,
            where('userId', '==', userId),
            where('mode', '==', mode)
        );

        const querySnapshot = await getDocs(q);

        if (!querySnapshot.empty) {
            // If a previous record exists, update the maximum if necessary
            const docRef = querySnapshot.docs[0];
            const existingData = docRef.data();
            const newMaxScore = Math.max(existingData.maxScore || 0, score);

            await updateDoc(doc(db, 'results', docRef.id), {
                score,
                maxScore: newMaxScore,
                date: date > existingData.date ? date : existingData.date
            });

            return { id: docRef.id, ...existingData, score, maxScore: newMaxScore };
        } else {
            // If it doesn't exist, create a new record
            const newResult = {
                userId,
                username,
                avatar,
                score,
                maxScore: score, // For the first record, the current score is the maximum
                mode,
                date
            };

            const docRef = await addDoc(resultsRef, newResult);
            return { id: docRef.id, ...newResult };
        }

    } catch (error) {
        console.error("Error saving result:", error);
        throw error;
    }
};

export const getUserResults = async (userId) => {
    try {
        const resultsRef = collection(db, 'results');
        const q = query(resultsRef, where('userId', '==', userId));
        const snapshot = await getDocs(q);

        const results = {};
        snapshot.forEach((doc) => {
            const data = doc.data();
            results[data.mode] = {
                maxScore: data.maxScore,
                lastScore: data.score,
                date: data.date
            };
        });

        return results;
    } catch (error) {
        console.error("Error fetching user results:", error);
        throw error;
    }
};

export const getGeneralResults = async () => {
    try {
        const resultsRef = collection(db, 'results');
        const q = query(resultsRef);
        const snapshot = await getDocs(q);

        let result = []
        snapshot.forEach(doc => {
            const data = doc.data()
            result.push({
                userId: data.userId,
                username: data.username,
                avatar: data.avatar,
                maxScore: data.maxScore,
                mode: data.mode
            })
        })

        return result

    } catch (error) {
        console.error("Error fetching general results:", error);
        throw error;
    }
}