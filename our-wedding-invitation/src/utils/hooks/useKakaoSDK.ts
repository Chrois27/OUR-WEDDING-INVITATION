import { useState, useEffect } from 'react';

const KAKAO_SDK_SRC = 'https://developers.kakao.com/sdk/js/kakao.js';
const KAKAO_JAVASCRIPT_KEY = import.meta.env.VITE_KAKAO_APP_KEY;

declare global {
  interface Window {
    Kakao: any;
  }
}

function useKakaoShareSDK() {
  const [kakaoShareSDK, setKakaoShareSDK] = useState<any>(null);

  useEffect(() => {
    const script = document.createElement('script');
    script.src = KAKAO_SDK_SRC;
    script.async = true;

    script.onload = () => {
      if (!window.Kakao.isInitialized()) {
        window.Kakao.init(KAKAO_JAVASCRIPT_KEY);
      }
      setKakaoShareSDK(window.Kakao);
    };

    document.head.appendChild(script);

    return () => {
      document.head.removeChild(script);
    };
  }, []);

  return kakaoShareSDK;
}

export default useKakaoShareSDK;