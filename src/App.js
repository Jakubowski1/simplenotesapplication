import "./db/firebaseInitialize.js"
import NewNote from "./components/newNote.js"
import NotesList from "./components/notesList"
import firebase from "./db/firebaseInitialize.js"
import {useState, useEffect} from "react"
import { QuerySnapshot } from "firebase/firestore"



function App() {
  
  // const ref = firebase.firestore().collection("notesCollection")
  // console.log(ref);
  // const [data, setData] = useState([]);
  // const [loader, setLoader] = useState(true);

  // function getData(){
  //   ref.onSnapshot((querySnapshot) => {
  //     const items = []
  //     querySnapshot.forEach((doc) => {
  //       items.push(doc.data())
  //     })
  //     setData(items)
  //     setLoader(true)
  //   })
  // }
  // useEffect(()=>{
  //   getData()
  //   console.log(data);
  // },[])



  return (
    <div> 
      <NewNote/>
      <NotesList/>
    </div>
  );
}

export default App;


