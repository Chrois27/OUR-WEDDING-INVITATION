import React from 'react';
import styles from './Greeting.module.scss';

interface GreetingProps {
  relationshipStartDate: string;
  groomName: string;
  groomFatherName: string;
  groomMotherName: string;
  brideName: string;
  brideFatherName: string;
  brideMotherName: string;
}

const RelationshipDuration: React.FC<{ startDate: string }> = ({ startDate }) => {
  const start = new Date(startDate);
  const today = new Date();
  const diffTime = Math.abs(today.getTime() - start.getTime());
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  const years = Math.floor(diffDays / 365);
  const months = Math.floor((diffDays % 365) / 30);
  const days = diffDays % 30;

  return (
    <span>{years}년 {months}개월 {days}일</span>
  );
};

const Greeting: React.FC<GreetingProps> = ({
  relationshipStartDate,
  groomName,
  groomFatherName,
  groomMotherName,
  brideName,
  brideFatherName,
  brideMotherName
}) => {
  return (
    <section className={styles.greeting}>
      <div className={styles.content}>
      <h2>인사말</h2>
        <p className={styles.greetingMessage}>
          <RelationshipDuration startDate={relationshipStartDate} /> 동안 지켜온 소중한 인연,<br/>
          사랑과 믿음의 결실을 <br/>
          하나님 안에서 맺게 되었습니다.<br/><br/>
          결혼이 사랑의 종착점이 아니듯,<br/>
          행복한 오늘이 인생에 있어<br/>
          결코 전부가 아님을 알기에<br/>
          여러분을 저희 언약의 증인으로 <br/>
          초대하고자 합니다.<br/><br/>
          새로운 인생을 시작하는 <br/>
          저희 두 사람의 뜻깊은 시간을 <br/>
          함께 해주시면 감사하겠습니다.<br/>
        </p>
        <h6>
          {groomFatherName} · {groomMotherName}의 자녀 {groomName}<br/>
          {brideFatherName} · {brideMotherName}의 자녀 {brideName}
        </h6>
      </div>
    </section>
  );
};

export default Greeting;