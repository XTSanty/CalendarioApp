const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Conexión a MongoDB
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/calendar', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

mongoose.connection.on('connected', () => {
  console.log('✅ Conectado a MongoDB');
});

// Modelo de Evento
const eventSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: String,
  date: { type: Date, required: true },
  time: String,
  createdAt: { type: Date, default: Date.now }
});

const Event = mongoose.model('Event', eventSchema);

// Endpoints de la API
app.get('/api/events/month/:year/:month', async (req, res) => {
  try {
    const year = parseInt(req.params.year);
    const month = parseInt(req.params.month) - 1;

    const startDate = new Date(year, month, 1);
    const endDate = new Date(year, month + 1, 0);

    const events = await Event.find({
      date: {
        $gte: startDate,
        $lte: endDate
      }
    }).sort({ date: 1 });

    res.json(events);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.post('/api/events', async (req, res) => {
  try {
    const { title, description, date, time } = req.body;

    const newEvent = new Event({
      title,
      description,
      date: new Date(date),
      time
    });

    const savedEvent = await newEvent.save();
    res.status(201).json(savedEvent);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

app.put('/api/events/:id', async (req, res) => {
  try {
    const updatedEvent = await Event.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    if (!updatedEvent) {
      return res.status(404).json({ message: 'Evento no encontrado' });
    }

    res.json(updatedEvent);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

app.delete('/api/events/:id', async (req, res) => {
  try {
    const deletedEvent = await Event.findByIdAndDelete(req.params.id);

    if (!deletedEvent) {
      return res.status(404).json({ message: 'Evento no encontrado' });
    }

    res.json({ message: 'Evento eliminado correctamente' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// 👉 Servir el frontend compilado
const buildPath = path.join(__dirname, '../frontend/build');
app.use(express.static(buildPath));

// 👉 Redireccionar rutas no API a React
app.get('*', (req, res) => {
  res.sendFile(path.join(buildPath, 'index.html'));
});

// Iniciar servidor
app.listen(PORT, () => {
  console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`);
});
