import React, { useState, useEffect } from 'react';
import dayjs from 'dayjs';
import styles from './CalendarCountdown.module.scss';

interface CalendarCountdownProps {
  weddingDate: string; // Format: 'YYYY-MM-DD'
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

const CalendarCountdown: React.FC<CalendarCountdownProps> = ({ weddingDate }) => {
  const [countdown, setCountdown] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });
  const weddingDay = dayjs(weddingDate);
  const calendar = getCalendarDataset(weddingDay);
  const weekdays = ['일', '월', '화', '수', '목', '금', '토'];

  useEffect(() => {
    const timer = setInterval(() => {
      const now = dayjs();
      const diff = weddingDay.diff(now, 'second');

      if (diff > 0) {
        setCountdown({
          days: Math.floor(diff / (3600 * 24)),
          hours: Math.floor((diff % (3600 * 24)) / 3600),
          minutes: Math.floor((diff % 3600) / 60),
          seconds: diff % 60,
        });
      } else {
        clearInterval(timer);
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [weddingDate]);

  return (
    <div className={styles.calendarCountdown}>
      <div className={styles.calendar}>
        <h2>{weddingDay.format('YYYY년 M월')}</h2>
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
      <div className={styles.countdown}>
        <div className={styles.countdownItem}>
          <span className={styles.number}>{countdown.days}</span>
          <span className={styles.label}>Days</span>
        </div>
        <div className={styles.countdownItem}>
          <span className={styles.number}>{countdown.hours}</span>
          <span className={styles.label}>Hours</span>
        </div>
        <div className={styles.countdownItem}>
          <span className={styles.number}>{countdown.minutes}</span>
          <span className={styles.label}>Minutes</span>
        </div>
        <div className={styles.countdownItem}>
          <span className={styles.number}>{countdown.seconds}</span>
          <span className={styles.label}>Seconds</span>
        </div>
      </div>
    </div>
  );
};

export default CalendarCountdown;