import React, { useState, useEffect } from 'react';

const EventForm = ({ selectedDate, editingEvent, onSave, onClose, onDelete }) => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    date: '',
    time: ''
  });

  useEffect(() => {
    if (editingEvent) {
      const eventDate = new Date(editingEvent.date);
      setFormData({
        title: editingEvent.title,
        description: editingEvent.description || '',
        date: eventDate.toISOString().split('T')[0],
        time: editingEvent.time
      });
    } else {
      const dateStr = selectedDate.toISOString().split('T')[0];
      setFormData({
        title: '',
        description: '',
        date: dateStr,
        time: '12:00'
      });
    }
  }, [selectedDate, editingEvent]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!formData.title.trim()) {
      alert('El título del evento es obligatorio');
      return;
    }

    if (!formData.date) {
      alert('La fecha es obligatoria');
      return;
    }

    if (!formData.time) {
      alert('La hora es obligatoria');
      return;
    }

    onSave(formData);
  };

  const handleDelete = () => {
    if (editingEvent && onDelete) {
      onDelete(editingEvent._id);
      onClose();
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
          <div className="form-group">
            <label htmlFor="title">Título *</label>
            <input
              type="text"
              id="title"
              name="title"
              value={formData.title}
              onChange={handleChange}
              placeholder="Nombre del evento"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="description">Descripción</label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Descripción del evento (opcional)"
              rows="3"
            />
          </div>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="date">Fecha *</label>
              <input
                type="date"
                id="date"
                name="date"
                value={formData.date}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="time">Hora *</label>
              <input
                type="time"
                id="time"
                name="time"
                value={formData.time}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <div className="form-actions">
            <button type="submit" className="btn btn-primary">
              {editingEvent ? 'Actualizar' : 'Crear'} Evento
            </button>
            
            {editingEvent && (
              <button
                type="button"
                onClick={handleDelete}
                className="btn btn-danger"
              >
                Eliminar
              </button>
            )}
            
            <button type="button" onClick={onClose} className="btn btn-secondary">
              Cancelar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EventForm;