import React from 'react';
import styles from './Header.module.scss';

interface HeaderProps {
  backgroundImage: string;
  title: string;
  subtitle: string;
}

const Header: React.FC<HeaderProps> = ({ backgroundImage, title, subtitle }) => {
  return (
    <header className={styles.header} style={{ backgroundImage: `url(${backgroundImage})` }}>
      <div className={styles.overlay}>
        <h1 className={styles.title}>{title}</h1>
        <h2 className={styles.subtitle}>{subtitle}</h2>
      </div>
    </header>
  );
};

export default Header;