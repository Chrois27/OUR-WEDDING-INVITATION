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
        많은 것을 알기를 <br/>
        꿈꾸지 않는다 <br/>
        다만 지금, 여기 <br/>
        내 앞에서 웃고 있는 너 <br/>
        그것이 내가 아는 세상의 <br/>
        전부이기를 바란다 <br/>
        
        </h1>
        <p>- 나태주 &lt; 소망 &gt; 中 - </p>
        <br/>
        <br/>
        <br/>
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