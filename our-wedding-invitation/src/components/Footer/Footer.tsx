import React from 'react';
import styles from './Footer.module.scss';
import useKakaoSDK from '../../utils/hooks/useKakaoSDK';

interface FooterProps {
  shareUrl: string;
  paperInvitationUrl: string;
}

const Footer: React.FC<FooterProps> = ({ shareUrl, paperInvitationUrl }) => {
  const kakaoSDK = useKakaoSDK();

  const shareInvitation = () => {
    if (navigator.share) {
      navigator.share({
        title: '예비신랑 최성국 💖 예비신부 김보라',
        text: '2025년 2월 8일, 우리의 특별한 날에 여러분을 초대합니다.',
        url: shareUrl,
      });
    } else {
      alert('공유 기능을 지원하지 않는 브라우저입니다.');
    }
  };

  const handleKakaoShare = () => {
    if (kakaoSDK) {
      kakaoSDK.Link.sendDefault({
        objectType: 'feed',
        content: {
          title: '예비신랑 최성국 💖 예비신부 김보라',
          description: '2025년 2월 8일, 우리의 특별한 날에 여러분을 초대합니다.',
          imageUrl: '%PUBLIC_URL%/MainIMG,png',
          link: {
            mobileWebUrl: shareUrl,
            webUrl: shareUrl,
          },
        },
        buttons: [
          {
            title: '청첩장 보기',
            link: {
              mobileWebUrl: shareUrl,
              webUrl: shareUrl,
            },
          },
        ],
      });
    } else {
      alert('카카오톡 공유하기를 사용할 수 없습니다.');
    }
  };

  return (
    <footer className={styles.footer}>
      <button onClick={shareInvitation} className={styles.shareButton}>
        청첩장 공유하기
      </button>
      <button onClick={handleKakaoShare} className={styles.kakaoShareButton}>
        카카오톡으로 공유하기
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