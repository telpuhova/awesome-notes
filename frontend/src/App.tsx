import "./App.css";
import { useState } from "react";

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
      title: "test note 1",
      content: "bla bla note1",
    },
    {
      id: 2,
      title: "test note 2 ",
      content: "bla bla note2",
    },
    {
      id: 3,
      title: "test note 3",
      content: "bla bla note3",
    },
    {
      id: 4,
      title: "test note 4 ",
      content: "bla bla note4",
    },
    {
      id: 5,
      title: "test note 5",
      content: "bla bla note5",
    },
    {
      id: 6,
      title: "test note 6",
      content: "bla bla note6",
    },
  ]);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const handleAddNote = (event: React.FormEvent) => {
    event.preventDefault();
    console.log("title: ", title);
    console.log("content: ", content);
    const newNote: Note = {
      id: notes.length + 1,
      title: title,
      content: content,
    };
    setNotes([newNote, ...notes]);
    setTitle("");
    setContent("");
  };
  const [selectedNote, setSelectedNote] = useState<Note | null>(null);
  return (
    <div className="app-container">
      <form onSubmit={handleAddNote} className="note-form">
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

        <button type="submit">Add Note</button>
      </form>
      <div className="notes-grid">
        {notes.map((note) => (
        <div className="note-item">
          <div className="notes-header">
            <button>x</button>
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