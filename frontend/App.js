import React, { useState, useEffect } from 'react';
import Calendar from './components/Calendar';
import EventForm from './components/EventForm';
import { getEvents, createEvent } from './api/calendarService';

function App() {
  const [events, setEvents] = useState([]);
  const [currentMonth, setCurrentMonth] = useState(new Date());

  useEffect(() => {
    const loadEvents = async () => {
      const year = currentMonth.getFullYear();
      const month = currentMonth.getMonth() + 1;
      const events = await getEvents(year, month);
      setEvents(events);
    };
    loadEvents();
  }, [currentMonth]);

  return (
    <div className="app">
      <Calendar 
        events={events} 
        currentMonth={currentMonth}
        onMonthChange={setCurrentMonth}
      />
    </div>
  );
}