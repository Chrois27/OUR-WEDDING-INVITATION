import React, { useState, useEffect } from 'react';
import styles from './LoadingScreen.module.scss';

interface LoadingScreenProps {
  onStart: () => void;
}

const LoadingScreen: React.FC<LoadingScreenProps> = ({ onStart }) => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const imagePromises = [
      '/images/MainIMG.png',
      '/images/GalleryIMG1.png',
      '/images/GalleryIMG2.png',
      '/images/GalleryIMG3.png',
      '/images/GalleryIMG4.png',
      '/images/GalleryIMG5.png',
      '/images/GalleryIMG6.png'
    ].map(src => {
      return new Promise((resolve, reject) => {
        const img = new Image();
        img.src = src;
        img.onload = resolve;
        img.onerror = reject;
      });
    });

    const videoPromise = new Promise((resolve, reject) => {
      const video = document.createElement('video');
      video.src = '/videos/ourStory.mp4';
      video.onloadeddata = resolve;
      video.onerror = reject;
    });

    Promise.all([...imagePromises, videoPromise])
      .then(() => setIsLoading(false))
      .catch(error => console.error('Error loading resources:', error));
  }, []);

  return (
    <div className={styles.loadingScreen}>
      {isLoading ? (
        <div className={styles.loader}>Loading...</div>
      ) : (
        <div className={styles.startContainer}>
          <button className={styles.startButton} onClick={onStart}>
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