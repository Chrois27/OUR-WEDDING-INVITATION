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
  const [videoEnded, setVideoEnded] = useState(false);
  const [shouldStopFixed, setShouldStopFixed] = useState(false);

  const handleLoaded = useCallback(() => {
    const video = videoRef.current;
    if (video) {
      setDimensions({ width: video.videoWidth, height: video.videoHeight });
    }
  }, []);

  const handleVideoEnded = useCallback(() => {
    if (isAndroid) {
      setVideoEnded(true);
    }
  }, [isAndroid]);

  const handleReplay = useCallback(() => {
    const video = videoRef.current;
    if (video) {
      video.currentTime = 0;
      video.play();
      setVideoEnded(false);
    }
  }, []);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    video.addEventListener('ended', handleVideoEnded);
    video.addEventListener('loadedmetadata', handleLoaded);

    return () => {
      video.removeEventListener('ended', handleVideoEnded);
      video.removeEventListener('loadedmetadata', handleLoaded);
    };
  }, [handleVideoEnded, handleLoaded]);

  const handleScroll = useCallback(() => {
    const container = containerRef.current;
    const video = videoRef.current;
    if (!container || !video) return;

    const rect = container.getBoundingClientRect();
    const windowHeight = window.innerHeight;
    const containerTop = rect.top;
    const containerHeight = rect.height;

    if (isAndroid) {
      const containerBottom = rect.bottom;
      
      if (containerTop <= 0 && containerBottom >= windowHeight) {
        if (!isFixed && !videoEnded && !shouldStopFixed) {
          setIsFixed(true);
          video.play().catch(console.error);
        }
      } else {
        setIsFixed(false);
      }

      if (containerBottom < 0 || containerTop > windowHeight || videoEnded) {
        setIsFixed(false);
        setShouldStopFixed(true);
      }

      if (containerTop > windowHeight) {
        setShouldStopFixed(false);
        setVideoEnded(false);
      }
    } else {
      // 웹과 iOS를 위한 스크롤 기반 비디오 제어
      const fixPoint = windowHeight / 3;
      const shouldBeFixed = containerTop <= fixPoint && containerTop > -containerHeight + windowHeight;
      
      setIsFixed(shouldBeFixed);

      const totalScrollDistance = containerHeight - windowHeight + fixPoint;
      const scrolled = fixPoint - containerTop;
      const newProgress = Math.max(0, Math.min(1, scrolled / totalScrollDistance));
      
      setProgress(newProgress);

      if (video.duration) {
        video.currentTime = newProgress * video.duration;
      }
    }
  }, [isAndroid, videoEnded, shouldStopFixed]);

  useEffect(() => {
    const throttledHandleScroll = () => {
      requestAnimationFrame(handleScroll);
    };

    window.addEventListener('scroll', throttledHandleScroll);
    throttledHandleScroll();

    return () => {
      window.removeEventListener('scroll', throttledHandleScroll);
    };
  }, [handleScroll]);

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

  // 페이드 효과 계산
  const fadeInOutOpacity = !isAndroid ? Math.min(1, Math.min(progress, 1 - progress) * 5) : 1;

  return (
    <div ref={containerRef} className={styles.scrollVideoContainer}>
      <div 
        className={`${styles.videoWrapper} ${isFixed ? styles.fixed : ''}`}
        style={{ 
          position: isFixed ? 'fixed' : 'absolute',
          top: isFixed ? '0' : 'auto',
          bottom: isFixed ? 'auto' : '0'
        }}
      >
        <video
          ref={videoRef}
          className={styles.video}
          src={videoSrc}
          muted
          playsInline
          style={calculateVideoStyle()}
        />
        {isAndroid && videoEnded && isFixed && (
          <button className={styles.replayButton} onClick={handleReplay}>
            다시보기
          </button>
        )}
        {!isAndroid && (
          <div 
            className={styles.fadeOverlay}
            style={{ opacity: 1 - fadeInOutOpacity }}
          />
        )}
      </div>
    </div>
  );
};

export default React.memo(ScrollVideo);