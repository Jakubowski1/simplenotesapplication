import "./db/firebaseInitialize.js"
import NotesList from "./components/notesList"
import firebase from "./db/firebaseInitialize.js"
import {useState, useEffect} from "react"
import { QuerySnapshot } from "firebase/firestore"



function App() {
    return (
    <div> 
      <NotesList/>
    </div>
  );
}

export default App;


