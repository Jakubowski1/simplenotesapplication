
import { initializeApp } from 'firebase/app';

import {getFirestore, addDoc, getDocs, collection, Timestamp } from 'firebase/firestore'; 
// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBd3Wopzim7EK0SRwl2zIiKpI2faKqnGU8",
  authDomain: "simplenotesapplication-1.firebaseapp.com",
  projectId: "simplenotesapplication-1",
  storageBucket: "simplenotesapplication-1.appspot.com",
  messagingSenderId: "761441214392",
  appId: "1:761441214392:web:8726edf1ba2cc7d865f94d"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);

// try {
//   const docRef = await addDoc(collection(db, "notesCollection"), {
//     title: "Alan",
//     description: "Jakubowski test 8",
//     importance: 1,
//     timestamp: Timestamp.now()
    
//   });

//   console.log("Document written with ID: ", docRef.id);
// } catch (e) {
//   console.error("Error adding document: ", e);
// }

// const querySnapshot = await getDocs(collection(db, "notesCollection"));
// querySnapshot.forEach((doc) => {
//   console.log(`${doc.id} => ${doc.data()}`);
// }); 
