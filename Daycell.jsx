import React from 'react';
import { Droppable, Draggable } from 'react-beautiful-dnd';
import { useCalendar } from '../context/CalendarContext';
import EventItem from './EventItem';
import { format, isToday } from 'date-fns';

export default function DayCell({ day }) {
  const { getEventsForDate, setModal } = useCalendar();
  const events = getEventsForDate(day.date);
  const dayStr = day.date.toISOString();

  return (
    <Droppable droppableId={`day:${dayStr}`}>
      {provided => (
        <div
          className={`day-cell ${day.inMonth ? '' : 'faded'}`}
          ref={provided.innerRef}
          {...provided.droppableProps}
          onClick={() => setModal({ open: true, date: day.date, edit: null })}
        >
          <span className="day-cell-number">
            {isToday(day.date) ? <strong>{format(day.date, 'd')}</strong> : format(day.date, 'd')}
          </span>
          {events.map((ev, i) => (
            <Draggable key={ev.id} draggableId={ev.id} index={i}>
              {p => (
                <EventItem
                  event={ev}
                  innerRef={p.innerRef}
                  draggableProps={p.draggableProps}
                  dragHandleProps={p.dragHandleProps}
                />
              )}
            </Draggable>
          ))}
          {provided.placeholder}
        </div>
      )}
    </Droppable>
  );
}
