import React, { useState, useEffect } from 'react';
import dayjs from 'dayjs';
import styles from './CalendarCountdown.module.scss';

interface CalendarCountdownProps {
  weddingDate: string; // Format: 'YYYY-MM-DD'
  dDayText: string;
  dPlusDayText: string;
}

const getCalendarDataset = (date: dayjs.Dayjs) => {
  const startOfMonth = date.startOf('month');
  const endOfMonth = date.endOf('month');
  const startDate = startOfMonth.startOf('week');
  const endDate = endOfMonth.endOf('week');
  const calendar = [];
  let week = [];
  for (let day = startDate; day.isBefore(endDate); day = day.add(1, 'day')) {
    week.push(day);
    if (week.length === 7) {
      calendar.push(week);
      week = [];
    }
  }
  return calendar;
};

const CalendarCountdown: React.FC<CalendarCountdownProps> = ({ weddingDate, dDayText, dPlusDayText }) => {
  const weddingDay = dayjs(weddingDate);

  const calculateTimeLeft = () => {
    const now = dayjs();
    const difference = weddingDay.diff(now);
    const isPast = difference <= 0;
    if (isPast) {
      const pastDifference = now.diff(weddingDay);
      const days = Math.floor(pastDifference / (1000 * 60 * 60 * 24));
      const hours = Math.floor((pastDifference / (1000 * 60 * 60)) % 24);
      const minutes = Math.floor((pastDifference / 1000 / 60) % 60);
      const seconds = Math.floor((pastDifference / 1000) % 60);
      return { days, hours, minutes, seconds, isPast };
    } else {
      const days = Math.floor(difference / (1000 * 60 * 60 * 24));
      const hours = Math.floor((difference / (1000 * 60 * 60)) % 24);
      const minutes = Math.floor((difference / 1000 / 60) % 60);
      const seconds = Math.floor((difference / 1000) % 60);
      return { days, hours, minutes, seconds, isPast };
    }
  };

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());
  const calendar = getCalendarDataset(weddingDay);
  const weekdays = ['일', '월', '화', '수', '목', '금', '토'];

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);
    return () => clearInterval(timer);
  }, [weddingDate]);

  const { days, hours, minutes, seconds, isPast } = timeLeft;

  return (
    <div className={styles.calendarCountdown}>
      <h2>예식 일시</h2>
      <p className={styles.dateInfo}>
        2025년 2월 8일 토요일 <br/>
        저녁 5시 40분
      </p>
      <div className={styles.calendar}>
        <h3>{weddingDay.format('YYYY년 M월')}</h3>
        <table className={styles.calendarTable}>
          <thead>
            <tr>
              {weekdays.map((day) => (
                <th key={day}>{day}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {calendar.map((week, weekIndex) => (
              <tr key={weekIndex}>
                {week.map((day) => (
                  <td 
                    key={day.format('YYYY-MM-DD')}
                    className={`
                      ${styles.calendarDay}
                      ${day.month() !== weddingDay.month() ? styles.otherMonth : ''}
                      ${day.day() === 0 ? styles.sunday : ''}
                      ${day.day() === 6 ? styles.saturday : ''}
                      ${day.isSame(weddingDay, 'day') ? styles.weddingDay : ''}
                    `}
                  >
                    {day.date()}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className={styles.ddayCounter}>
        <h3>{isPast ? dPlusDayText : dDayText}</h3>
        <div className={styles.timeDisplay}>
          <div className={styles.timeUnit}>
            <span className={styles.number}>{days}</span>
            <span className={styles.label}>일</span>
          </div>
          <div className={styles.timeUnit}>
            <span className={styles.number}>{hours}</span>
            <span className={styles.label}>시간</span>
          </div>
          <div className={styles.timeUnit}>
            <span className={styles.number}>{minutes}</span>
            <span className={styles.label}>분</span>
          </div>
          <div className={styles.timeUnit}>
            <span className={styles.number}>{seconds}</span>
            <span className={styles.label}>초</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CalendarCountdown;