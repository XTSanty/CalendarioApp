import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

const EventForm = ({ selectedDate, editingEvent, onSave, onClose, onDelete }) => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    date: '',
    time: '12:00'
  });

  const [errors, setErrors] = useState({
    title: false,
    date: false,
    time: false
  });

  useEffect(() => {
    if (editingEvent) {
      const eventDate = new Date(editingEvent.date);
      setFormData({
        title: editingEvent.title,
        description: editingEvent.description || '',
        date: eventDate.toISOString().split('T')[0],
        time: editingEvent.time || '12:00'
      });
    } else {
      const dateStr = selectedDate.toISOString().split('T')[0];
      setFormData(prev => ({
        ...prev,
        date: dateStr
      }));
    }
  }, [selectedDate, editingEvent]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: false
      }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    const newErrors = {
      title: !formData.title.trim(),
      date: !formData.date,
      time: !formData.time
    };
    
    setErrors(newErrors);
    
    if (!Object.values(newErrors).some(Boolean)) {
      const eventDate = new Date(formData.date);
      const [hours, minutes] = formData.time.split(':');
      eventDate.setHours(parseInt(hours, 10), parseInt(minutes, 10))
      
      onSave({
        title: formData.title.trim(),
        description: formData.description.trim(),
        date: eventDate.toISOString(),
        time: formData.time
      });
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal">
        <div className="modal-header">
          <h3>{editingEvent ? 'Editar Evento' : 'Nuevo Evento'}</h3>
          <button onClick={onClose} className="btn-close">×</button>
        </div>

        <form onSubmit={handleSubmit} className="event-form">
          <div className={`form-group ${errors.title ? 'error' : ''}`}>
            <label>Título *</label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              placeholder="Título del evento"
            />
            {errors.title && <span className="error-message">Campo requerido</span>}
          </div>

          <div className="form-group">
            <label>Descripción</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Descripción opcional"
              rows="3"
            />
          </div>

          <div className="form-row">
            <div className={`form-group ${errors.date ? 'error' : ''}`}>
              <label>Fecha *</label>
              <input
                type="date"
                name="date"
                value={formData.date}
                onChange={handleChange}
              />
              {errors.date && <span className="error-message">Selecciona una fecha</span>}
            </div>

            <div className={`form-group ${errors.time ? 'error' : ''}`}>
              <label>Hora *</label>
              <input
                type="time"
                name="time"
                value={formData.time}
                onChange={handleChange}
              />
              {errors.time && <span className="error-message">Selecciona una hora</span>}
            </div>
          </div>

          <div className="form-actions">
            <button type="submit" className="btn btn-primary">
              {editingEvent ? 'Actualizar' : 'Crear'}
            </button>
            {editingEvent && (
              <button
                type="button"
                onClick={() => onDelete(editingEvent._id)}
                className="btn btn-danger"
              >
                Eliminar
              </button>
            )}
            <button
              type="button"
              onClick={onClose}
              className="btn btn-secondary"
            >
              Cancelar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

EventForm.propTypes = {
  selectedDate: PropTypes.instanceOf(Date).isRequired,
  editingEvent: PropTypes.shape({
    _id: PropTypes.string,
    title: PropTypes.string,
    description: PropTypes.string,
    date: PropTypes.oneOfType([PropTypes.string, PropTypes.instanceOf(Date)]),
    time: PropTypes.string
  }),
  onSave: PropTypes.func.isRequired,
  onClose: PropTypes.func.isRequired,
  onDelete: PropTypes.func
};

export default EventForm;