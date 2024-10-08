import React, { useState } from 'react';
import styles from './RSVPModal.module.scss';

interface RSVPModalProps {
  isOpen: boolean;
  onClose: () => void;
  groomName: string;
  brideName: string;
  weddingDate: string;
  weddingTime: string;
  weddingLocation: string;
}

const RSVPModal: React.FC<RSVPModalProps> = ({
  isOpen,
  onClose,
  groomName,
  brideName,
  weddingDate,
  weddingTime,
  weddingLocation
}) => {
  const [name, setName] = useState('');
  const [attendance, setAttendance] = useState<'yes' | 'no' | ''>('');
  const [numberOfGuests, setNumberOfGuests] = useState(1);
  const [message, setMessage] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Here you would typically send this data to your server
    console.log({ name, attendance, numberOfGuests, message });
    alert('참석 여부가 전달되었습니다. 감사합니다!');
    onClose();
  };

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modalContent}>
        <h2>참석 여부 전달</h2>
        <p>
          소중한 시간을 내어 결혼식에 참석해주시는 모든 분들께 감사드립니다.<br/>
          신랑신부에게 참석 여부를 알려주시면 더욱 성심껏 준비하는 데 도움이 될 것 같습니다.
        </p>
        <p>
          신랑 {groomName}, 신부 {brideName}<br />
          {weddingDate} {weddingTime}<br />
          {weddingLocation}
        </p>
        <form onSubmit={handleSubmit}>
          <div className={styles.formGroup}>
            <label htmlFor="name">이름</label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
          <div className={styles.formGroup}>
            <label>참석 여부</label>
            <div className={styles.radioGroup}>
              <label>
                <input
                  type="radio"
                  value="yes"
                  checked={attendance === 'yes'}
                  onChange={() => setAttendance('yes')}
                  required
                />
                참석
              </label>
              <label>
                <input
                  type="radio"
                  value="no"
                  checked={attendance === 'no'}
                  onChange={() => setAttendance('no')}
                />
                불참
              </label>
            </div>
          </div>
          {attendance === 'yes' && (
            <div className={styles.formGroup}>
              <label htmlFor="guests">참석 인원</label>
              <input
                type="number"
                id="guests"
                value={numberOfGuests}
                onChange={(e) => setNumberOfGuests(Number(e.target.value))}
                min={1}
              />
            </div>
          )}
          <div className={styles.formGroup}>
            <label htmlFor="message">메시지 (선택사항)</label>
            <textarea
              id="message"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            />
          </div>
          <div className={styles.buttonGroup}>
            <button type="submit" className={styles.submitButton}>제출</button>
            <button type="button" onClick={onClose} className={styles.closeButton}>닫기</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default RSVPModal;