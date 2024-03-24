import React, { useState } from 'react';
import { deleteNote } from '../services/DeleteNote';
import { updateNote } from '../services/UpdateNote'; 
import { FaTrashCan } from "react-icons/fa6";
import '../styles/note.css'
const Note = ({ note, setNotes }) => {
  const [editTitle, setEditTitle] = useState('');
  const [editMessage, setEditMessage] = useState('');
  const [isEditing, setIsEditing] = useState(false);

  const handleUpdateNote = async () => {
    await updateNote(note.id, editTitle, editMessage, setNotes);
    setIsEditing(false);
  };

  const handleDeleteNote = async () => {
    await deleteNote(note.id, setNotes);
  };

  return (
      <div className="card">
          {isEditing ? (
              <>
                  <textarea autoFocus className='h1' value={editTitle} onChange={(event) => setEditTitle(event.target.value)} placeholder="Title..." />
                  <textarea className='h2' value={editMessage} onChange={(event) => setEditMessage(event.target.value)} placeholder="Message..." />
                  <button className="saveButton" onClick={handleUpdateNote}>Save</button>
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
                  <FaTrashCan size={25} className='trash' onClick={handleDeleteNote} />
                  </div>
              </>
          )}
      </div>
    );
}

export default Note;
