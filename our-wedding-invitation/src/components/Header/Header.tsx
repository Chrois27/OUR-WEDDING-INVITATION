import React from 'react';
import styles from './Header.module.scss';

interface HeaderProps {
  backgroundImage: string;
  title: string;
  subtitle: string;
}

const Header: React.FC<HeaderProps> = ({ backgroundImage, title, subtitle }) => {
  return (
    <div className={styles.cover}>
      <div className={styles.backgroundImage} style={{ backgroundImage: `url(${backgroundImage})` }}></div>
      <div className={styles.content}>
        <h1>
        개미는 <br/>
        오늘도 <br/>
        열심히 <br/>
        일을하네 <br/>
        개미는 <br/>
        언제나 <br/>
        열심히 <br/>
        일을하네 <br/>
        </h1>
        <p>- 최성국 &lt; 현재상태 &gt; 中 - </p>
      </div>
      <div className={styles.guide}>
        <h2>{title}</h2>
        <p>{subtitle}</p>
        <p>서울 신도림 웨딩시티 11층 그랜드볼룸</p>
      </div>
    </div>
  );
};

export default Header;