import React, { useState } from 'react';

const App = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const handleMouseEnter = () => {
    const newX = Math.random() * (window.innerWidth - 100);
    const newY = Math.random() * (window.innerHeight - 40);
    setPosition({ x: newX, y: newY });
  };

  return (
    <div style={{ height: '100vh', position: 'relative' }}>
      <button
        style={{
          position: 'absolute',
          left: `${position.x}px`,
          top: `${position.y}px`,
          padding: '10px 20px',
          backgroundColor: '#007bff',
          color: 'white',
          border: 'none',
          borderRadius: '5px',
          cursor: 'pointer',
          transition: 'all 0.3s ease',
        }}
        onMouseEnter={handleMouseEnter}
      >
        Contact Us
      </button>
    </div>
  );
};

export default App;