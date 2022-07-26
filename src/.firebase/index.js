import firebase from 'firebase/compat/app';
import 'firebase/compat/database';
import 'firebase/compat/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyBneR5gd3tDB_PJS-Sd2Ro80TxBXZhvwjE",
    authDomain: "togyzq.firebaseapp.com",
    projectId: "togyzq",
    storageBucket: "togyzq.appspot.com",
    messagingSenderId: "1098621575140",
    appId: "1:1098621575140:web:7c1943917e75f03dbeb1f1",
    measurementId: "G-FHSBE6XF82"
};

firebase.initializeApp(firebaseConfig);

const database = firebase.database();
const firestore = firebase.firestore();


export { database, firestore };