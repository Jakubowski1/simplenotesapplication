// import React, { useState, useEffect } from 'react';
// import firebase from 'firebase/compat/app';
// import 'firebase/compat/firestore';

// const NotesList = () => {
//   const [notes, setNotes] = useState([]);

//   useEffect(() => {
//     // Initialize Firestore
//     const firestore = firebase.firestore();

//     // Fetch notes from Firestore
//     const fetchNotes = async () => {
//       try {
//         const notesCollection = await firestore.collection('notes').get();
//         const fetchedNotes = notesCollection.docs.map(doc => ({
//           id: doc.id,
//           ...doc.data()
//         }));
//         setNotes(fetchedNotes);
//       } catch (error) {
//         console.error('Error fetching notes: ', error);
//       }
//     };

//     fetchNotes();

//     // Clean up the effect
//     return () => {
//       // Cleanup code, if needed
//     };
//   }, []); // Empty dependency array to run the effect only once when the component mounts

//   return (
//     <div>
//       <h2>Notes</h2>
//       <ul>
//         {notes.map(note => (
//           <li key={note.id}>
//             <strong>{note.title}</strong>: {note.text}
//           </li>
//         ))}
//       </ul> 
//     </div>
//   );
// };

// export default NotesList;
