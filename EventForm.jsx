import React, { useState, useEffect } from 'react';
import { useCalendar } from '../context/CalendarContext';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { nanoid } from 'nanoid';

export default function EventForm() {
  const { modal, addEvent, updateEvent, deleteEvent, closeModal, checkConflict } = useCalendar();
  const { open, date, edit } = modal;

  const [title, setTitle] = useState('');
  const [desc, setDesc] = useState('');
  const [eventDate, setEventDate] = useState(date);
  const [color, setColor] = useState('#bbdefb');
  const [category, setCategory] = useState('');
  const [recurrence, setRecurrence] = useState('');
  const [interval, setInterval] = useState(1);
  const [recurrenceEnd, setRecurrenceEnd] = useState(null);

  useEffect(() => {
    if (edit) {
      setTitle(edit.title);
      setDesc(edit.description);
      setEventDate(edit.date);
      setColor(edit.color);
      setCategory(edit.category);
      setRecurrence(edit.recurrence || '');
      setInterval(edit.interval || 1);
      setRecurrenceEnd(edit.recurrenceEnd ? new Date(edit.recurrenceEnd) : null);
    } else {
      setTitle('');
      setDesc('');
      setEventDate(date);
      setColor('#bbdefb');
      setCategory('');
      setRecurrence('');
      setInterval(1);
      setRecurrenceEnd(null);
    }
  }, [edit, date]);

  if (!open) return null;

  const handleSubmit = e => {
    e.preventDefault();
    const obj = {
      id: edit?.id || nanoid(),
      title,
      description: desc,
      date: eventDate,
      color,
      category,
      recurrence,
      interval,
      recurrenceEnd
    };

    if (checkConflict(obj)) return alert('Event time conflict detected.');
    if (edit) updateEvent(obj);
    else addEvent(obj);

    closeModal();
  };

  const handleDelete = e => {
    e.preventDefault();
    if (edit?.id) deleteEvent(edit.id);
    closeModal();
  };

  return (
    <div className="modal">
      <form className="event-form" onSubmit={handleSubmit}>
        <h3>{edit ? 'Edit' : 'Add'} Event</h3>
        <input required placeholder="Title" value={title} onChange={e => setTitle(e.target.value)} />
        <textarea placeholder="Description" value={desc} onChange={e => setDesc(e.target.value)} rows="2" />
        <DatePicker selected={eventDate} onChange={setEventDate} showTimeSelect dateFormat="Pp" />
        <div style={{ display: 'flex', gap: '8px' }}>
          <input type="color" value={color} onChange={e => setColor(e.target.value)} />
          <input placeholder="Category" value={category} onChange={e => setCategory(e.target.value)} />
        </div>
        <select value={recurrence} onChange={e => setRecurrence(e.target.value)}>
          <option value="">Recurrence: None</option>
          <option value="daily">Daily</option>
          <option value="weekly">Weekly</option>
          <option value="monthly">Monthly</option>
        </select>
        {recurrence && (
          <div style={{ display: 'flex', gap: '8px' }}>
            <input type="number" min="1" value={interval} onChange={e => setInterval(+e.target.value)} placeholder="Interval" />
            <DatePicker selected={recurrenceEnd} onChange={setRecurrenceEnd} placeholderText="Recurrence Ends" />
          </div>
        )}
        <div style={{ display: 'flex', gap: '8px' }}>
          <button type="submit">{edit ? 'Update' : 'Add'}</button>
          {edit && <button onClick={handleDelete}>Delete</button>}
          <button type="button" onClick={closeModal}>Cancel</button>
        </div>
      </form>
    </div>
  );
}
