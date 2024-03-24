import "./db/firebaseInitialize.js"
import NotesList from "./components/notesList"
import firebase from "./db/firebaseInitialize.js"
import {useState, useEffect} from "react"
import { QuerySnapshot } from "firebase/firestore"
import Instruction from "./components/Instruction.js"
import "./App.css"

function App() {
    return (
    <body className="main container"> 
    <NotesList/>
    </body>
  );
}

export default App;


