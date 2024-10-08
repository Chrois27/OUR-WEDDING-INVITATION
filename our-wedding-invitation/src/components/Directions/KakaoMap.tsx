import React, { useEffect, useState, useRef } from 'react';
import useKakaoMapSDK from '../../utils/hooks/useKakaoMapSDK';
import styles from './KakaoMap.module.scss';

interface KakaoMapProps {
  latitude: number;
  longitude: number;
}

const KakaoMap: React.FC<KakaoMapProps> = ({ latitude, longitude }) => {
  const kakaoMaps = useKakaoMapSDK();
  const [mapInstance, setMapInstance] = useState<kakao.maps.Map | null>(null);
  const [error, setError] = useState<string | null>(null);
  const mapContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!kakaoMaps || !mapContainerRef.current) return;

    try {
      const mapOptions: kakao.maps.MapOptions = {
        center: new kakaoMaps.maps.LatLng(latitude, longitude),
        level: 3
      };

      const map = new kakaoMaps.maps.Map(mapContainerRef.current, mapOptions);
      setMapInstance(map);

      // 지도 컨트롤 추가
      const zoomControl = new kakaoMaps.maps.ZoomControl();
      map.addControl(zoomControl, kakaoMaps.maps.ControlPosition.RIGHT);

      // 마커 추가
      const markerPosition = new kakaoMaps.maps.LatLng(latitude, longitude);
      const marker = new kakaoMaps.maps.Marker({
        position: markerPosition
      });
      marker.setMap(map);

      // 인포윈도우 추가
      const infowindowContent = `
        <div style="
          padding: 10px;
          text-align: center;
          font-family: Arial, sans-serif;
          background-color: white;
          border-radius: 8px;
          box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
        ">
          <h5 style="
            margin: 0 0 5px 0;
            font-size: 14px;
            color: #555;
          ">신도림 테크노마트 11층</h5>
          <h4 style="
            margin: 0;
            font-size: 16px;
            color: #333;
          ">웨딩시티 그랜드볼룸홀</h4>
        </div>
      `;

      const customOverlay = new kakaoMaps.maps.CustomOverlay({
        content: infowindowContent,
        position: markerPosition,
        yAnchor: 1.3
      });

      customOverlay.setMap(map);

    } catch (err) {
      console.error("Error creating map:", err);
      setError("지도를 불러오는 중 오류가 발생했습니다.");
    }
  }, [kakaoMaps, latitude, longitude]);

  if (error) {
    return (
      <div className={styles.mapError}>
        <p>오류: {error}</p>
        <p>잠시 후 다시 시도해주세요.</p>
      </div>
    );
  }

  return (
    <div className={styles.mapContainer}>
      {!kakaoMaps ? (
        <div className={styles.mapLoading}>지도를 불러오는 중...</div>
      ) : (
        <div ref={mapContainerRef} className={styles.map} />
      )}
    </div>
  );
};

export default KakaoMap;