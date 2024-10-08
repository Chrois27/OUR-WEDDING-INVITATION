import { useState, useEffect } from 'react';

const KAKAO_SDK_SRC = `https://dapi.kakao.com/v2/maps/sdk.js?appkey=${import.meta.env.VITE_KAKAO_APP_KEY}&autoload=false`;

declare global {
  interface Window {
    kakao: any;
  }
}

function useKakaoSDK() {
  const [kakaoSDK, setKakaoSDK] = useState<any>(null);

  useEffect(() => {
    const script = document.createElement('script');
    script.src = KAKAO_SDK_SRC;
    script.async = true;

    script.onload = () => {
      window.kakao.maps.load(() => {
        setKakaoSDK(window.kakao);
      });
    };

    document.head.appendChild(script);

    return () => {
      document.head.removeChild(script);
    };
  }, []);

  return kakaoSDK;
}

export default useKakaoSDK;