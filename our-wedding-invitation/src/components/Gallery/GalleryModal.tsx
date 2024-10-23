import React, { useState, useEffect, useCallback, useRef } from 'react';
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
  const [isSwiping, setIsSwiping] = useState(false);
  const [swipeOffset, setSwipeOffset] = useState(0);
  const touchStartX = useRef<number>(0);
  const touchEndX = useRef<number>(0);
  const modalContentRef = useRef<HTMLDivElement>(null);
  
  const minSwipeDistance = 50; // 최소 스와이프 거리

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

  const handlePrev = useCallback((e?: React.MouseEvent) => {
    e?.stopPropagation();
    setCurrentIndex((prevIndex) => (prevIndex > 0 ? prevIndex - 1 : images.length - 1));
  }, [images.length]);

  const handleNext = useCallback((e?: React.MouseEvent) => {
    e?.stopPropagation();
    setCurrentIndex((prevIndex) => (prevIndex < images.length - 1 ? prevIndex + 1 : 0));
  }, [images.length]);

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
    touchEndX.current = e.touches[0].clientX;
    setIsSwiping(true);
    setSwipeOffset(0);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isSwiping) return;

    touchEndX.current = e.touches[0].clientX;
    const diff = touchEndX.current - touchStartX.current;
    setSwipeOffset(diff);

    // 브라우저 기본 스크롤 방지
    e.preventDefault();
  };

  const handleTouchEnd = () => {
    const diff = touchEndX.current - touchStartX.current;

    if (Math.abs(diff) > minSwipeDistance) {
      if (diff > 0) {
        handlePrev();
      } else {
        handleNext();
      }
    }

    setIsSwiping(false);
    setSwipeOffset(0);
  };

  const handleKeyDown = useCallback((event: KeyboardEvent) => {
    if (event.key === 'ArrowLeft') {
      handlePrev();
    } else if (event.key === 'ArrowRight') {
      handleNext();
    } else if (event.key === 'Escape') {
      onClose();
    }
  }, [handlePrev, handleNext, onClose]);

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [handleKeyDown]);

  const modalContent = (
    <div className={styles.modal} onClick={onClose}>
      <div 
        ref={modalContentRef}
        className={styles.modalContent} 
        onClick={(e) => e.stopPropagation()}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        <img 
          src={images[currentIndex].src} 
          alt={images[currentIndex].alt} 
          className={styles.modalImage}
          style={{
            transform: `translateX(${swipeOffset}px)`,
            transition: isSwiping ? 'none' : 'transform 0.3s ease'
          }}
          draggable={false}
        />
        <button className={styles.prevButton} onClick={handlePrev}>&lt;</button>
        <button className={styles.nextButton} onClick={handleNext}>&gt;</button>
        <button className={styles.closeButton} onClick={onClose}>×</button>
        <div className={styles.imageCounter}>
          {currentIndex + 1} / {images.length}
        </div>
        {showGuide && (
          <div className={styles.guide} onClick={() => setShowGuide(false)}>
            좌우로 스와이프하거나<br/>화살표를 눌러 넘겨보세요
          </div>
        )}
      </div>
    </div>
  );

  return ReactDOM.createPortal(modalContent, document.body);
};

export default React.memo(GalleryModal);