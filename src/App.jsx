import React, { useState, useEffect, useMemo } from 'react';
import './App.css';
import Sidebar from './components/Sidebar';
import Editor from './components/Editor';
import Split from 'react-split';
import { onSnapshot, addDoc, doc, deleteDoc, setDoc } from 'firebase/firestore';
import { notesCollection, db } from './utils/firebaseConfig';

export default function App() {
  const [notes, setNotes] = useState([]);
  const [currentNoteId, setCurrentNoteId] = useState("");
  const [tempNoteText, setTempNoteText] = useState("");
  const [isDarkMode, setDarkMode] = useState(
    () => localStorage.getItem("theme") === "dark"
  );

  // wrapping inside useMemo to avoid unnecessary re-sorting
  const sortedNotes = useMemo(() => {
    return [...notes].sort((a, b) => b.updatedAt - a.updatedAt);
  }, [notes]);

  const currentNote = sortedNotes.find((note) => note.id === currentNoteId) || sortedNotes[0];

  useEffect(() => {
    document.documentElement.classList.toggle("dark-mode", isDarkMode);
    localStorage.setItem("theme", isDarkMode ? "dark" : "light");
  }, [isDarkMode]);

  const toggleTheme = () => {
    setDarkMode((prevMode) => !prevMode);
  };


  useEffect(() => {
    const unsubscribe = onSnapshot(notesCollection, (snapshot) => {
      const notesArray = snapshot.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }))
      setNotes(notesArray);
    })
    return () => unsubscribe();
  }, [])

  useEffect(() => {
    if (!currentNoteId && sortedNotes.length > 0) {
      setCurrentNoteId(sortedNotes[0]?.id)
    }
  }, [sortedNotes])

  useEffect(() => {
    if (currentNote) {
      setTempNoteText(currentNote.body)
    }
  }, [currentNote])

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (tempNoteText !== currentNote.body) {
        updateNote(tempNoteText);
      }
    }, 500)
    return () => clearTimeout(timeoutId);
  }, [tempNoteText])

  //To create new notes
  async function createNewNote() {
    const newNote = {
      body: "# Type your markdown note's title here",
      createdAt: Date.now(),
      updatedAt: Date.now(),
    }
    const newNoteRef = await addDoc(notesCollection, newNote);
    setCurrentNoteId(newNoteRef.id);
  }
  // To update notes
  async function updateNote(text) {
    const docRef = doc(db, "notes", currentNoteId);
    await setDoc(
      docRef,
      { body: text, updatedAt: Date.now() },
      { merge: true });
  }

  //To delete notes
  async function deleteNote(noteId) {
    const docRef = doc(db, "notes", noteId);
    await deleteDoc(docRef);
  }

  return (
    <main>
      {notes.length > 0 ? (
        <Split
          sizes={[30, 70]}
          direction="horizontal"
          className="split"
          style={{ height: "100vh" }}>
          <Sidebar
            notes={sortedNotes}
            currentNote={currentNote}
            setCurrentNoteId={setCurrentNoteId}
            newNote={createNewNote}
            deleteNote={deleteNote}
            toggleTheme={toggleTheme}
            isDarkMode={isDarkMode}
          />

          <Editor
            tempNoteText={tempNoteText}
            setTempNoteText={setTempNoteText}
          />
        </Split>
      ) : (
        <div className="no-notes">
          <div className="app-heading">
            <img src="/notes-logo.png" alt="Notes-logo" />
            <h1>Markdown Notes App</h1>
          </div>
          <h2>You have no notes</h2>
          <button className="first-note" onClick={createNewNote}>
            Create one now
          </button>
        </div>
      )}
    </main>
  )
}


