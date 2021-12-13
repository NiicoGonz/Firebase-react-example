import firebase from 'firebase/compat/app';

import 'firebase/compat/auth'

import 'firebase/compat/firestore'

import 'firebase/compat/storage'

const firebaseConfig = {
    apiKey: "AIzaSyBT9uS-MO0D78Ni5ILMl_Qv7BmYnRV6Q4M",
    authDomain: "proyectofirebase-5c4ac.firebaseapp.com",
    projectId: "proyectofirebase-5c4ac",
    storageBucket: "proyectofirebase-5c4ac.appspot.com",
    messagingSenderId: "489592641641",
    appId: "1:489592641641:web:a7d3ea8daf0acf98ecaaf8"
  };


try {
    firebase.initializeApp(firebaseConfig);
} catch(err){
    if (!/already exists/.test(err.message)) {
        console.error('Firebase initialization error', err.stack)}
}

export const auth = firebase.auth();
export const firestore = firebase.firestore();
export const storage = firebase.storage();
export const firebaseNow = firebase.firestore.FieldValue.serverTimestamp();

export default firebase