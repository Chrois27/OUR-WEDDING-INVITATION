import React, { useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';

const App: React.FC = () => {
  useEffect(() => {
    const preventDefault = (e: Event) => {
      if (e.type === 'wheel' && !(e as WheelEvent).ctrlKey) {
        return; // 일반 스크롤은 허용
      }
      e.preventDefault();
    };

    document.addEventListener('gesturestart', preventDefault, { passive: false });
    document.addEventListener('gesturechange', preventDefault, { passive: false });
    document.addEventListener('gestureend', preventDefault, { passive: false });
    document.addEventListener('wheel', preventDefault, { passive: false });

    // 뷰포트 높이 설정 함수
    const setViewportHeight = () => {
      const vh = window.innerHeight * 0.01;
      document.documentElement.style.setProperty('--vh', `${vh}px`);
    };

    // 초기 뷰포트 높이 설정
    setViewportHeight();

    // 리사이즈 이벤트에 대한 뷰포트 높이 조정
    window.addEventListener('resize', setViewportHeight);

    return () => {
      document.removeEventListener('gesturestart', preventDefault);
      document.removeEventListener('gesturechange', preventDefault);
      document.removeEventListener('gestureend', preventDefault);
      document.removeEventListener('wheel', preventDefault);
      window.removeEventListener('resize', setViewportHeight);
    };
  }, []);

  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Home />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;