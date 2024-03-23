// NotesList.jsx
import React, { useState, useEffect } from 'react';
import { collection, getDocs, addDoc, Timestamp } from 'firebase/firestore';
import { db } from '../db/firebaseInitialize';
import './notesList.css';
import Note from './Note'; // Import the Note component

const NotesList = () => {
  const [notes, setNotes] = useState([]);
  const [newTitle, setNewTitle] = useState('');
  const [newMessage, setNewMessage] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      const data = await getDocs(collection(db, 'notesCollection'));
      setNotes(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    };
    fetchData();
  }, []);

  const createNote = async () => {
    if (newTitle.trim() !== '' && newMessage.trim() !== '') {
      await addDoc(collection(db, 'notesCollection'), { title: newTitle, description: newMessage, timestamp: Timestamp.now() });
      setNewTitle('');
      setNewMessage('');
    }
  };

  return (
    <div>
      <h2>Notes:</h2>
      <ul>
        <div className="card">
          <input placeholder="Title..." value={newTitle} onChange={(event) => setNewTitle(event.target.value)} />
          <input placeholder="Message..." value={newMessage} onChange={(event) => setNewMessage(event.target.value)} />
          <button onClick={createNote}>Save</button>
        </div>
        {notes.map((note) => (
          <Note key={note.id} note={note} setNotes={setNotes} />
        ))}
      </ul>
    </div>
  );
};

export default NotesList;
