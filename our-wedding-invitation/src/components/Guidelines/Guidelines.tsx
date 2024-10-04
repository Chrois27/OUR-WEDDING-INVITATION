import React from 'react';
import styles from './Guidelines.module.scss';

interface GuidelinesProps {
  items: string[];
}

const Guidelines: React.FC<GuidelinesProps> = ({ items }) => {
  return (
    <div className={styles.guidelines}>
      <h2>안내사항</h2>
      <ul className={styles.guidelinesList}>
        {items.map((item, index) => (
          <li key={index} className={styles.guidelineItem}>{item}</li>
        ))}
      </ul>
    </div>
  );
};

export default Guidelines;
