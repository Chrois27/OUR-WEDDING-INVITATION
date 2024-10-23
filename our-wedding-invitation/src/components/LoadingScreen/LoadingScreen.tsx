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
      '/images/MainIMG.jpeg',
      '/images/GalleryIMG1.jpeg', 
      '/images/GalleryIMG2.jpeg',
      '/images/GalleryIMG3.jpeg',
      '/images/GalleryIMG4.jpeg',
      '/images/GalleryIMG5.JPG', 
      '/images/GalleryIMG6.JPG',
      '/images/GalleryIMG7.jpg',
      '/images/GalleryIMG8.jpeg',
      '/images/GalleryIMG9.jpeg'
    ];

    let loadedCount = 0;
    const totalCount = imageSources.length;

    const loadImage = (src: string) => {
      return new Promise<void>((resolve) => {
        const img = new Image();
        img.src = src;
        img.onload = () => {
          loadedCount++;
          setProgress((loadedCount / totalCount) * 100);
          resolve();
        };
        img.onerror = () => {
          console.warn(`Failed to load image: ${src}`);
          loadedCount++;
          setProgress((loadedCount / totalCount) * 100);
          resolve();
        };
      });
    };

    Promise.all(imageSources.map(loadImage))
      .then(() => setIsLoading(false))
      .catch(error => {
        console.error('Loading error:', error);
        setError('일부 리소스 로딩에 실패했습니다. 계속 진행하시겠습니까?');
        setIsLoading(false);
      });

  }, []);

  const handleStart = () => {
    if (!isLoading) {
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