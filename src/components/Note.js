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
                  <textarea className='h1' value={editTitle} onChange={(event) => setEditTitle(event.target.value)} placeholder="Title..." />
                  <textarea className='h2' value={editMessage} onChange={(event) => setEditMessage(event.target.value)} placeholder="Message..." />
                  <button className="saveButton" onClick={updateNote}>Save</button>
              </>
          ) : (
              <>
                  <div >
                      <textarea onChange={() => { setIsEditing(true); setEditTitle(note.title); setEditMessage(note.description); }} className='h1' value={note.title}/>
                      <textarea onChange={() => { setIsEditing(true); setEditTitle(note.title); setEditMessage(note.description); }} className='h2'value={note.description}/>
                  </div>
                  <div className='cardFooter'>
                  <button className="if-disabled">Save</button>
                  
          <div className='timestamp'>{note.timestamp?.toDate().toLocaleString()}</div>
          <FaTrashCan className='trash' onClick={deleteNote} />
          </div>
              </>
          )}
        
      </div>
    );
}

 

export default Note;
