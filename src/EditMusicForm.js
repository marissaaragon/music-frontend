import React, { useState } from 'react';

function EditMusicForm({ song, onClose, onUpdate }) {
  const [formData, setFormData] = useState({ ...song });

  const handleChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    fetch(`http://localhost:8080/api/music/${song.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData)
    })
      .then(res => res.json())
      .then(data => {
        alert("Song updated!");
        onUpdate(); // refresh list
        onClose();  // close form
      })
      .catch(err => console.error("Error updating song:", err));
  };

  return (
    <form onSubmit={handleSubmit}>
      <h3>Edit Song</h3>
      <input name="title" value={formData.title} onChange={handleChange} />
      <input name="artist" value={formData.artist} onChange={handleChange} />
      <input name="album" value={formData.album} onChange={handleChange} />
      <input name="genre" value={formData.genre} onChange={handleChange} />
      <input name="releaseYear" value={formData.releaseYear} onChange={handleChange} />
      <button type="submit">Update</button>
      <button type="button" onClick={onClose}>Cancel</button>
    </form>
  );
}

export default EditMusicForm;
