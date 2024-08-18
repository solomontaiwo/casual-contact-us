import React, { useState, useEffect, useRef } from 'react';

const App = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [windowSize, setWindowSize] = useState({ width: window.innerWidth, height: window.innerHeight });
  const [isMobile, setIsMobile] = useState(false);
  const buttonRef = useRef(null);

  useEffect(() => {
    const handleResize = () => {
      setWindowSize({ width: window.innerWidth, height: window.innerHeight });
      setIsMobile(window.innerWidth <= 768);
    };

    window.addEventListener('resize', handleResize);
    handleResize();

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const moveButton = () => {
    if (buttonRef.current) {
      const buttonWidth = buttonRef.current.offsetWidth;
      const buttonHeight = buttonRef.current.offsetHeight;

      const maxX = windowSize.width - buttonWidth;
      const maxY = windowSize.height - buttonHeight;

      const newX = Math.max(0, Math.min(maxX, Math.random() * maxX));
      const newY = Math.max(0, Math.min(maxY, Math.random() * maxY));

      setPosition({ x: newX, y: newY });
    }
  };

  useEffect(() => {
    moveButton();
  }, [windowSize]);

  return (
    <div style={{ height: '100vh', width: '100vw', position: 'relative', overflow: 'hidden' }}>
      <button
        ref={buttonRef}
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