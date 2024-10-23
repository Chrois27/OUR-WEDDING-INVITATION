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
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
  const [isAndroid] = useState(() => {
    const userAgent = navigator.userAgent.toLowerCase();
    return userAgent.includes('android');
  });

  const handleLoaded = useCallback(() => {
    const video = videoRef.current;
    if (video) {
      setDimensions({ width: video.videoWidth, height: video.videoHeight });
    }
  }, []);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    if (isAndroid) {
      video.controls = false;
      video.play().catch(console.error);
      return;
    }

    video.preload = "auto";
    video.addEventListener('loadedmetadata', handleLoaded);
    video.load();

    return () => {
      video.removeEventListener('loadedmetadata', handleLoaded);
    };
  }, [videoSrc, handleLoaded, isAndroid]);

  const handleScroll = useCallback(() => {
    if (isAndroid) return;

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
  }, [isAndroid]);

  useEffect(() => {
    if (isAndroid) return;

    const throttledHandleScroll = () => {
      requestAnimationFrame(handleScroll);
    };

    window.addEventListener('scroll', throttledHandleScroll);
    throttledHandleScroll();

    return () => {
      window.removeEventListener('scroll', throttledHandleScroll);
    };
  }, [handleScroll, isAndroid]);

  const calculateVideoStyle = useCallback(() => {
    if (isAndroid) {
      return {
        width: '100%',
        height: '100vh',
        objectFit: 'cover' as const,
        position: 'fixed' as const,
        top: 0,
        left: 0,
        zIndex: 1
      };
    }

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
  }, [dimensions, isAndroid]);

  if (isAndroid) {
    return (
      <div className={styles.androidContainer}>
        <video
          ref={videoRef}
          className={styles.androidVideo}
          src={videoSrc}
          muted
          playsInline
          loop
          autoPlay
          style={calculateVideoStyle()}
        />
      </div>
    );
  }

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
          style={calculateVideoStyle()}
        />
        <div 
          className={styles.fadeOverlay}
          style={{ opacity: 1 - fadeInOutOpacity }}
        />
      </div>
    </div>
  );
};

export default React.memo(ScrollVideo);