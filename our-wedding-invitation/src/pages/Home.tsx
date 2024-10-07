import React from 'react';
import Header from '../components/Header/Header';
import ScrollVideo from '../components/ScrollVideo/ScrollVideo';
import Greeting from '../components/Greeting/Greeting';
import CalendarCountdown from '../components/CalendarCountdown/CalendarCountdown';
import Directions from '../components/Directions/Directions';
import Gallery from '../components/Gallery/Gallery';
import AccountInfo from '../components/AccountInfo/AccountInfo';
import Guidelines from '../components/Guidelines/Guidelines';
import Footer from '../components/Footer/Footer';
import ScrollAnimation from './ScrollAnimation';
import styles from './Home.module.scss';

interface Image {
  src: string;
  alt: string;
}

const Home: React.FC = () => {
  const weddingDate = '2025-02-08';
  const images: Image[] = [
    { src: '/images/GalleryIMG1.png', alt: 'Wedding photo 1' },
    { src: '/images/GalleryIMG2.png', alt: 'Wedding photo 2' },
    { src: '/images/GalleryIMG3.png', alt: 'Wedding photo 3' },
    { src: '/images/GalleryIMG4.png', alt: 'Wedding photo 4' },
    { src: '/images/GalleryIMG5.png', alt: 'Wedding photo 5' },
    { src: '/images/GalleryIMG6.png', alt: 'Wedding photo 6' },
  ];
  const guidelineItems: React.ReactNode[] = [
    <React.Fragment key="1">
      ➊<br />신부대기실은 11층 본식 예식장 옆에 있습니다.
    </React.Fragment>,
    <React.Fragment key="2">
      ➋<br />화환은 정중히 사양합니다.<br />
      마음만 감사히 받겠습니다.
    </React.Fragment>,
    <React.Fragment key="3">
      ➌<br />식사는 8층 연회장에서<br />
      오후 5시 10분부터 오후 7시 10분까지 이용가능합니다.
    </React.Fragment>,
    <React.Fragment key="4">
      ➍<br />8세 미만 어린이의 식사는 무료입니다.
    </React.Fragment>,
    <React.Fragment key="5">
      ➎<br />주차는 3시간 무료입니다.<br />
      예약실 및 안내데스크에서 주차도장을 확인해주세요.<br />
      (추가요금 30분당 1,500원)
    </React.Fragment>,
  ];
  return (
    <div className={styles.home}>
      <Header
        backgroundImage="/images/MainIMG.png"
        title="신랑 최성국 ❤️ 신부 김보라"
        subtitle="2025년 2월 8일 토요일 저녁 5시 40분"
      />
      <ScrollVideo videoSrc="/videos/ourStory.mp4" />
      <ScrollAnimation>
        <Greeting
          relationshipStartDate="2018-03-11" // 관계 시작 날짜
          groomName="성국"
          groomFatherName="최영문"
          groomMotherName="양지명"
          brideName="보라"
          brideFatherName="김정업"
          brideMotherName="이정임"
        />
      </ScrollAnimation>
      <ScrollAnimation>
        <CalendarCountdown
          weddingDate={weddingDate}
          dDayText="우리의 결혼식까지"
          dPlusDayText="우리가 결혼한 지"
        />
      </ScrollAnimation>
      <ScrollAnimation>
        <Directions />
      </ScrollAnimation>
      <ScrollAnimation>
        <Gallery images={images} />
      </ScrollAnimation>
      <ScrollAnimation>
        <AccountInfo
          groom={{
            name: "성국",
            account: "신한 110-123-456789"
          }}
          bride={{
            name: "보라",
            account: "국민 123-12-1234567"
          }}
          parents={[
            {
              name: "신랑 부모",
              account: "우리 1002-123-456789"
            },
            {
              name: "신부 부모",
              account: "농협 123-4567-8901-23"
            }
          ]}
        />
      </ScrollAnimation>
      <ScrollAnimation>
        <Guidelines items={guidelineItems} />
      </ScrollAnimation>
      <Footer
        shareUrl="https://your-wedding-invitation-url.com"
        paperInvitationUrl="/path/to/paper-invitation.pdf"
      />
    </div>
  );
};

export default Home;