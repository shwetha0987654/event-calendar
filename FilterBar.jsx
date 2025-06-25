import React from 'react';
import { useCalendar } from '../context/CalendarContext';

export default function FilterBar() {
  const { filter, setFilter, category, setCategory, categories } = useCalendar();

  return (
    <div className="filter-bar">
      <input
        type="text"
        placeholder="Search events..."
        value={filter}
        onChange={e => setFilter(e.target.value)}
      />
      <select value={category} onChange={e => setCategory(e.target.value)}>
        <option value="">All Categories</option>
        {categories.map((c, idx) => (
          <option key={idx} value={c}>{c}</option>
        ))}
      </select>
    </div>
  );
}
