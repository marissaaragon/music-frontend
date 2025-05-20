import React, { useState } from 'react';

function AddMusicForm({ onSongAdded }) {
  const [formData, setFormData] = useState({
    title: '',
    artist: '',
    album: '',
    genre: '',
    releaseYear: '',
  });

  const handleChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    fetch('http://localhost:8080/api/music', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData)
    })
      .then(res => res.json())
      .then(data => {
        alert("Song added!");
        onSongAdded(); // Refresh song list
        setFormData({
          title: '',
          artist: '',
          album: '',
          genre: '',
          releaseYear: '',
        });
      })
      .catch(err => console.error("Error adding song:", err));
  };

  return (
    <div className="add-music-form">
    <form onSubmit={handleSubmit} style={{ marginBottom: '20px' }}>
      <h2>Add a New Song</h2>
      <input name="title" placeholder="Title" value={formData.title} onChange={handleChange} required />
      <input name="artist" placeholder="Artist" value={formData.artist} onChange={handleChange} required />
      <input name="album" placeholder="Album" value={formData.album} onChange={handleChange} />
      <input name="genre" placeholder="Genre" value={formData.genre} onChange={handleChange} />
      <input name="releaseYear" placeholder="Release Year" type="number" value={formData.releaseYear} onChange={handleChange} />
      <button type="submit">Submit</button>
    </form>
    </div>
  );
}

export default AddMusicForm;
