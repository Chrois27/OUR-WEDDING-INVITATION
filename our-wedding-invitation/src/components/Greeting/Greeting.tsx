import React from 'react';
import styles from './Greeting.module.scss';

interface GreetingProps {
  message: string;
  coupleNames: string;
  date: string;
  location: string;
}

const Greeting: React.FC<GreetingProps> = ({ message, coupleNames, date, location }) => {
  return (
    <section className={styles.greeting}>
      <div className={styles.content}>
        <p className={styles.message}>{message}</p>
        <p className={styles.coupleNames}>{coupleNames}</p>
        <p className={styles.details}>
          <span className={styles.date}>{date}</span>
          <span className={styles.location}>{location}</span>
        </p>
      </div>
    </section>
  );
};

export default Greeting;