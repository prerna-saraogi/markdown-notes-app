import React from "react";
import { DarkModeSwitch } from "react-toggle-dark-mode";

export default function Sidebar(props) {
    const noteElements = props.notes.map((note) => (
        <div key={note.id}>
            <div

                className={`title ${note.id === props.currentNote.id ? "selected-note" : ""
                    }`}
                onClick={() => props.setCurrentNoteId(note.id)}
            >
                <h4 className="text-snippet">{(note.body).split("\n")[0].slice(1)}</h4>
                <button
                    className="delete-btn"
                    onClick={() => props.deleteNote(note.id)}
                >
                    <i className="gg-trash trash-icon"></i>
                </button>
            </div>
        </div>
    ))

    return (
        <section className="pane sidebar">
            <div className="sidebar--header">
                <div className="left">
                    <img src="/notes-logo.png" alt="App Logo" className="logo" />
                    <h3>Notes</h3>
                </div>
                <div className="right">
                    <button className="new-note" onClick={props.newNote}>+</button>
                    <DarkModeSwitch
                        checked={!props.isDarkMode}
                        onChange={props.toggleTheme}
                        size={30}
                        moonColor="#f1c40f"
                        sunColor="#f39c12"
                    />
                </div>
            </div>
            {noteElements}
        </section>
    )
}
