import React, { useState, useEffect } from 'react';
import { collection, getDocs, addDoc, Timestamp, updateDoc, doc, deleteDoc } from 'firebase/firestore';
import { db } from '../db/firebaseInitialize';
import './notesList.css';

const NotesList = () => {
  const [notes, setNotes] = useState([]);
  const [newTitle, setNewTitle] = useState('');
  const [newMessage, setNewMessage] = useState('');
  const [editTitle, setEditTitle] = useState('');
  const [editMessage, setEditMessage] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const [noteId, setNoteId] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      const data = await getDocs(collection(db, 'notesCollection'));
      setNotes(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    };
    fetchData();
  }, );

  const createNote = async () => {
    if (newTitle.trim() !== '' && newMessage.trim() !== '') {
      await addDoc(collection(db, 'notesCollection'), { title: newTitle, description: newMessage, timestamp: Timestamp.now() });
      setNewTitle('');
      setNewMessage('');
    }
  };

  const updateNote = async (id, title, description) => {
    if (title.trim() !== '' && description.trim() !== '') {
      const docNote = doc(db, 'notesCollection', id);
      const data = {
        title: title,
        description: description,
        timestamp: Timestamp.now(),
      };
      await updateDoc(docNote, data);
      setIsEditing(false);
    }
  };

  const deleteNote = async (id) => {
    const docNote = doc(db, 'notesCollection', id);
    await deleteDoc(docNote);
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
        {notes.map((note) => {
          const handleUpdate = () => {
            updateNote(noteId, editTitle, editMessage);
          };

          return (
            <div key={note.id} className="card">
              {isEditing && note.id === noteId ? (
                <>
                  <input value={editTitle} onChange={(event) => setEditTitle(event.target.value)} />
                  <input value={editMessage} onChange={(event) => setEditMessage(event.target.value)} />
                  <button onClick={handleUpdate}>Save</button>
                </>
              ) : (
                <>
                  <div onClick={() => { setIsEditing(true); setEditTitle(note.title); setEditMessage(note.description); setNoteId(note.id); }}>
                    <h3>{note.title}</h3>
                    <p>{note.description}</p>
                  </div>
                  <button onClick={() => deleteNote(note.id)}>Delete</button>
                </>
              )}
            </div>
          );
        })}
      </ul>
    </div>
  );
};

export default NotesList;
