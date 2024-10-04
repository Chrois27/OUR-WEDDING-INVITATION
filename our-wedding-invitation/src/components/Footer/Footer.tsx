import React from 'react';
import styles from './Footer.module.scss';

interface FooterProps {
  shareUrl: string;
  paperInvitationUrl: string;
}

const Footer: React.FC<FooterProps> = ({ shareUrl, paperInvitationUrl }) => {
  const shareInvitation = () => {
    if (navigator.share) {
      navigator.share({
        title: '우리의 결혼식에 초대합니다',
        text: '모바일 청첩장입니다. 참석해 주시면 감사하겠습니다.',
        url: shareUrl,
      });
    } else {
      alert('공유 기능을 지원하지 않는 브라우저입니다.');
    }
  };

  return (
    <footer className={styles.footer}>
      <button onClick={shareInvitation} className={styles.shareButton}>
        청첩장 공유하기
      </button>
      <a href={paperInvitationUrl} className={styles.paperInvitationLink}>
        종이 청첩장 보기
      </a>
      <p className={styles.copyright}>
        © {new Date().getFullYear()} 신랑 & 신부. All rights reserved.
      </p>
    </footer>
  );
};

export default Footer;