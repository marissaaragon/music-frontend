import React, { useEffect, useState } from 'react';

function MusicList() {
  const [songs, setSongs] = useState([]);

  useEffect(() => {
    fetch('http://localhost:8080/api/music')
      .then(res => res.json())
      .then(data => setSongs(data))
      .catch(err => console.error('Error fetching songs:', err));
  }, []);

  return (
    <div>
      <h2>All Songs</h2>
      {songs.length === 0 ? (
        <p>No songs found.</p>
      ) : (
        <ul>
          {songs.map(song => (
            <li key={song.id}>
              <strong>{song.title}</strong> by {song.artist}
            </li>
          ))}
        </ul>
      )}
    </div>
  );

}

export default MusicList;
