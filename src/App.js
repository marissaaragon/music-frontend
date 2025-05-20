import React, { useState, useEffect } from 'react';
import AddMusicForm from './AddMusicForm';
import EditMusicForm from './EditMusicForm';
import './AddMusicForm.css';
import './App.css';

function App() {
  const [songs, setSongs] = useState([]);
  const [editingSong, setEditingSong] = useState(null);

  useEffect(() => {
    fetchSongs();
  }, []);

  const fetchSongs = () => {
    fetch('http://localhost:8080/api/music')
      .then(res => res.json())
      .then(data => setSongs(data))
      .catch(err => console.error('Error fetching songs:', err));
  };

  const handleDelete = (id) => {
    fetch(`http://localhost:8080/api/music/${id}`, {
      method: 'DELETE',
    })
      .then(() => {
        setSongs(prev => prev.filter(song => song.id !== id));
      })
      .catch(err => console.error('Delete failed:', err));
  };

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial' }}>
      <h1><b>Music Collection - Add Your Favorite Songs</b></h1>

      <AddMusicForm onSongAdded={fetchSongs} />

      <div className="song-list-container">
    <h2>Song List</h2>
      {songs.map(song => (
      <div key={song.id} className="song-item">
      <div className="song-info">
        <strong>{song.title}</strong> by {song.artist} ({song.releaseYear}) ({song.genre})
      </div>
      <div className="song-buttons">
        <button onClick={() => setEditingSong(song)}>Edit</button>
        <button onClick={() => handleDelete(song.id)}>Delete</button>
      </div>
    </div>
    ))}
  </div>


      {editingSong && (
        <EditMusicForm
          song={editingSong}
          onClose={() => setEditingSong(null)}
          onUpdate={fetchSongs}
        />
      )}
    </div>
  );
}

export default App;
