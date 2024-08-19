// Lines to import necessary dependencies, React hooks and
// the motion component from framer-motion for animations.
import React, { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";

// This defines the main App component as a functional component
const App = () => {
  // The following lines set up state variables using the useState hook:
  // - position: for the button's position
  // - windowSize: to store the current window dimensions
  // - isMobile: to determine if the device is mobile
  // - clickCount: to track the number of clicks/attempts
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [windowSize, setWindowSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });
  const [isMobile, setIsMobile] = useState(false);
  const [clickCount, setClickCount] = useState(0);

  // These create refs for the button and container
  // elements, allowing direct access to DOM elements.
  const buttonRef = useRef(null);
  const containerRef = useRef(null);

  // This useEffect hook sets up a window resize event listener.
  // It updates the windowSize state and determines if the
  // device is mobile based on window width. The effect
  // runs once on component mount and cleans up the event
  // listener on unmount.
  useEffect(() => {
    const handleResize = () => {
      const visualViewport = window.visualViewport || window;
      setWindowSize({
        width: visualViewport.width,
        height: visualViewport.height,
      });
      setIsMobile(window.innerWidth <= 768);
    };

    window.addEventListener("resize", handleResize);
    handleResize();

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  // This function calculates a new random position
  // for the button, ensuring it stays within the
  // container and moves a significant distance from its
  // previous position.
  const calculateNewPosition = () => {
    if (buttonRef.current && containerRef.current) {
      const buttonRect = buttonRef.current.getBoundingClientRect();
      const containerRect = containerRef.current.getBoundingClientRect();

      const maxX = containerRect.width - buttonRect.width;
      const maxY =
        Math.min(window.visualViewport.height, window.innerHeight) -
        buttonRect.height;

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

  // This function moves the button to a new position
  // and increments the click count.
  const moveButton = () => {
    setPosition(calculateNewPosition());
    setClickCount((prevCount) => prevCount + 1);
  };

  // This effect recalculates the button position
  // whenever the window size changes.
  useEffect(() => {
    setPosition(calculateNewPosition());
  }, [windowSize]);

  // This defines animation variants for
  // the button's hover state.
  const buttonVariants = {
    hover: {
      scale: 1.1,
      boxShadow: "0px 0px 8px rgb(255,255,255)",
    },
  };

  // This function generates a new color for the
  // button based on the click count.
  const getButtonColor = () => {
    const hue = (clickCount * 20) % 360;
    return `hsl(${hue}, 80%, 50%)`;
  };

  // The return statement contains the JSX for
  // rendering the component. It includes:
  // - A container div with styling
  // - A motion.button component with various props for
  //   positioning, styling, and handling interactions
  // - A div displaying the click count
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
          top: "20px", // Set to top with padding
          left: "20px", // Set to left with padding
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
