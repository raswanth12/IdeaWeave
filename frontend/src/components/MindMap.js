import React from 'react';

function MindMap({ mindMap }) {
  return (
    <div style={{ border: '1px solid #ccc', padding: '1rem' }}>
      <h3>{mindMap.title}</h3>
      {mindMap.nodes && mindMap.nodes.length > 0 ? (
        <ul>
          {mindMap.nodes.map((node, index) => (
            <li key={index}>{node.content}</li>
          ))}
        </ul>
      ) : (
        <p>No nodes available.</p>
      )}
    </div>
  );
}

export default MindMap;
