import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
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

    document.body.style.overflow = 'hidden';

    return () => {
      clearTimeout(timer);
      document.body.style.overflow = 'auto';
    };
  }, []);

  const handlePrev = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentIndex((prevIndex) => (prevIndex > 0 ? prevIndex - 1 : images.length - 1));
  };

  const handleNext = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentIndex((prevIndex) => (prevIndex < images.length - 1 ? prevIndex + 1 : 0));
  };

  const handleKeyDown = (event: KeyboardEvent) => {
    if (event.key === 'ArrowLeft') {
      handlePrev(event as unknown as React.MouseEvent);
    } else if (event.key === 'ArrowRight') {
      handleNext(event as unknown as React.MouseEvent);
    } else if (event.key === 'Escape') {
      onClose();
    }
  };

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  const modalContent = (
    <div className={styles.modal} onClick={onClose}>
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

  return ReactDOM.createPortal(
    modalContent,
    document.body
  );
};

export default GalleryModal;