import React from 'react';
import { CalendarProvider } from './context/CalendarContext';
import Calendar from './components/Calendar';
import FilterBar from './components/FilterBar';
import './styles.css';

export default function App() {
  return (
    <CalendarProvider>
      <div className="calendar-container">
        <h1><i className="fa-solid fa-calendar-days"></i> My Event Calendar</h1>
        <FilterBar />
        <Calendar />
      </div>
    </CalendarProvider>
  );
}
