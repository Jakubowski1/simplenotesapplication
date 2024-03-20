// import firebase from 'firebase/compat/app';
// import 'firebase/compat/firestore';
// import { initializeApp } from "firebase/app";
// import {firebaseConfig} from "./firebaseInitialize.js";

// initializeApp(firebaseConfig);
// // Get a Firestore instance
// const firestore = firebase.firestore();

// // Add a new note to Firestore
// firestore.collection('notes').add({
//     title: "Your Note Title",
//     text: "Your Note Text",
//     createdAt: firebase.firestore.FieldValue.serverTimestamp() // Add current server timestamp
//   })
//   .then((docRef) => {
//     console.log("Note added with ID: ", docRef.id);
//   })
//   .catch((error) => {
//     console.error("Error adding note: ", error);
//   });
