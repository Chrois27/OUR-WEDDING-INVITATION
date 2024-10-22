import React, { useRef, useEffect, useState } from 'react';
import styles from './ScrollAnimation.module.scss';

interface ScrollAnimationProps {
  children: React.ReactNode;
}

const ScrollAnimation: React.FC<ScrollAnimationProps> = ({ children }) => {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      {
        // 모바일에서는 더 일찍 애니메이션이 시작되도록 threshold를 낮춤
        threshold: window.innerWidth <= 768 ? 0.05 : 0.1,
        // 모바일에서는 뷰포트의 더 아래쪽에서 시작하도록 설정
        rootMargin: window.innerWidth <= 768 ? '50px 0px' : '0px'
      }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, []);

  return (
    <div 
      ref={ref} 
      className={`${styles.scrollAnimation} ${isVisible ? styles.visible : ''} ${
        window.innerWidth <= 768 ? styles.mobile : ''
      }`}
    >
      {children}
    </div>
  );
};

export default ScrollAnimation;