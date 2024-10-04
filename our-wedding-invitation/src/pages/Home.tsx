import React from 'react';
import Header from '../components/Header/Header';
import ScrollVideo from '../components/ScrollVideo/ScrollVideo';
import Greeting from '../components/Greeting/Greeting';
import CalendarCountdown from '../components/CalendarCountdown/CalendarCountdown';
import KakaoMap from '../components/KakaoMap/KakaoMap';
import Gallery from '../components/Gallery/Gallery';
import AccountInfo from '../components/AccountInfo/AccountInfo';
import Guidelines from '../components/Guidelines/Guidelines';
import Footer from '../components/Footer/Footer';
import styles from './Home.module.scss';

interface Image {
  src: string;
  alt: string;
}

const Home: React.FC = () => {
  const weddingDate = '2025-02-08';
  const images: Image[] = [
    { src: '/images/GalleryIMG1.png', alt: 'Wedding photo 1'},
    { src: '/images/GalleryIMG2.png', alt: 'Wedding photo 2'},
    { src: '/images/GalleryIMG3.png', alt: 'Wedding photo 3'},
    { src: '/images/GalleryIMG4.png', alt: 'Wedding photo 4'},
    { src: '/images/GalleryIMG5.png', alt: 'Wedding photo 5'},
    { src: '/images/GalleryIMG6.png', alt: 'Wedding photo 6'},
  ];
  const guidelineItems: string[] = ['안내사항 1', '안내사항 2', '안내사항 3'];

  return (
    <div className={styles.home}>
      <Header 
        backgroundImage="/images/MainIMG.png"
        title="신랑 & 신부의 결혼식"
        subtitle="2025년 2월 8일"
      />
      <ScrollVideo videoSrc="/videos/ourStory.mp4" />
      <Greeting
        message="서로 사랑하며 아끼는 마음으로 평생을 함께하고자 합니다."
        coupleNames="신랑 & 신부"
        date="2024년 10월 4일 토요일 오후 2시"
        location="서울특별시 강남구 테헤란로 123 웨딩홀"
      />
      <CalendarCountdown weddingDate={weddingDate} />
      <KakaoMap
        latitude={37.5665}
        longitude={126.9780}
        address="서울특별시 강남구 테헤란로 123 웨딩홀"
      />
      <Gallery images={images} />
      <AccountInfo
        groom={{ name: "신랑", account: "123-456-789" }}
        bride={{ name: "신부", account: "987-654-321" }}
        parents={[
          { name: "신랑 아버지", account: "111-222-333" },
          { name: "신랑 어머니", account: "444-555-666" },
          { name: "신부 아버지", account: "777-888-999" },
          { name: "신부 어머니", account: "000-111-222" }
        ]}
      />
      <Guidelines items={guidelineItems} />
      <Footer 
        shareUrl="https://your-wedding-invitation-url.com"
        paperInvitationUrl="/path/to/paper-invitation.pdf"
      />
    </div>
  );
};

export default Home;