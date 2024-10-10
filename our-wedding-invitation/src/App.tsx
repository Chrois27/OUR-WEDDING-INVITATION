import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import LoadingScreen from './components/LoadingScreen/LoadingScreen';
import FullscreenToggle from './components/FullscreenToggle/FullscreenToggle';

const App: React.FC = () => {
  const [windowHeight, setWindowHeight] = useState(window.innerHeight);
  const [isLoading, setIsLoading] = useState(true);
  const [isFullscreen, setIsFullscreen] = useState(false);

  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };

    document.addEventListener('fullscreenchange', handleFullscreenChange);

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
    document.addEventListener('fullscreenchange', handleFullscreenChange);
    document.addEventListener('gesturestart', preventDefault, { passive: false });
    document.addEventListener('gesturechange', preventDefault, { passive: false });
    document.addEventListener('gestureend', preventDefault, { passive: false });
    document.addEventListener('wheel', preventDefault, { passive: false });

    return () => {
      window.removeEventListener('resize', setViewportHeight);
      window.removeEventListener('scroll', handleScroll);
      document.removeEventListener('fullscreenchange', handleFullscreenChange);
      document.removeEventListener('gesturestart', preventDefault);
      document.removeEventListener('gesturechange', preventDefault);
      document.removeEventListener('gestureend', preventDefault);
      document.removeEventListener('wheel', preventDefault);
    };
  }, [windowHeight]);

  const handleStart = () => {
    document.documentElement.requestFullscreen()
      .then(() => {
        setIsFullscreen(true);
        setIsLoading(false);
      })
      .catch(err => {
        console.error(`Error attempting to enable full-screen mode: ${err.message}`);
        setIsLoading(false);
      });
  };

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().then(() => setIsFullscreen(true));
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen().then(() => setIsFullscreen(false));
      }
    }
  };

  return (
    <>
      {isLoading ? (
        <LoadingScreen onStart={handleStart} />
      ) : (
        <Router>
          <div className="App" style={{ minHeight: `${windowHeight}px` }}>
            <FullscreenToggle isFullscreen={isFullscreen} toggleFullscreen={toggleFullscreen} />
            <Routes>
              <Route path="/" element={<Home />} />
            </Routes>
          </div>
        </Router>
      )}
    </>
  );
};

export default App;