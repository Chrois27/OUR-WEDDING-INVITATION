import React, { useEffect } from 'react';
import { Map, MapMarker } from 'react-kakao-maps-sdk';
import styles from './KakaoMap.module.scss';

interface KakaoMapProps {
  latitude: number;
  longitude: number;
  address: string;
}

const KakaoMap: React.FC<KakaoMapProps> = ({ latitude, longitude, address }) => {
  useEffect(() => {
    const script = document.createElement('script');
    script.async = true;
    script.src = `//dapi.kakao.com/v2/maps/sdk.js?appkey=YOUR_KAKAO_MAPS_API_KEY&autoload=false`;
    document.head.appendChild(script);

    script.addEventListener('load', () => {
      window.kakao.maps.load(() => {
        // Map is ready to be used
      });
    });
  }, []);

  return (
    <div className={styles.mapContainer}>
      <Map
        center={{ lat: latitude, lng: longitude }}
        style={{ width: '100%', height: '400px' }}
      >
        <MapMarker position={{ lat: latitude, lng: longitude }} />
      </Map>
      <div className={styles.address}>
        <h3>오시는 길</h3>
        <p>{address}</p>
      </div>
    </div>
  );
};

export default KakaoMap;