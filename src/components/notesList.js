import React, { useState, useEffect } from 'react';
import { collection, getDocs, addDoc, Timestamp } from 'firebase/firestore';
import { db } from '../db/firebaseInitialize';
import './notesList.css';
import Note from './Note'; // Import the Note component

const NotesList = () => {
  const [notes, setNotes] = useState([]);
  const [newTitle, setNewTitle] = useState('');
  const [newMessage, setNewMessage] = useState('');
  const [isAddedSuccess, setIsAddedSuccess] = useState(true);
  const [searchQuery, setSearchQuery] = useState(''); // New state for the search query

  // useEffect(() => {
  //   const fetchData = async () => {
  //     const data = await getDocs(collection(db, 'notesCollection'));
  //     setNotes(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
  //     setIsAddedSuccess(false);
  //   };
  //   if(isAddedSuccess)fetchData();
  // }, [isAddedSuccess]);
  useEffect(() => {
    const fetchData = async () => {
      const data = await getDocs(collection(db, 'notesCollection'));
      setNotes(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    };

    // Now, fetchData is called only once when the component mounts
    fetchData();
  }, []);
  const createNote = async () => {
    if (newTitle.trim() !== '' && newMessage.trim() !== '') {
      await addDoc(collection(db, 'notesCollection'), { title: newTitle, description: newMessage, timestamp: Timestamp.now() });
      setNewTitle('');
      setNewMessage('');
      setIsAddedSuccess(true); // Ensure this is set after adding a note
    }
  };

  // Function to filter notes based on the search query
  const filteredNotes = notes.filter(note =>
    note.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div>
         <div className="searchBar"> 
        <input
          type="text"
          placeholder="Search by title..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>
      <ul>
        <div className="addCard">
          <input className='h1' placeholder="Title..." value={newTitle} onChange={(event) => setNewTitle(event.target.value)} />
          <input className='h2' placeholder="Message..." value={newMessage} onChange={(event) => setNewMessage(event.target.value)} />
          <button className="saveButton" onClick={createNote}>Save</button>

        </div>
        {filteredNotes.map((note) => (
          <Note key={note.id} note={note} setNotes={setNotes} />
        ))}
      </ul>
    </div>
  );
};

export default NotesList;
