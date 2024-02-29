import "./App.css";
import React, { useState } from "react";

class Note {
  id: number;
  title: string;
  content: string;
  constructor(id: number, title: string, content: string) {
    this.id = id;
    this.title = title;
    this.content = content;
  }
}

const App = () => {
  const [notes, setNotes] = useState<Note[]>([
    {
      id: 1,
      title: "Welcome to\nawesome-notes",
      content: "Add and edit notes using the form.",
    },
  ]);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [selectedNote, setSelectedNote] = useState<Note | null>(null);
  const handleAddNote = (event: React.FormEvent) => {
    event.preventDefault();
    const newNote: Note = {
      id: notes.length + 1,
      title: title,
      content: content,
    };
    setNotes([newNote, ...notes]);
    setTitle("");
    setContent("");
  };
  const handleNoteClick = (note: Note) => {
    setSelectedNote(note);
    setTitle(note.title);
    setContent(note.content);
  }
  const handleUpdateNote = (event: React.FormEvent) => {
    event.preventDefault();
    if (!selectedNote) { 
      return;
    }
    const updatedNote: Note = {
      id: selectedNote.id,
      title: title,
      content: content
    };
    const updatedNotesList = notes.map((note) => (note.id === selectedNote.id ? updatedNote : note));
    setNotes(updatedNotesList);
    setTitle("");
    setContent("");
    setSelectedNote(null);
  };
  const handleCancel = () => {
    setTitle("");
    setContent("");
    setSelectedNote(null);
  };
  const deleteNote = (event: React.MouseEvent, noteId: number) => {
    event.stopPropagation();
    const updatedNotesList = notes.filter((note) => (note.id !== noteId));
    setNotes(updatedNotesList)
  }

  return (
    <div className="app-container">

      <form onSubmit={(event) => (selectedNote ? handleUpdateNote(event) : handleAddNote(event))} className="note-form">
        <input 
          value={title}
          onChange={(event) => setTitle(event.target.value)}
          placeholder="Title" 
          required
        ></input>
        <textarea 
          value={content}
          onChange={(event) => setContent(event.target.value)}
          placeholder="Content" 
          rows={10} 
          required
        ></textarea>
        {selectedNote ? (
          <div className="edit-buttons">
            <button type="submit">Save</button>
            <button onClick={handleCancel}>Cancel</button>
          </div>
        ) : (
          <button type="submit">Add Note</button>
        )}
      </form>

      <div className="notes-grid">
        {notes.map((note) => (
        <div className="note-item" onClick={() => handleNoteClick(note)}>
          <div className="notes-header">
            <button onClick={(event) => deleteNote(event, note.id)}>x</button>
          </div>
          <h2>{note.title}</h2>
          <p>{note.content}</p>
        </div>
        ))}
      </div>

    </div>
  );
};

export default App;