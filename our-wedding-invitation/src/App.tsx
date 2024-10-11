import React, { useEffect, useState, useRef } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import LoadingScreen from './components/LoadingScreen/LoadingScreen';

const App: React.FC = () => {
  const [windowHeight, setWindowHeight] = useState(window.innerHeight);
  const [isLoading, setIsLoading] = useState(true);
  const scrollPositionRef = useRef(0);

  useEffect(() => {
    const setViewportHeight = () => {
      const vh = window.innerHeight * 0.01;
      document.documentElement.style.setProperty('--vh', `${vh}px`);
      
      // 현재 스크롤 위치 저장
      scrollPositionRef.current = window.scrollY;
      
      setWindowHeight(window.innerHeight);
      
      // setTimeout을 사용하여 레이아웃 변경 후 스크롤 위치 복원
      setTimeout(() => {
        window.scrollTo(0, scrollPositionRef.current);
      }, 0);
    };

    const handleScroll = () => {
      scrollPositionRef.current = window.scrollY;
    };

    const preventDefault = (e: Event) => {
      if (e.type === 'wheel' && !(e as WheelEvent).ctrlKey) {
        return;
      }
      e.preventDefault();
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
  }, []);

  const handleStart = () => {
    setIsLoading(false);
  };

  return (
    <>
      {isLoading ? (
        <LoadingScreen onStart={handleStart} />
      ) : (
        <Router>
          <div className="App" style={{ minHeight: `${windowHeight}px` }}>
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