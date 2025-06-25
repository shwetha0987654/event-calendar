import React, {createContext, useContext, useState, useEffect} from 'react';
import {addDays, isSameDay, isSameMinute} from 'date-fns';
import {nanoid} from 'nanoid';
import {DragDropContext} from 'react-beautiful-dnd';

const CalendarContext = createContext();
export const useCalendar = () => useContext(CalendarContext);

export const CalendarProvider = ({children}) => {
  const [events, setEvents] = useState(() => {
    const s = localStorage.getItem('events');
    return s ? JSON.parse(s, (k,v)=> k==='date'?new Date(v):v) : [];
  });
  const [filter, setFilter] = useState('');
  const [category, setCategory] = useState('');
  const [currentDate, setCurrentDate] = useState(new Date());
  const [modal, setModal] = useState({open:false, date:null, edit:null});

  useEffect(() => localStorage.setItem('events', JSON.stringify(events)), [events]);

  const generateRecurrences = (e) => {
    if (!e.recurrence) return [];
    const out=[]; let d=new Date(e.date);
    const end=new Date(e.recurrenceEnd);
    const interval=e.interval||1;
    while(d<end){
      if(e.recurrence==='daily') d=addDays(d, interval);
      else if(e.recurrence==='weekly') d=addDays(d, 7*interval);
      else if(e.recurrence==='monthly') d=new Date(d.setMonth(d.getMonth()+interval));
      if(d<=end) out.push({ ...e, id: nanoid(), date:new Date(d) });
    }
    return out;
  };

  const addEvent=e=>setEvents(prev=>[ ...prev, e, ...generateRecurrences(e) ]);
  const updateEvent=e=>setEvents(prev=>prev.map(x=>x.id===e.id?e:x));
  const deleteEvent=id=>setEvents(prev=>prev.filter(x=>x.id!==id));
  const checkConflict=e=> events.some(x=>x.id!==e.id && isSameDay(x.date,e.date) && isSameMinute(x.date,e.date));
  const moveEvent=(id,date)=>setEvents(prev=>prev.map(x=>x.id===id?{...x,date}:x));

  const onDragEnd=res=>{
    if(!res.destination) return;
    const id=res.draggableId;
    const dateStr=res.destination.droppableId.split(':')[1];
    const d=new Date(dateStr);
    const ev=events.find(x=>x.id===id);
    if(checkConflict({...ev, date:d})) return alert('Conflict!');
    moveEvent(id, d);
  };

  const getEventsForDate=d => events
    .filter(e=>isSameDay(e.date,d))
    .filter(e=>filter? e.title.toLowerCase().includes(filter.toLowerCase()) : true)
    .filter(e=>category? e.category === category : true);

  const getMonthDays=()=>{
    const y=currentDate.getFullYear(), m=currentDate.getMonth();
    const first=new Date(y,m,1);
    const sw=first.getDay();
    const dc=new Date(y,m+1,0).getDate();
    return Array.from({length:sw+dc},(_,i)=>{
      return { date:new Date(y,m,i-sw+1), inMonth:i>=sw };
    });
  };

  const value = {
    filter, setFilter,
    category, setCategory,
    events,
    addEvent, updateEvent, deleteEvent, checkConflict,
    getEventsForDate,
    modal, setModal, closeModal:()=>setModal({open:false}),
    onDragEnd,
    getMonthDays,
    currentMonthName:currentDate.toLocaleDateString('default',{month:'long',year:'numeric'}),
    goPrev:()=>setCurrentDate(d=>addDays(new Date(d.getFullYear(),d.getMonth(),1),-1)),
    goNext:()=>setCurrentDate(d=>addDays(new Date(d.getFullYear(),d.getMonth()+1,1),1)),
    categories:Array.from(new Set(events.map(e=>e.category))).filter(Boolean)
  };

  return (
    <CalendarContext.Provider value={value}>
      <DragDropContext onDragEnd={value.onDragEnd}>
        {children}
      </DragDropContext>
    </CalendarContext.Provider>
  );
};
