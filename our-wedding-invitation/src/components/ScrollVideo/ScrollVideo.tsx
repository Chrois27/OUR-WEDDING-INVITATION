import React, { useRef, useEffect } from 'react';
import styles from './ScrollVideo.module.scss';

interface ScrollVideoProps {
  videoSrc: string;
}

const ScrollVideo: React.FC<ScrollVideoProps> = ({ videoSrc }) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    const container = containerRef.current;
    if (!video || !container) return;

    const handleScroll = () => {
      const { top, height } = container.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      
      if (top <= windowHeight && top > -height) {
        const scrollPosition = windowHeight - top;
        const scrollPercentage = scrollPosition / (windowHeight + height);
        
        video.currentTime = video.duration * scrollPercentage;
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div ref={containerRef} className={styles.scrollVideoContainer}>
      <video 
        ref={videoRef} 
        className={styles.video}
        src={videoSrc} 
        muted 
        playsInline
      />
    </div>
  );
};

export default ScrollVideo;