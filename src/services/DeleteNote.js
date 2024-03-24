// noteServices.js
import { doc,  deleteDoc } from 'firebase/firestore';
import { db } from './FirebaseInitialize';

export const deleteNote = async (noteId, setNotes) => {
  const docNote = doc(db, 'notesCollection', noteId);
  await deleteDoc(docNote);
  setNotes((prevNotes) => prevNotes.filter((item) => item.id !== noteId));
};
