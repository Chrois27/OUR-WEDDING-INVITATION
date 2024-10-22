import React, { useRef, useEffect, useState, useCallback } from 'react';
import styles from './ScrollVideo.module.scss';

interface ScrollVideoProps {
  videoSrc: string;
}

const ScrollVideo: React.FC<ScrollVideoProps> = ({ videoSrc }) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const scrollRAFRef = useRef<number>();
  const resizeTimeoutRef = useRef<NodeJS.Timeout>();
  const lastScrollY = useRef(0);
  const ticking = useRef(false);
  
  const [isFixed, setIsFixed] = useState(false);
  const [progress, setProgress] = useState(0);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
  const [isAndroid] = useState(() => {
    const userAgent = navigator.userAgent.toLowerCase();
    return userAgent.includes('android');
  });

  const updateVideoProgress = useCallback((scrollPos: number) => {
    const container = containerRef.current;
    const video = videoRef.current;
    if (!container || !video) return;

    const rect = container.getBoundingClientRect();
    const windowHeight = window.visualViewport?.height || window.innerHeight;
    const containerTop = rect.top;
    const containerHeight = rect.height;
    
    const fixPoint = windowHeight / 3;
    const isFixedNow = containerTop <= fixPoint && containerTop > -containerHeight + windowHeight;
    
    if (isFixedNow !== isFixed) {
      setIsFixed(isFixedNow);
    }

    const totalScrollDistance = containerHeight - windowHeight + fixPoint;
    const scrolled = fixPoint - containerTop;
    const newProgress = Math.max(0, Math.min(1, scrolled / totalScrollDistance));
    
    setProgress(newProgress);

    if (video.duration) {
      video.currentTime = newProgress * video.duration;
    }

    ticking.current = false;
  }, [isFixed]);

  const handleScroll = useCallback(() => {
    if (isAndroid) return;
    
    const currentScrollY = window.scrollY;
    if (lastScrollY.current !== currentScrollY && !ticking.current) {
      ticking.current = true;
      scrollRAFRef.current = requestAnimationFrame(() => {
        updateVideoProgress(currentScrollY);
        lastScrollY.current = currentScrollY;
      });
    }
  }, [isAndroid, updateVideoProgress]);

  const handleResize = useCallback(() => {
    if (resizeTimeoutRef.current) {
      clearTimeout(resizeTimeoutRef.current);
    }
    
    resizeTimeoutRef.current = setTimeout(() => {
      const video = videoRef.current;
      if (video) {
        setDimensions({ 
          width: video.videoWidth, 
          height: video.videoHeight 
        });
        handleScroll();
      }
    }, 100);
  }, [handleScroll]);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    if (isAndroid) {
      video.play().catch(console.error);
      return;
    }

    video.addEventListener('loadedmetadata', () => {
      setDimensions({ 
        width: video.videoWidth, 
        height: video.videoHeight 
      });
    });

    window.addEventListener('scroll', handleScroll, { passive: true });
    window.visualViewport?.addEventListener('resize', handleResize);
    window.addEventListener('resize', handleResize);

    return () => {
      if (scrollRAFRef.current) {
        cancelAnimationFrame(scrollRAFRef.current);
      }
      if (resizeTimeoutRef.current) {
        clearTimeout(resizeTimeoutRef.current);
      }
      window.removeEventListener('scroll', handleScroll);
      window.visualViewport?.removeEventListener('resize', handleResize);
      window.removeEventListener('resize', handleResize);
    };
  }, [isAndroid, handleScroll, handleResize]);

  const calculateVideoStyle = useCallback(() => {
    if (isAndroid) {
      return {
        width: '100%',
        height: '100vh',
        objectFit: 'cover' as const,
      };
    }

    if (dimensions.width === 0 || dimensions.height === 0) return {};

    const videoRatio = dimensions.width / dimensions.height;
    const windowRatio = window.innerWidth / (window.visualViewport?.height || window.innerHeight);

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
      objectFit: 'contain' as const,
      transform: 'translateZ(0)',
      willChange: 'transform'
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
          bottom: isFixed ? 'auto' : '0',
          transform: 'translateZ(0)',
          willChange: 'transform'
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