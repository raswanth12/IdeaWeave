import React, { useState, useEffect } from 'react';
import MindMap from './components/MindMap';
import axios from 'axios';

function App() {
  const [mindMaps, setMindMaps] = useState([]);
  const [title, setTitle] = useState('');
  const [nodes, setNodes] = useState([]); // For simplicity, nodes are left empty on creation

  // Fetch all mind maps when the component mounts
  useEffect(() => {
    fetchMindMaps();
  }, []);

  const fetchMindMaps = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/mindmaps');
      setMindMaps(response.data);
    } catch (error) {
      console.error('Error fetching mind maps:', error);
    }
  };

  const handleAddMindMap = async () => {
    if (!title) return;
    try {
      const response = await axios.post('http://localhost:5000/api/mindmaps', {
        title,
        nodes
      });
      setMindMaps([...mindMaps, response.data]);
      setTitle('');
      setNodes([]);
    } catch (error) {
      console.error('Error adding mind map:', error);
    }
  };

  return (
    <div style={{ padding: '1rem' }}>
      <h1>Mind Map App</h1>

      <section style={{ marginBottom: '2rem' }}>
        <h2>Create a New Mind Map</h2>
        <input
          type="text"
          placeholder="Mind Map Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          style={{ marginRight: '0.5rem', padding: '0.25rem' }}
        />
        <button onClick={handleAddMindMap}>Add Mind Map</button>
      </section>

      <section>
        <h2>Existing Mind Maps</h2>
        {mindMaps.length === 0 ? (
          <p>No mind maps available.</p>
        ) : (
          mindMaps.map((map) => (
            <div key={map._id} style={{ marginBottom: '1rem' }}>
              <MindMap mindMap={map} />
            </div>
          ))
        )}
      </section>
    </div>
  );
}

export default App;
