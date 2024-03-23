import React, { useState } from 'react';
import { doc, updateDoc, deleteDoc, Timestamp } from 'firebase/firestore';
import { db } from '../db/firebaseInitialize';
import { FaTrashCan } from "react-icons/fa6";
import './Note.css'


const Note = ({ note, setNotes }) => {
  const [editTitle, setEditTitle] = useState('');
  const [editMessage, setEditMessage] = useState('');
  const [isEditing, setIsEditing] = useState(false);

  const updateNote = async () => {
    if (editTitle.trim() !== '' && editMessage.trim() !== '') {
      const docNote = doc(db, 'notesCollection', note.id);
      const updatedNote = {
        title: editTitle,
        description: editMessage,
        timestamp: Timestamp.now(),
      };
      await updateDoc(docNote, updatedNote);
      setIsEditing(false);
      // Update local notes state
      setNotes((prevNotes) => prevNotes.map((item) => item.id === note.id ? { ...item, ...updatedNote } : item));
    }
  };

  const deleteNote = async () => {
    const docNote = doc(db, 'notesCollection', note.id);
    await deleteDoc(docNote);
    // Update local notes state
    setNotes((prevNotes) => prevNotes.filter((item) => item.id !== note.id));
  };

  return (
    <div className="card">
      {isEditing ? (
        <>
          <input className='h1' value={editTitle} onChange={(event) => setEditTitle(event.target.value)} placeholder="Title..." />
          <input className='h2' value={editMessage} onChange={(event) => setEditMessage(event.target.value)} placeholder="Message..." />
          <button onClick={updateNote}>Save</button>
         
            <FaTrashCan className='trash' onClick={deleteNote} />
           
        </>
      ) : (
        <>
          
          <div onClick={() => { setIsEditing(true); setEditTitle(note.title); setEditMessage(note.description); }}>
            <div className='h1'>{note.title}</div>
            <div className='h2'>{note.description}</div>
          </div>
          <button className="if-disabled">Save</button>
          
            <FaTrashCan className='trash' onClick={deleteNote} />
        
        </>
      )}
    </div>
  );
};

export default Note;
