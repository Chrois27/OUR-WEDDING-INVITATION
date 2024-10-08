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
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    // 비디오 프리로딩
    video.preload = "auto";
    video.load();

    const handleCanPlayThrough = () => {
      setIsLoaded(true);
    };

    video.addEventListener('canplaythrough', handleCanPlayThrough);

    return () => {
      video.removeEventListener('canplaythrough', handleCanPlayThrough);
    };
  }, [videoSrc]);

  useEffect(() => {
    if (!isLoaded) return;

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

        const fixPoint = windowHeight / 3;

        setIsFixed(containerTop <= fixPoint && containerTop > -containerHeight + windowHeight);

        const totalScrollDistance = containerHeight - windowHeight + fixPoint;
        const scrolled = fixPoint - containerTop;
        const newProgress = Math.max(0, Math.min(1, scrolled / totalScrollDistance));
        
        setProgress(newProgress);

        if (video.duration) {
          video.currentTime = newProgress * video.duration;
        }

        rafId = null;
      });
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, [isLoaded]);

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
        {isLoaded && (
          <video
            ref={videoRef}
            className={styles.scrollVideo}
            src={videoSrc}
            muted
            playsInline
          />
        )}
        <div 
          className={styles.fadeOverlay}
          style={{ opacity: 1 - fadeInOutOpacity }}
        />
      </div>
    </div>
  );
};

export default ScrollVideo;