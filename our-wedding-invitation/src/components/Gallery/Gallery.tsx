import React from 'react';
import styles from './Gallery.module.scss';

interface Image {
  src: string;
  alt: string;
}

interface GalleryProps {
  images: Image[];
}

const Gallery: React.FC<GalleryProps> = ({ images }) => {
  return (
    <div className={styles.gallery}>
      <div className={styles.grid}>
        {images.map((image, index) => (
          <div key={index} className={styles.imageContainer}>
            <img src={image.src} alt={image.alt} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Gallery;