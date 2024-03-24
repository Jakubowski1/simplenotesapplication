import React, { useState, useEffect } from 'react';
import { createNote } from '../services/CreateNote';
import { fetchNotes } from '../services/FetchNotes';
import Note from './Note';
import '../styles/listNotes.css';

const NotesList = () => {
  const [notes, setNotes] = useState([]);
  const [newTitle, setNewTitle] = useState('');
  const [newMessage, setNewMessage] = useState('');
  const [isAddedSuccess, setIsAddedSuccess] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    if (isAddedSuccess) {
      fetchNotes(setNotes, setIsAddedSuccess);
    }
  }, [isAddedSuccess]);

  const handleCreateNote = async () => {
    await createNote(newTitle, newMessage, setIsAddedSuccess);
    setNewTitle('');
    setNewMessage('');
  };

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
          <textarea className='h1' placeholder="Title..." value={newTitle} onChange={(e) => setNewTitle(e.target.value)} />
          <textarea className='h2' placeholder="Message..." value={newMessage} onChange={(e) => setNewMessage(e.target.value)} />
          <button className="saveButton" onClick={handleCreateNote}>Save</button>
        </div>
        {filteredNotes.map((note) => (
          <Note key={note.id} note={note} setNotes={setNotes} />
        ))}
      </ul>
    </div>
  );
};

export default NotesList;
