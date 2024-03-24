// noteServices.js
import { doc, updateDoc, Timestamp } from 'firebase/firestore';
import { db } from './FirebaseInitialize';

export const updateNote = async (noteId, editTitle, editMessage, setNotes) => {
  if (editTitle.trim() !== '' && editMessage.trim() !== '') {
    const docNote = doc(db, 'notesCollection', noteId);
    const updatedNote = {
      title: editTitle,
      description: editMessage,
      timestamp: Timestamp.now(),  
    };
    await updateDoc(docNote, updatedNote);
    setNotes((prevNotes) => prevNotes.map((item) => item.id === noteId ? { ...item, ...updatedNote } : item));
  }
};


