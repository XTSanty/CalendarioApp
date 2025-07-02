import React, { useState, useEffect } from 'react';
import Calendar from './components/Calendar';
import EventForm from './components/EventForm';
import { getEvents, createEvent, updateEvent, deleteEvent } from './api/calendarService';
import './App.css';

function App() {
  const [events, setEvents] = useState([]);
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [showEventForm, setShowEventForm] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadEvents = async () => {
      setLoading(true);
      setError(null);
      try {
        const year = currentMonth.getFullYear();
        const month = currentMonth.getMonth() + 1;
        const events = await getEvents(year, month);
        setEvents(events);
      } catch (error) {
        setError('Error al cargar eventos');
        console.error('Error:', error);
      } finally {
        setLoading(false);
      }
    };
    
    loadEvents();
  }, [currentMonth]);

  const handleDateClick = (date) => {
    setSelectedDate(date);
    setSelectedEvent(null);
    setShowEventForm(true);
  };

  const handleEventClick = (event) => {
    setSelectedEvent(event);
    setShowEventForm(true);
  };

  const handleSaveEvent = async (eventData) => {
    try {
      if (selectedEvent) {
        const updatedEvent = await updateEvent(selectedEvent._id, eventData);
        setEvents(events.map(e => e._id === updatedEvent._id ? updatedEvent : e));
      } else {
        const newEvent = await createEvent(eventData);
        setEvents([...events, newEvent]);
      }
      setShowEventForm(false);
    } catch (error) {
      setError('Error al guardar el evento');
      console.error('Error:', error);
    }
  };

  const handleDeleteEvent = async (eventId) => {
    if (window.confirm('¿Estás seguro de eliminar este evento?')) {
      try {
        await deleteEvent(eventId);
        setEvents(events.filter(e => e._id !== eventId));
        setShowEventForm(false);
      } catch (error) {
        setError('Error al eliminar el evento');
        console.error('Error:', error);
      }
    }
  };

  return (
    <div className="app-container">
      <h1>Calendario de Eventos</h1>
      
      {error && <div className="error-message">{error}</div>}
      {loading && <div className="loading">Cargando...</div>}
      
      <Calendar
        events={events}
        currentMonth={currentMonth}
        onDateClick={handleDateClick}
        onEventClick={handleEventClick}
        onMonthChange={setCurrentMonth}
      />
      
      {showEventForm && (
        <EventForm
          selectedDate={selectedDate}
          editingEvent={selectedEvent}
          onSave={handleSaveEvent}
          onClose={() => setShowEventForm(false)}
          onDelete={handleDeleteEvent}
        />
      )}
    </div>
  );
}

export default App;