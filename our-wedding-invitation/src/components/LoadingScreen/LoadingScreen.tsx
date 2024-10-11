import React, { useState, useEffect, useRef } from 'react';
import styles from './LoadingScreen.module.scss';

interface LoadingScreenProps {
  onStart: () => void;
}

const LoadingScreen: React.FC<LoadingScreenProps> = ({ onStart }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState<string | null>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const imageSources = [
      '/images/MainIMG.png',
      '/images/GalleryIMG1.png',
      '/images/GalleryIMG2.png',
      '/images/GalleryIMG3.png',
      '/images/GalleryIMG4.png',
      '/images/GalleryIMG5.png',
      '/images/GalleryIMG6.png'
    ];

    const videoSource = '/videos/ourStory.mov';

    let loadedCount = 0;
    const totalCount = imageSources.length + 1; // Images + Video

    const updateProgress = () => {
      loadedCount++;
      setProgress((loadedCount / totalCount) * 100);
    };

    const loadImage = (src: string) => {
      return new Promise<void>((resolve) => {
        const img = new Image();
        img.src = src;
        img.onload = () => {
          updateProgress();
          resolve();
        };
        img.onerror = () => {
          console.warn(`Failed to load image: ${src}`);
          updateProgress();
          resolve();
        };
      });
    };

    const loadVideo = () => {
      return new Promise<void>((resolve) => {
        if (videoRef.current) {
          const video = videoRef.current;
          video.preload = 'auto';
          video.src = videoSource;

          const handleLoaded = () => {
            updateProgress();
            resolve();
          };

          video.addEventListener('canplay', handleLoaded, { once: true });
          video.addEventListener('error', () => {
            console.warn('Video loading failed, but continuing...');
            updateProgress();
            resolve();
          });

          // 이미 'canplay' 상태라면 즉시 resolve
          if (video.readyState >= 3) {
            handleLoaded();
          }
        } else {
          console.warn('Video element not found');
          updateProgress();
          resolve();
        }
      });
    };

    Promise.all([
      ...imageSources.map(loadImage),
      loadVideo()
    ]).then(() => {
      setIsLoading(false);
    }).catch(error => {
      console.error('Loading error:', error);
      setError('일부 리소스 로딩에 실패했습니다. 계속 진행하시겠습니까?');
      setIsLoading(false);
    });

  }, []);

  const handleStart = () => {
    if (!isLoading) {
      if (videoRef.current) {
        videoRef.current.play().catch(e => console.error('Video playback failed', e));
      }
      onStart();
    }
  };

  return (
    <div className={styles.loadingScreen}>
      <video ref={videoRef} style={{ display: 'none' }} playsInline />
      {isLoading ? (
        <div className={styles.loader}>
          <p>Loading... {progress.toFixed(0)}%</p>
        </div>
      ) : error ? (
        <div className={styles.error}>
          <p>{error}</p>
          <button onClick={handleStart}>계속하기</button>
          <button onClick={() => window.location.reload()}>새로고침</button>
        </div>
      ) : (
        <div className={styles.startContainer}>
          <button className={styles.startButton} onClick={handleStart}>
            시작하기
          </button>
          <p className={styles.startInfo}>
            모바일 청첩장을 시작합니다.
          </p>
        </div>
      )}
    </div>
  );
};

export default LoadingScreen;