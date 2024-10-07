import React, { useState, useEffect } from 'react';
import styles from './GalleryModal.module.scss';

interface Image {
  src: string;
  alt: string;
}

interface GalleryModalProps {
  images: Image[];
  initialIndex: number;
  onClose: () => void;
}

const GalleryModal: React.FC<GalleryModalProps> = ({ images, initialIndex, onClose }) => {
  const [currentIndex, setCurrentIndex] = useState(initialIndex);
  const [showGuide, setShowGuide] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowGuide(false);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  const handlePrev = () => {
    setCurrentIndex((prevIndex) => (prevIndex > 0 ? prevIndex - 1 : images.length - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex < images.length - 1 ? prevIndex + 1 : 0));
  };

  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === 'ArrowLeft') {
      handlePrev();
    } else if (event.key === 'ArrowRight') {
      handleNext();
    } else if (event.key === 'Escape') {
      onClose();
    }
  };

  return (
    <div className={styles.modal} onClick={onClose} onKeyDown={handleKeyDown} tabIndex={0}>
      <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
        <img src={images[currentIndex].src} alt={images[currentIndex].alt} className={styles.modalImage} />
        <button className={styles.prevButton} onClick={handlePrev}>&lt;</button>
        <button className={styles.nextButton} onClick={handleNext}>&gt;</button>
        <button className={styles.closeButton} onClick={onClose}>×</button>
        <div className={styles.imageCounter}>
          {currentIndex + 1} / {images.length}
        </div>
        {showGuide && (
          <div className={styles.guide} onClick={() => setShowGuide(false)}>
            좌/우로 넘겨 다른 사진도 보세요.
          </div>
        )}
      </div>
    </div>
  );
};

export default GalleryModal;