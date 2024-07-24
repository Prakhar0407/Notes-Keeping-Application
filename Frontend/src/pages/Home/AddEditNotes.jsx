import React, { useState } from "react"
import { MdClose } from "react-icons/md"
import TagInput from "../../components/Input/TagInput "
import axios from "axios"
import { toast } from "react-toastify"


const AddEditNotes = ({ onClose, noteData, type, getAllNotes }) => {
  const [title, setTitle] = useState(noteData?.title || "");
  const [content, setContent] = useState(noteData?.content || "");
  const [tags, setTags] = useState(noteData?.tags || []);
  const [error, setError] = useState(null);

  const editNote = async () => {
    const noteId = noteData._id;
    console.log(noteId);

    try {
      const res = await axios.post(
        "http://localhost:5000/api/note/edit/" + noteId,
        { title, content, tags },
        { withCredentials: true }
      );

      console.log(res.data);

      if (res.data.success === false) {
        console.log(res.data.message);
        setError(res.data.message);
        toast.error(res.data.message);
        return;
      }

      toast.success(res.data.message);
      getAllNotes();
      onClose();
    } catch (error) {
      toast.error(error.message);
      console.log(error.message);
      setError(error.message);
    }
  };

  // Add Note
  const addNewNote = async () => {
    try {
      const res = await axios.post(
        "http://localhost:5000/api/note/add",
        { title, content, tags },
        { withCredentials: true }
      );

      if (res.data.success === false) {
        console.log(res.data.message);
        setError(res.data.message);
        toast.error(res.data.message);
        return;
      }

      toast.success(res.data.message);
      getAllNotes();
      onClose();
    } catch (error) {
      toast.error(error.message);
      console.log(error.message);
      setError(error.message);
    }
  };

  const handleAddNote = () => {
    if (!title) {
      setError("Please enter the title");
      return;
    }

    if (!content) {
      setError("Please enter the content");
      return;
    }

    setError("");

    if (type === "edit") {
      editNote();
    } else {
      addNewNote();
    }
  };

  return (
    <div className="relative">
      <button
        className="close-button"
        onClick={onClose}
      >
        <MdClose className="close-icon" />
      </button>
      <div className="input-section">
        <label className="input-label">Title</label>
        <input
          type="text"
          className="input-title"
          placeholder="Heading"
          value={title}
          onChange={({ target }) => setTitle(target.value)}
        />
      </div>
      <div className="input-section">
        <label className="input-label">Content</label>
        <textarea
          type="text"
          className="input-content"
          placeholder="Content..."
          rows={10}
          value={content}
          onChange={({ target }) => setContent(target.value)}
        />
      </div>
      <div className="input-section">
        <label className="input-label">Tags</label>
        <TagInput tags={tags} setTags={setTags} />
      </div>
      {error && <p className="error-message">{error}</p>}
      <button className="submit-button" onClick={handleAddNote}>
        {type === "edit" ? "UPDATE" : "Add Note"}
      </button>
    </div>
  );
};

export default AddEditNotes;