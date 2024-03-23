import  { useState, useEffect } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../db/firebaseInitialize';
import './notesList.css'

const NotesList = () => {
  const [notes, setNotes] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
        const data = await getDocs(collection(db, 'notesCollection')); // Replace 'notes' with your actual collection name
        setNotes(data.docs.map((doc) => ({...doc.data(), id: doc.id})));
    };
    fetchData();
  }, []); // Empty dependency array ensures the effect runs only once after initial render

  return (
    <div>
      <h2>Notes:</h2>
      <ul>
        {notes.map((note) => {
         
         return(
          <div key = {note.id} className='card'> 

            <h1> {note.title}         </h1>
            <h2> {note.description}  </h2>
            
          </div>  
         )
         }
         )}
      </ul>
    </div>
  );
};

export default NotesList;
