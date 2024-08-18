import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';

const App = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [windowSize, setWindowSize] = useState({ width: window.innerWidth, height: window.innerHeight });
  const [isMobile, setIsMobile] = useState(false);
  const [clickCount, setClickCount] = useState(0);
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
      setClickCount(prevCount => prevCount + 1);
    }
  };

  useEffect(() => {
    moveButton();
  }, [windowSize]);

  const buttonVariants = {
    hover: {
      scale: 1.1,
      boxShadow: "0px 0px 8px rgb(255,255,255)",
    }
  };

  const getButtonColor = () => {
    const hue = (clickCount * 20) % 360;
    return `hsl(${hue}, 80%, 50%)`;
  };

  return (
    <div style={{
      height: '100vh',
      width: '100vw',
      position: 'relative',
      overflow: 'hidden',
      background: 'linear-gradient(135deg, #1e3c72 0%, #2a5298 100%)',
      fontFamily: 'Arial, sans-serif'
    }}>
      <motion.button
        ref={buttonRef}
        style={{
          position: 'absolute',
          padding: '15px 30px',
          backgroundColor: getButtonColor(),
          color: 'white',
          border: 'none',
          borderRadius: '25px',
          cursor: 'pointer',
          fontSize: '18px',
          fontWeight: 'bold',
          userSelect: 'none',
          touchAction: 'none',
        }}
        initial={false}
        animate={{ x: position.x, y: position.y }}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
        variants={buttonVariants}
        whileHover="hover"
        onMouseEnter={isMobile ? undefined : moveButton}
        onClick={isMobile ? moveButton : undefined}
        onTouchEnd={isMobile ? (e) => { e.preventDefault(); moveButton(); } : undefined}
      >
        Prova a cliccarmi 😉
      </motion.button>
      <div style={{
        position: 'absolute',
        bottom: '20px',
        left: '20px',
        color: 'white',
        fontSize: '18px'
      }}>
        Tentativi: {clickCount}
      </div>
    </div>
  );
};

export default App;