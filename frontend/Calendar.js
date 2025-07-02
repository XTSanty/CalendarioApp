import React from 'react';
import PropTypes from 'prop-types';

const Calendar = ({ events, currentMonth, onDateClick, onEventClick, onMonthChange }) => {
  const monthNames = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];
  const dayNames = ['Dom', 'Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb'];

  const getDaysInMonth = (date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const firstDay = new Date(year, month, 1).getDay();

    const days = [];
    
    // Días del mes anterior
    for (let i = firstDay; i > 0; i--) {
      days.push({
        date: new Date(year, month, -i + 1),
        isCurrentMonth: false
      });
    }

    // Días del mes actual
    for (let day = 1; day <= daysInMonth; day++) {
      const date = new Date(year, month, day);
      days.push({
        date,
        isCurrentMonth: true,
        isToday: date.toDateString() === new Date().toDateString(),
        events: events.filter(e => new Date(e.date).toDateString() === date.toDateString())
      });
    }

    // Días del mes siguiente
    const remainingDays = 42 - days.length;
    for (let day = 1; day <= remainingDays; day++) {
      days.push({
        date: new Date(year, month + 1, day),
        isCurrentMonth: false
      });
    }

    return days;
  };

  const handlePrevMonth = () => {
    const newMonth = new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1);
    onMonthChange(newMonth);
  };

  const handleNextMonth = () => {
    const newMonth = new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1);
    onMonthChange(newMonth);
  };

  const days = getDaysInMonth(currentMonth);

  return (
    <div className="calendar">
      <div className="calendar-header">
        <button onClick={handlePrevMonth} className="calendar-nav-btn">←</button>
        <h2 className="calendar-month-year">
          {monthNames[currentMonth.getMonth()]} {currentMonth.getFullYear()}
        </h2>
        <button onClick={handleNextMonth} className="calendar-nav-btn">→</button>
      </div>

      <div className="calendar-weekdays">
        {dayNames.map(day => (
          <div key={day} className="calendar-weekday">{day}</div>
        ))}
      </div>

      <div className="calendar-grid">
        {days.map((day, index) => (
          <div
            key={index}
            className={`calendar-day ${day.isToday ? 'today' : ''} ${!day.isCurrentMonth ? 'other-month' : ''}`}
            onClick={() => day.isCurrentMonth && onDateClick(day.date)}
          >
            <span className="calendar-day-number">{day.date.getDate()}</span>
            {day.events?.map((event, i) => (
              <div
                key={i}
                className="calendar-event"
                onClick={(e) => {
                  e.stopPropagation();
                  onEventClick(event);
                }}
              >
                {event.time} - {event.title}
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

Calendar.propTypes = {
  events: PropTypes.array.isRequired,
  currentMonth: PropTypes.instanceOf(Date).isRequired,
  onDateClick: PropTypes.func.isRequired,
  onEventClick: PropTypes.func.isRequired,
  onMonthChange: PropTypes.func.isRequired
};

export default Calendar;