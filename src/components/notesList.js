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

  useEffect(() => {
    const fetchData = async () => {
      const data = await getDocs(collection(db, 'notesCollection'));
      const sortedNotes = data.docs
        .map(doc => ({ ...doc.data(), id: doc.id }))
        .sort((a, b) => b.timestamp.toDate() - a.timestamp.toDate()); // Sort notes by timestamp
      setNotes(sortedNotes);
      setIsAddedSuccess(false);
    };
    if(isAddedSuccess) fetchData();
  }, [isAddedSuccess]);
  const createNote = async () => {
    if (newTitle.trim() !== '' && newMessage.trim() !== '') {
      await addDoc(collection(db, 'notesCollection'), { title: newTitle, description: newMessage, timestamp: Timestamp.now() });
      setNewTitle('');
      setNewMessage('');
      setIsAddedSuccess(true); 
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
          <textarea className='h1' placeholder="Title..." value={newTitle} onChange={(event) => setNewTitle(event.target.value)} />
          <textarea className='h2' placeholder="Message..." value={newMessage} onChange={(event) => setNewMessage(event.target.value)} />
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
