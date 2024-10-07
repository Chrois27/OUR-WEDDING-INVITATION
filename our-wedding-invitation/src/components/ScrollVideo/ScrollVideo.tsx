import React, { useRef, useEffect, useState } from 'react';
import styles from './ScrollVideo.module.scss';

interface ScrollVideoProps {
  videoSrc: string;
}

const ScrollVideo: React.FC<ScrollVideoProps> = ({ videoSrc }) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [isFixed, setIsFixed] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const video = videoRef.current;
    const container = containerRef.current;
    if (!video || !container) return;

    let rafId: number | null = null;

    const handleScroll = () => {
      if (rafId) return;

      rafId = requestAnimationFrame(() => {
        const rect = container.getBoundingClientRect();
        const windowHeight = window.innerHeight;
        const containerTop = rect.top;
        const containerHeight = rect.height;

        // 고정 시작 지점 (화면의 1/3 지점)
        const fixPoint = windowHeight / 3;

        // 고정 여부 결정
        setIsFixed(containerTop <= fixPoint && containerTop > -containerHeight + windowHeight);

        // 진행도 계산
        const totalScrollDistance = containerHeight - windowHeight + fixPoint;
        const scrolled = fixPoint - containerTop;
        const newProgress = Math.max(0, Math.min(1, scrolled / totalScrollDistance));
        
        setProgress(newProgress);

        // 비디오 시간 업데이트
        if (video.duration) {
          video.currentTime = newProgress * video.duration;
        }

        rafId = null;
      });
    };

    window.addEventListener('scroll', handleScroll);
    video.addEventListener('loadedmetadata', handleScroll);

    // 초기 상태 설정
    handleScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
      video.removeEventListener('loadedmetadata', handleScroll);
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, []);

  // 페이드 인/아웃을 위한 오버레이 불투명도 계산
  const fadeInOutOpacity = Math.min(1, Math.min(progress, 1 - progress) * 5);

  return (
    <div ref={containerRef} className={styles.scrollVideoContainer}>
      <div 
        className={`${styles.scrollVideoWrapper} ${isFixed ? styles.fixed : ''}`}
        style={{ 
          position: isFixed ? 'fixed' : 'absolute',
          top: isFixed ? '0' : 'auto',
          bottom: isFixed ? 'auto' : '0'
        }}
      >
        <video
          ref={videoRef}
          className={styles.scrollVideo}
          src={videoSrc}
          muted
          playsInline
        />
        <div 
          className={styles.fadeOverlay}
          style={{ opacity: 1 - fadeInOutOpacity }}
        />
      </div>
    </div>
  );
};

export default ScrollVideo;