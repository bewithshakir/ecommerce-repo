import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const config = {
    apiKey: "AIzaSyDUXwLronFEzFWTt-U-piuOEB0I1GyMZCY",
    authDomain: "e-commerce-7b79a.firebaseapp.com",
    databaseURL: "https://e-commerce-7b79a.firebaseio.com",
    projectId: "e-commerce-7b79a",
    storageBucket: "e-commerce-7b79a.appspot.com",
    messagingSenderId: "605954859045",
    appId: "1:605954859045:web:ee2ec89048d80774b49fcc",
    measurementId: "G-57WR102ELV"
};

export const createUserProfileDocument = async (userAuth, additionalData)=> {
    if (!userAuth) return;
    const userRef = firestore.doc(`users/${userAuth.uid}`);
    const snapshot = await userRef.get();

    if (!snapshot.exists) {
        const {displayName, email} = userAuth;
        const createdAt = new Date();
        try {
            await userRef.set({
                displayName,
                email,
                createdAt,
                ...additionalData
            })
        } catch (error) {
            console.log('error creating user', error.message);
        }
    }
    
    return userRef;
}

firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({
    'prompt': 'select_account'
});
export const signInWithGoogle = ()=> auth.signInWithPopup(provider);

export default firebase;