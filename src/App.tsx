import React, { useState } from 'react';
import './App.css';

type Note = {
  id: number;
  title: string;
  content: string;
}

  function App() {
  const [notes, setNotes] = useState([
    {
    id: 1,
    title: "note title 1",
    content: "content 1",
  },
    {
    id: 2,
    title: "note title 2",
    content: "content 2",
  },
    {
    id: 3,
    title: "note title 3",
    content: "content 3",
  },
    {
    id: 4,
    title: "note title 4",
    content: "content 4",
  }
]);

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [selectedNote, setSelectedNote] = 
  useState<Note | null>(null)

  const handleNoteClick = (note:Note) =>{
    setSelectedNote(note);
    setTitle(note.title);
    setContent(note.content);
  }

  const handleAddNote = (
  event: React.FormEvent
  ) => {
  event.preventDefault();

  const newNote:Note = {
    id: notes.length + 1,
    title: title,
    content: content,
  }
  setNotes([newNote, ...notes]);
  setTitle("");
  setContent("");
};

const handleUpdateNote = (
  event: React.FormEvent
  )=> {
    event.preventDefault();
//If not selected note return nothing
    if(!selectedNote){
      return;
    }

// Else populate the note with this;    
    const updateNote: Note = {
      id: selectedNote.id,
      title: title,
      content: content,
    }
// Update the noteList by running a map on the notes and 
//only updateNote on note.id === selectedNote.id
    const updatedNoteList = notes.map((note)=>
    note.id === selectedNote.id
     ? updateNote
     :note   
    )

    setNotes(updatedNoteList)
    setTitle("")
    setContent("")
    setSelectedNote(null)
};


const handleCancel = () =>{
  setTitle("")
  setContent("")
  setSelectedNote(null)
}


  return (
    <div className="app-container">
     <form className='note-form'
    //  onSubmit={(event)=> handleSubmit(event)}
     >
    <input type="text"
    placeholder='title'
    value={title}
    onChange={(e)=> setTitle(e.target.value)}
    required
    /> 
    <textarea
    value={content}
    onChange={(e)=> setContent(e.target.value)}
    placeholder='Content'
    rows={10}
    required
    /> 
    {selectedNote ? (
      <div className="edit-buttons">
        <button type='submit'>Save</button>
        <button onClick={handleCancel} > Cancel</button>
      </div>
    ):(
      <button type='submit' onClick={handleAddNote}>
      Add Note
      </button>  )}

     </form>
     <div className="notes-grid">
      {notes.map((note)=>(
           <div key={note.id} 
           className="note-item"
           onClick={() => handleNoteClick(note)}
           >
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
