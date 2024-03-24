import { collection, getDocs } from 'firebase/firestore';
import { db } from './FirebaseInitialize';

export const fetchNotes = async (setNotes, setIsAddedSuccess) => {
  const data = await getDocs(collection(db, 'notesCollection'));
  const sortedNotes = data.docs
    .map(doc => ({ ...doc.data(), id: doc.id }))
    .sort((a, b) => b.timestamp.toDate() - a.timestamp.toDate()); // Sort notes by timestamp
  setNotes(sortedNotes);
  setIsAddedSuccess(false); // Used to reset the addition state and prevent continuous fetching
};