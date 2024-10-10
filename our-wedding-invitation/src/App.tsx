import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';

const App: React.FC = () => {
  const [windowHeight, setWindowHeight] = useState(window.innerHeight);

  useEffect(() => {
    const preventDefault = (e: Event) => {
      if (e.type === 'wheel' && !(e as WheelEvent).ctrlKey) {
        return;
      }
      e.preventDefault();
    };

    const setViewportHeight = () => {
      const vh = window.innerHeight * 0.01;
      document.documentElement.style.setProperty('--vh', `${vh}px`);
      setWindowHeight(window.innerHeight);
    };

    const handleScroll = () => {
      if (window.innerHeight !== windowHeight) {
        setViewportHeight();
      }
    };

    setViewportHeight();

    window.addEventListener('resize', setViewportHeight);
    window.addEventListener('scroll', handleScroll);
    document.addEventListener('gesturestart', preventDefault, { passive: false });
    document.addEventListener('gesturechange', preventDefault, { passive: false });
    document.addEventListener('gestureend', preventDefault, { passive: false });
    document.addEventListener('wheel', preventDefault, { passive: false });

    return () => {
      window.removeEventListener('resize', setViewportHeight);
      window.removeEventListener('scroll', handleScroll);
      document.removeEventListener('gesturestart', preventDefault);
      document.removeEventListener('gesturechange', preventDefault);
      document.removeEventListener('gestureend', preventDefault);
      document.removeEventListener('wheel', preventDefault);
    };
  }, [windowHeight]);

  return (
    <Router>
      <div className="App" style={{ minHeight: `${windowHeight}px` }}>
        <Routes>
          <Route path="/" element={<Home />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;