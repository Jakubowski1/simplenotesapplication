import { collection, addDoc, Timestamp } from 'firebase/firestore';
import { db } from './FirebaseInitialize';

export const createNote = async (newTitle, newMessage, setIsAddedSuccess) => {
  if (newTitle.trim() !== '' && newMessage.trim() !== '') {
    await addDoc(collection(db, 'notesCollection'), {
      title: newTitle,
      description: newMessage,
      timestamp: Timestamp.now()
    });
    setIsAddedSuccess(true); 
  }
};