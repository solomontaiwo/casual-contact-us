import React, { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";

const App = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [windowSize, setWindowSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });
  const [isMobile, setIsMobile] = useState(false);
  const [clickCount, setClickCount] = useState(0);
  const [counterPosition, setCounterPosition] = useState(20);
  const buttonRef = useRef(null);
  const containerRef = useRef(null);

  useEffect(() => {
    const handleResize = () => {
      const visualViewport = window.visualViewport || window;
      setWindowSize({
        width: visualViewport.width,
        height: visualViewport.height,
      });
      setIsMobile(window.innerWidth <= 768);

      // Adjust the counter's bottom position based on the available viewport height
      const adjustedBottom =
        Math.min(visualViewport.height, window.innerHeight) - 40; // Adjust value to keep counter visible
      setCounterPosition(adjustedBottom);
    };

    window.addEventListener("resize", handleResize);
    handleResize();

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const calculateNewPosition = () => {
    if (buttonRef.current && containerRef.current) {
      const buttonRect = buttonRef.current.getBoundingClientRect();
      const containerRect = containerRef.current.getBoundingClientRect();

      const maxX = containerRect.width - buttonRect.width;
      const maxY =
        Math.min(window.visualViewport.height, window.innerHeight) -
        buttonRect.height; // Use visualViewport or innerHeight

      const padding = 10;

      let newX, newY;
      do {
        newX = Math.random() * (maxX - 2 * padding) + padding;
        newY = Math.random() * (maxY - 2 * padding) + padding;
      } while (
        Math.abs(newX - position.x) < maxX / 3 &&
        Math.abs(newY - position.y) < maxY / 3
      );

      return { x: newX, y: newY };
    }
    return { x: 0, y: 0 };
  };

  const moveButton = () => {
    setPosition(calculateNewPosition());
    setClickCount((prevCount) => prevCount + 1);
  };

  useEffect(() => {
    setPosition(calculateNewPosition());
  }, [windowSize]);

  const buttonVariants = {
    hover: {
      scale: 1.1,
      boxShadow: "0px 0px 8px rgb(255,255,255)",
    },
  };

  const getButtonColor = () => {
    const hue = (clickCount * 20) % 360;
    return `hsl(${hue}, 80%, 50%)`;
  };

  return (
    <div
      ref={containerRef}
      style={{
        height: "100vh",
        width: "100vw",
        position: "fixed",
        top: 0,
        left: 0,
        overflow: "hidden",
        background: "linear-gradient(135deg, #1e3c72 0%, #2a5298 100%)",
        fontFamily: "Arial, sans-serif",
      }}
    >
      <motion.button
        ref={buttonRef}
        style={{
          position: "absolute",
          padding: "15px 30px",
          backgroundColor: getButtonColor(),
          color: "white",
          border: "none",
          borderRadius: "25px",
          cursor: "pointer",
          fontSize: "18px",
          fontWeight: "bold",
          userSelect: "none",
          touchAction: "none",
        }}
        initial={false}
        animate={{ x: position.x, y: position.y }}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
        variants={buttonVariants}
        whileHover="hover"
        onMouseEnter={isMobile ? undefined : moveButton}
        onClick={isMobile ? moveButton : undefined}
        onTouchEnd={
          isMobile
            ? (e) => {
                e.preventDefault();
                moveButton();
              }
            : undefined
        }
      >
        Prova a cliccarmi 😉
      </motion.button>
      <div
        style={{
          position: "absolute",
          bottom: `${counterPosition}px`, // Use dynamically calculated position
          left: "20px",
          color: "white",
          fontSize: "18px",
          padding: "10px",
          background: "rgba(0, 0, 0, 0.5)",
          borderRadius: "5px",
          zIndex: 1000,
        }}
      >
        Tentativi: {clickCount}
      </div>
    </div>
  );
};

export default App;
