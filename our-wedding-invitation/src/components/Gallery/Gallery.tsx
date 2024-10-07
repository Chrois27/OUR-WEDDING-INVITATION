import React, { useState } from 'react';
import GalleryModal from './GalleryModal';
import styles from './Gallery.module.scss';

interface Image {
  src: string;
  alt: string;
}

interface GalleryProps {
  images: Image[];
}

const Gallery: React.FC<GalleryProps> = ({ images }) => {
  const [selectedImageIndex, setSelectedImageIndex] = useState<number | null>(null);

  const openModal = (index: number) => {
    setSelectedImageIndex(index);
  };

  const closeModal = () => {
    setSelectedImageIndex(null);
  };

  return (
    <div className={styles.gallery}>
      <h2>갤러리</h2>
      <div className={styles.grid}>
        {images.map((image, index) => (
          <div key={index} className={styles.imageContainer} onClick={() => openModal(index)}>
            <img src={image.src} alt={image.alt} />
          </div>
        ))}
      </div>
      {selectedImageIndex !== null && (
        <GalleryModal
          images={images}
          initialIndex={selectedImageIndex}
          onClose={closeModal}
        />
      )}
      <p>사진을 누르면 더 크게 볼 수 있습니다.</p>
    </div>
  );
};

export default Gallery;