import React from 'react';
import { useCalendar } from '../context/CalendarContext';
import DayCell from './DayCell';
import EventForm from './EventForm';

export default function Calendar() {
  const { currentMonthName, goPrev, goNext, getMonthDays } = useCalendar();

  return (
    <>
      <div className="calendar-nav">
        <button onClick={goPrev}>
          <i className="fa-solid fa-chevron-left"></i> Prev
        </button>
        <h2>{currentMonthName}</h2>
        <button onClick={goNext}>
          Next <i className="fa-solid fa-chevron-right"></i>
        </button>
      </div>
      <div className="calendar-grid">
        {['Sun','Mon','Tue','Wed','Thu','Fri','Sat'].map(d => (
          <div key={d} className="day-header">{d}</div>
        ))}
        {getMonthDays().map((day, idx) => (
          <DayCell key={idx} day={day} />
        ))}
      </div>
      <EventForm />
    </>
  );
}
