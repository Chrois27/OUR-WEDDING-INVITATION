import React from 'react';
import KakaoMap from './KakaoMap';
import styles from './Directions.module.scss';

const Directions: React.FC = () => {
  const latitude = 37.507040;
  const longitude = 126.890220;

  return (
    <div className={styles.directions}>
      <h2>오시는 길</h2>
      <KakaoMap latitude={latitude} longitude={longitude} mapId="wedding-map" />
      <p className={styles.mapLink}>
        그림으로 된 약도가 필요하면 <a href="/images/map.pdf" target="_blank" rel="noopener noreferrer">여기</a>를 눌러주세요
      </p>
      <div className={styles.mapButtons}>
        <a href="https://tmap.life/9f4da717" target="_blank" rel="noopener noreferrer">
          <img src="/images/tmap.jpeg" alt="Tmap" />
        </a>
        <a href="https://kko.to/WIdLVmTjKy" target="_blank" rel="noopener noreferrer">
          <img src="/images/kakao.jpeg" alt="카카오맵" />
        </a>
        <a href="https://naver.me/IIfctW3t" target="_blank" rel="noopener noreferrer">
          <img src="/images/naver.jpeg" alt="네이버지도" />
        </a>
      </div>
      <div className={styles.info}>
        <h6>주 소:</h6>
        <p>서울특별시 구로구 새말로 97 신도림 테크노마트 11층<br/>네비게이션 "신도림테크노마트" 입력</p>
        <h6>지하철:</h6>
        <p>1호선, 2호선 신도림역 3번 출구 <br/>테크노마트 판매동 지하1층과 연결되어 있습니다.</p>
        <h6>버 스:</h6>
        <h5>
          - 신도림역(17-102) 정류장 하차<br/>
          &nbsp;&nbsp;&nbsp;지하철 신도림역 3번출구 쪽<br/>
          &nbsp;&nbsp;&nbsp;지선 : 5619, 6411, 6511, 6611<br/>
          &nbsp;&nbsp;&nbsp;직행 : 5200<br/>
          &nbsp;&nbsp;&nbsp;마을 : 영등포09, 영등포12, 영등포13<br/>
          - 신도림역 (17-001)정류장 하차<br/>
          &nbsp;&nbsp;&nbsp;지하철 신도림역 1번출구 쪽<br/>
          &nbsp;&nbsp;&nbsp;(하차 후 지하보도 이용, 지하철 3번출구 <br/>
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;방면 으로 이동 후 테크노마트 판매동<br/>
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;지하 1층 통로 이용)<br/>
          &nbsp;&nbsp;&nbsp;간선 : 160, 503, 600, 660, 662<br/>
          &nbsp;&nbsp;&nbsp;지선 : 5615, 5714, 6512, 6515, 6516,<br/>
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;6637, 6640A, 6713<br/>
          &nbsp;&nbsp;&nbsp;직행 : 301, 320<br/>
          &nbsp;&nbsp;&nbsp;일반 : 10, 11-1, 11-2, 83, 88, 530<br/>
          &nbsp;&nbsp;&nbsp;공항 : 6018<br/><br/>
        </h5>
        <h6>주 차:</h6>
        <p>신도림 테크노마트 지하주차장 이용 (B3~B7)<br/>주차요원의 안내를 받으세요.</p>
      </div>
    </div>
  );
};

export default Directions;