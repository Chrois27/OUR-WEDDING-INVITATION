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
  const [errors, setErrors] = useState<{name?: string; attendance?: string}>({});

  if (!isOpen) return null;

  const validateForm = () => {
    const newErrors: {name?: string; attendance?: string} = {};
    if (!name.trim()) {
      newErrors.name = '이름을 입력해주세요.';
    }
    if (!attendance) {
      newErrors.attendance = '참석 여부를 선택해주세요.';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      // Here you would typically send this data to your server
      console.log({ name, attendance, numberOfGuests, message });
      alert('참석 여부가 전달되었습니다. 감사합니다!');
      onClose();
    }
  };

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modalContent}>
        <h2>참석 여부 전달(RSVP)</h2>
        <p>
          소중한 시간을 내어 결혼식에 참석해주시는 모든 분들께<br/>
          진심으로 감사드립니다.<br/>
          신랑신부에게 참석 여부를 알려주시면<br/>
          더욱 성심껏 준비하는 데 도움이 될 것 같습니다.
        </p>
        <h4>
          신랑 {groomName}, 신부 {brideName}<br />
          {weddingDate} {weddingTime}<br />
          {weddingLocation}
        </h4>
        <p>🌸</p>
        <form onSubmit={handleSubmit}>
          <div className={styles.formGroup}>
            <label htmlFor="name"><h3>이름</h3></label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            {errors.name && <span className={styles.error}>{errors.name}</span>}
          </div>
          <div className={styles.formGroup}>
            <h3>참석 여부</h3>
            <div className={styles.radioGroup}>
              <label>
                <input
                  type="radio"
                  value="yes"
                  checked={attendance === 'yes'}
                  onChange={() => setAttendance('yes')}
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
            {errors.attendance && <span className={styles.error}>{errors.attendance}</span>}
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
            <label htmlFor="message"><h3>신랑, 신부에게 보낼 메시지 (선택사항)</h3></label>
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