import React, { useRef, useEffect, useState, useCallback } from 'react';
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
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });

  const handleLoaded = useCallback(() => {
    const video = videoRef.current;
    if (video) {
      setIsLoaded(true);
      setDimensions({ width: video.videoWidth, height: video.videoHeight });
    }
  }, []);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    video.preload = "metadata";
    video.load();

    video.addEventListener('loadedmetadata', handleLoaded);

    return () => {
      video.removeEventListener('loadedmetadata', handleLoaded);
    };
  }, [videoSrc, handleLoaded]);

  const handleScroll = useCallback(() => {
    const container = containerRef.current;
    const video = videoRef.current;
    if (!container || !video) return;

    const rect = container.getBoundingClientRect();
    const windowHeight = window.innerHeight;
    const containerTop = rect.top;
    const containerHeight = rect.height;

    const fixPoint = windowHeight / 3;

    const isVideoFixed = containerTop <= fixPoint && containerTop > -containerHeight + windowHeight;
    setIsFixed(isVideoFixed);

    const totalScrollDistance = containerHeight - windowHeight + fixPoint;
    const scrolled = Math.max(0, fixPoint - containerTop);
    const newProgress = Math.min(1, scrolled / totalScrollDistance);
    
    setProgress(newProgress);

    if (video.duration) {
      video.currentTime = newProgress * video.duration;
    }
  }, []);

  useEffect(() => {
    const throttledHandleScroll = () => {
      requestAnimationFrame(handleScroll);
    };

    window.addEventListener('scroll', throttledHandleScroll);
    throttledHandleScroll(); // 초기 상태 설정

    return () => {
      window.removeEventListener('scroll', throttledHandleScroll);
    };
  }, [handleScroll]);

  const fadeInOutOpacity = Math.min(1, Math.min(progress, 1 - progress) * 5);

  const calculateVideoStyle = useCallback(() => {
    if (dimensions.width === 0 || dimensions.height === 0) return {};

    const videoRatio = dimensions.width / dimensions.height;
    const windowRatio = window.innerWidth / window.innerHeight;

    let width, height;

    if (videoRatio > windowRatio) {
      width = '100%';
      height = 'auto';
    } else {
      width = 'auto';
      height = '100%';
    }

    return { 
      width, 
      height,
      maxWidth: '100%',
      maxHeight: '100%',
      objectFit: 'contain' as const
    };
  }, [dimensions]);

  return (
    <div ref={containerRef} className={styles.scrollVideoContainer}>
      <div 
        className={`${styles.scrollVideoWrapper} ${isFixed ? styles.fixed : ''}`}
        style={{ 
          position: isFixed ? 'fixed' : 'absolute',
          top: isFixed ? '0' : 'auto',
          bottom: isFixed ? 'auto' : '0',
          left: '0',
          right: '0'
        }}
      >
        <video
          ref={videoRef}
          className={styles.scrollVideo}
          src={videoSrc}
          muted
          playsInline
          style={{
            ...calculateVideoStyle(),
            display: isLoaded ? 'block' : 'none'
          }}
        />
        {!isLoaded && <div className={styles.loadingPlaceholder}>Loading...</div>}
        <div 
          className={styles.fadeOverlay}
          style={{ opacity: 1 - fadeInOutOpacity }}
        />
      </div>
    </div>
  );
};

export default React.memo(ScrollVideo);