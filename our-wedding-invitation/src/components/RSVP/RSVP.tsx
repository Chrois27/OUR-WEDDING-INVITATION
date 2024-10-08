import React, { useState } from 'react';
import styles from './RSVP.module.scss';
import RSVPModal from './RSVPModal';

interface RSVPProps {
  groomName: string;
  brideName: string;
  weddingDate: string;
  weddingTime: string;
  weddingLocation: string;
}

const RSVP: React.FC<RSVPProps> = ({
  groomName,
  brideName,
  weddingDate,
  weddingTime,
  weddingLocation
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  return (
    <div className={styles.rsvp}>
      <button onClick={openModal} className={styles.rsvpButton}>
        참석 여부 전달
      </button>
      <RSVPModal
        isOpen={isModalOpen}
        onClose={closeModal}
        groomName={groomName}
        brideName={brideName}
        weddingDate={weddingDate}
        weddingTime={weddingTime}
        weddingLocation={weddingLocation}
      />
    </div>
  );
};

export default RSVP;