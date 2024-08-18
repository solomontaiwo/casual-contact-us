import React, { useState, useEffect } from 'react';

const App = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [windowSize, setWindowSize] = useState({ width: window.innerWidth, height: window.innerHeight });
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setWindowSize({ width: window.innerWidth, height: window.innerHeight });
      setIsMobile(window.innerWidth <= 768); // Assuming 768px as the breakpoint for mobile devices
    };

    window.addEventListener('resize', handleResize);
    handleResize(); // Call once to set initial state

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const moveButton = () => {
    const newX = Math.random() * (windowSize.width - 150);
    const newY = Math.random() * (windowSize.height - 60);
    setPosition({ x: newX, y: newY });
  };

  useEffect(() => {
    moveButton();
  }, [windowSize]);

  return (
    <div style={{ height: '100vh', width: '100vw', position: 'relative', overflow: 'hidden' }}>
      <button
        style={{
          position: 'absolute',
          left: `${position.x}px`,
          top: `${position.y}px`,
          padding: '15px 30px',
          backgroundColor: '#007bff',
          color: 'white',
          border: 'none',
          borderRadius: '5px',
          cursor: 'pointer',
          transition: 'all 0.3s ease',
          fontSize: '16px',
          userSelect: 'none',
          touchAction: 'none',
        }}
        onMouseEnter={isMobile ? undefined : moveButton}
        onClick={isMobile ? moveButton : undefined}
        onTouchEnd={isMobile ? (e) => { e.preventDefault(); moveButton(); } : undefined}
      >
        Prova a cliccarmi 😉
      </button>
    </div>
  );
};

export default App;