import React, { useState, useEffect, useContext } from "react";
import "./Header.css";
import { TiDelete } from "react-icons/ti";
import { MdEdit } from "react-icons/md";
import axios from "axios";
import { User } from "../../UserContext";

const Header = ({ isAuthenticated }) => {
  const [notes, setNotes] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [currentNote, setCurrentNote] = useState(null);
  const [editedContent, setEditedContent] = useState("");
  const { username } = useContext(User);
  const [newTitle, setNewTitle] = useState("");
  const [newContent, setNewContent] = useState("");

  useEffect(() => {
    const fetchNotes = async () => {
      try {
        const response = await axios.get("http://localhost:5000/getnotes");
        setNotes(response.data);
      } catch (error) {
        console.error("Error fetching notes:", error);
      }
    };

    if (isAuthenticated) {
      fetchNotes();
    }
  }, [isAuthenticated]);

  const handleAddNote = async () => {
    try {
      const response = await axios.post("http://localhost:5000/createnote", {
        title: newTitle,
        content: newContent,
        owner: username,
      });

      if (response.data && response.data.message === "Successfully posted") {
        // Fetch notes again to ensure the list is up-to-date
        const fetchNotes = async () => {
          try {
            const response = await axios.get("http://localhost:5000/getnotes");
            setNotes(response.data);
          } catch (error) {
            console.error("Error fetching notes:", error);
          }
        };

        fetchNotes();
        setNewTitle("");
        setNewContent("");
      } else {
        console.error("Unexpected response structure:", response.data);
      }
    } catch (error) {
      console.error("Error adding note:", error);
    }
  };

  const handleEditClick = (note) => {
    setIsEditing(true);
    setCurrentNote(note);
    setEditedContent(note.content);
  };

  const handleSaveClick = async () => {
    try {
      const response = await axios.put(`http://localhost:5000/getnotes/${currentNote._id}`, {
        title: currentNote.title,
        content: editedContent,
      });

      if (response.data && response.data.message === "Note updated successfully") {
        setNotes((prevNotes) =>
          prevNotes.map((note) =>
            note._id === currentNote._id
              ? { ...note, content: editedContent }
              : note
          )
        );
        setIsEditing(false);
        setCurrentNote(null);
      }
    } catch (error) {
      console.error("Error saving note:", error);
    }
  };

  const handleDeleteClick = async (id) => {
    try {
      const response = await axios.delete(`http://localhost:5000/getnotes/${id}`);

      if (response.data && response.data.message === "Note deleted successfully") {
        setNotes((prevNotes) => prevNotes.filter((note) => note._id !== id));
      }
    } catch (error) {
      console.error("Error deleting note:", error);
    }
  };

  const handleCancelClick = () => {
    setIsEditing(false);
    setCurrentNote(null);
  };

  return (
    <div className="header-container">
      {isAuthenticated ? (
        <>
          <div className="create-note-area">
            <input
              type="text"
              placeholder="Note Title"
              value={newTitle}
              onChange={(e) => setNewTitle(e.target.value)}
            />
            <textarea
              placeholder="Note Content"
              value={newContent}
              onChange={(e) => setNewContent(e.target.value)}
            />
            <button onClick={handleAddNote}>Add Note</button>
          </div>

          <div className="notes-container">
            {notes.map((note) => (
              <div className="note-item" key={note._id}>
                <h3>{note.title}</h3>
                <div className="informations">
                  {isEditing && currentNote && currentNote._id === note._id ? (
                    <div>
                      <textarea
                        value={editedContent}
                        onChange={(e) => setEditedContent(e.target.value)}
                      />
                      <button onClick={handleSaveClick}>Save</button>
                      <button onClick={handleCancelClick}>Cancel</button>
                    </div>
                  ) : (
                    <p>{note.content}</p>
                  )}
                  <div className="tools">
                    {note.owner === username && (
                      <>
                        <TiDelete
                          className="click"
                          onClick={() => handleDeleteClick(note._id)}
                        />
                        <MdEdit
                          className="click"
                          onClick={() => handleEditClick(note)}
                        />
                      </>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </>
      ) : (
        <div className="header-container2">
          <h3>You have to signup or login to see content</h3>
        </div>
      )}
    </div>
  );
};

export default Header;
