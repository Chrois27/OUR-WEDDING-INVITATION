import React, { useState, useEffect } from 'react';
import styles from './LoadingScreen.module.scss';

interface LoadingScreenProps {
  onStart: () => void;
}

const LoadingScreen: React.FC<LoadingScreenProps> = ({ onStart }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState<string | null>(null);

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

    const imagePromises = imageSources.map(src => {
      return new Promise<void>((resolve, reject) => {
        const img = new Image();
        img.src = src;
        img.onload = () => {
          updateProgress();
          resolve();
        };
        img.onerror = () => reject(`Failed to load image: ${src}`);
      });
    });

    const videoPromise = new Promise<void>((resolve, reject) => {
      const video = document.createElement('video');
      video.preload = 'auto';
      video.src = videoSource;

      let loaded = false;

      video.onloadeddata = () => {
        if (!loaded) {
          loaded = true;
          updateProgress();
          resolve();
        }
      };

      video.oncanplaythrough = () => {
        if (!loaded) {
          loaded = true;
          updateProgress();
          resolve();
        }
      };

      video.onerror = () => reject(`Failed to load video: ${videoSource}`);
    });

    const timeoutPromise = new Promise<void>((_, reject) => {
      setTimeout(() => reject('Loading timed out'), 30000); // 30 seconds timeout
    });

    Promise.race([
      Promise.all([...imagePromises, videoPromise]),
      timeoutPromise
    ])
      .then(() => setIsLoading(false))
      .catch(error => {
        console.error('Loading error:', error);
        setError('리소스 로딩 중 오류가 발생했습니다. 새로고침을 해주세요.');
        setIsLoading(false);
      });
  }, []);

  const handleStart = () => {
    if (!isLoading && !error) {
      onStart();
    }
  };

  return (
    <div className={styles.loadingScreen}>
      {isLoading ? (
        <div className={styles.loader}>
          <p>Loading... {progress.toFixed(0)}%</p>
        </div>
      ) : error ? (
        <div className={styles.error}>
          <p>{error}</p>
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