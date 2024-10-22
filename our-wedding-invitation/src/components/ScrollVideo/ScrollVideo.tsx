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
  const [loadError, setLoadError] = useState<string | null>(null);
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

    video.preload = "auto";

    const handleCanPlayThrough = () => {
      setIsLoaded(true);
      handleLoaded();
    };

    const handleError = () => {
      setLoadError("비디오 로딩에 실패했습니다. 스크롤하여 계속 진행할 수 있습니다.");
    };

    video.addEventListener('canplaythrough', handleCanPlayThrough);
    video.addEventListener('error', handleError);
    video.load();

    return () => {
      video.removeEventListener('canplaythrough', handleCanPlayThrough);
      video.removeEventListener('error', handleError);
    };
  }, [videoSrc, handleLoaded]);

  const handleScroll = useCallback(() => {
    const container = containerRef.current;
    const video = videoRef.current;
    if (!container || !video) return;

    const rect = container.getBoundingClientRect();
    const windowHeight = window.innerHeight;
    const containerBottom = rect.bottom;
    const containerHeight = rect.height;

    // 화면 하단을 기준으로 고정 여부 결정
    const bottomFixPoint = windowHeight * 2/3;
    setIsFixed(containerBottom >= bottomFixPoint && containerBottom <= containerHeight);

    // 스크롤 진행도 계산을 하단 기준으로 변경
    const totalScrollDistance = containerHeight - windowHeight;
    const scrolled = window.pageYOffset + windowHeight - rect.top;
    const newProgress = Math.max(0, Math.min(1, scrolled / totalScrollDistance));
    
    setProgress(newProgress);

    if (video.duration && isLoaded) {
      video.currentTime = newProgress * video.duration;
    }
  }, [isLoaded]);

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
      objectFit: 'contain' as const,
      position: 'relative' as const,
      bottom: 0
    };
  }, [dimensions]);

  return (
    <div ref={containerRef} className={styles.scrollVideoContainer}>
      <div 
        className={`${styles.scrollVideoWrapper} ${isFixed ? styles.fixed : ''}`}
        style={{
          position: isFixed ? 'fixed' : 'absolute',
          bottom: isFixed ? '0' : 'auto',
          top: isFixed ? 'auto' : '0'
        }}
      >
        {loadError ? (
          <div className={styles.errorMessage}>{loadError}</div>
        ) : (
          <>
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
          </>
        )}
        <div 
          className={styles.fadeOverlay}
          style={{ opacity: 1 - fadeInOutOpacity }}
        />
      </div>
    </div>
  );
};

export default React.memo(ScrollVideo);