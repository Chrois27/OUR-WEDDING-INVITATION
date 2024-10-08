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
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    video.preload = "auto";
    video.load();

    const handleLoaded = () => {
      setIsLoaded(true);
      setDimensions({ width: video.videoWidth, height: video.videoHeight });
    };

    video.addEventListener('loadedmetadata', handleLoaded);

    return () => {
      video.removeEventListener('loadedmetadata', handleLoaded);
    };
  }, [videoSrc]);

  useEffect(() => {
    const handleScroll = () => {
      const container = containerRef.current;
      const video = videoRef.current;
      if (!container || !video) return;

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
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // 초기 상태 설정

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [isLoaded]);

  const fadeInOutOpacity = Math.min(1, Math.min(progress, 1 - progress) * 5);

  const calculateVideoStyle = () => {
    if (dimensions.width === 0 || dimensions.height === 0) return {};

    const videoRatio = dimensions.width / dimensions.height;
    const windowRatio = window.innerWidth / window.innerHeight;

    let width, height;

    if (videoRatio > windowRatio) {
      // 영상이 화면보다 가로로 더 긴 경우
      width = '100%';
      height = 'auto';
    } else {
      // 영상이 화면보다 세로로 더 긴 경우
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
  };

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

export default ScrollVideo;