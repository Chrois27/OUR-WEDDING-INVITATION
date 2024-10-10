import React from 'react';
import styles from './FullscreenToggle.module.scss';

interface FullscreenToggleProps {
  isFullscreen: boolean;
  toggleFullscreen: () => void;
}

const FullscreenToggle: React.FC<FullscreenToggleProps> = ({ isFullscreen, toggleFullscreen }) => {
  return (
    <button className={styles.fullscreenToggle} onClick={toggleFullscreen}>
      {isFullscreen ? '전체화면 나가기' : '전체화면'}
    </button>
  );
};

export default FullscreenToggle;