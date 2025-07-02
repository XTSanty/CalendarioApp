# 📅 Calendario de Eventos Personal

Sistema completo de gestión de eventos personales con interfaz de calendario mensual y almacenamiento persistente en MongoDB.

## 🚀 Características

- ✅ **CRUD Completo**: Crear, leer, actualizar y eliminar eventos
- ✅ **Interfaz de Calendario**: Vista mensual interactiva
- ✅ **Almacenamiento Persistente**: Base de datos MongoDB
- ✅ **Diseño Responsivo**: Funciona en desktop y móvil
- ✅ **Validación de Datos**: Formularios con validación
- ✅ **Navegación Temporal**: Cambiar entre meses fácilmente

## 🛠️ Tecnologías Utilizadas

### Backend
- **Node.js** - Entorno de ejecución
- **Express.js** - Framework web
- **MongoDB** - Base de datos NoSQL
- **Mongoose** - ODM para MongoDB
- **CORS** - Middleware para cross-origin requests

### Frontend
- **React.js** - Biblioteca de interfaz de usuario
- **Axios** - Cliente HTTP
- **CSS3** - Estilos y diseño responsivo

## 📋 Requisitos Previos

- Node.js (versión 16 o superior)
- MongoDB Community Edition
- Git

## 🔧 Instalación

### 1. Clonar el repositorio
```bash
git clone https://github.com/tu-usuario/calendar-app.git
cd calendar-app
```

### 2. Configurar el Backend
```bash
# Instalar dependencias del backend
npm install express mongoose cors dotenv
npm install -D nodemon

# Crear archivo .env
echo "MONGODB_URI=mongodb://localhost:27017/calendar" > .env
echo "PORT=5000" >> .env
```

### 3. Configurar el Frontend
```bash
# Crear aplicación React
npx create-react-app frontend
cd frontend

# Instalar dependencias adicionales
npm install axios

# Volver al directorio raíz
cd ..
```

### 4. Iniciar MongoDB
```bash
# En Windows
net start MongoDB

# En macOS/Linux
sudo systemctl start mongod
```

## 🚀 Ejecución

### Iniciar el Backend
```bash
# Desde el directorio raíz
node server.js
# o para desarrollo
npm run dev
```
El backend estará disponible en `http://localhost:5000`

### Iniciar el Frontend
```bash
# Desde el directorio frontend
cd frontend
npm start
```
El frontend estará disponible en `http://localhost:3000`

## 📚 API Endpoints

### Eventos
- `GET /api/events` - Obtener todos los eventos
- `GET /api/events/month/:year/:month` - Obtener eventos por mes
- `GET /api/events/:id` - Obtener un evento específico
- `POST /api/events` - Crear nuevo evento
- `PUT /api/events/:id` - Actualizar evento
- `DELETE /api/events/:id` - Eliminar evento

### Estructura de Evento
```json
{
  "_id": "ObjectId",
  "title": "string (requerido)",
  "description": "string (opcional)",
  "date": "Date (requerido)",
  "time": "string (requerido)",
  "createdAt": "Date"
}
```

## 📁 Estructura del Proyecto

```
calendar-app/
├── backend/
│   ├── server.js          # Servidor principal
│   ├── package.json       # Dependencias backend
│   └── .env              # Variables de entorno
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── Calendar.js    # Componente calendario
│   │   │   └── EventForm.js   # Formulario de eventos
│   │   ├── App.js            # Componente principal
│   │   └── App.css           # Estilos
│   └── package.json          # Dependencias frontend
├── README.md
└── .gitignore
```

## 🎯 Uso de la Aplicación

1. **Ver Calendario**: La página principal muestra el calendario del mes actual
2. **Crear Evento**: Clic en cualquier día o botón "Nuevo Evento"
3. **Editar Evento**: Clic en un evento existente
4. **Eliminar Evento**: Botón "Eliminar" en el formulario de edición
5. **Navegar Meses**: Botones de navegación en el header del calendario

## 🔒 Variables de Entorno

### Desarrollo
```env
MONGODB_URI=mongodb://localhost:27017/calendar
PORT=5000
```

### Producción
```env
MONGODB_URI=mongodb+srv://usuario:password@cluster.mongodb.net/calendar
PORT=5000
```

## 📦 Despliegue

### Backend (Railway/Render)
1. Conectar repositorio
2. Configurar variables de entorno
3. Usar MongoDB Atlas para base de datos

### Frontend (Netlify/Vercel)
1. Conectar repositorio
2. Configurar build command: `npm run build`
3. Configurar publish directory: `build`

## 🤝 Lista de Actividades del Proyecto

| Prioridad | Tarea | Estado | Responsable |
|-----------|-------|--------|-------------|
| 1 | Configuración del entorno | ✅ | Desarrollador |
| 2 | Estructura del proyecto | ✅ | Desarrollador |
| 3 | Backend API (CRUD) | ✅ | Desarrollador |
| 4 | Frontend (React) | ✅ | Desarrollador |
| 5 | Integración Front-Back | ✅ | Desarrollador |
| 6 | Estilos y responsividad | ✅ | Desarrollador |
| 7 | Pruebas y depuración | 🔄 | Desarrollador |
| 8 | Documentación | ✅ | Desarrollador |
| 9 | Repositorio Git | 🔄 | Desarrollador |
| 10 | Despliegue | ⏳ | Desarrollador |

## 🐛 Solución de Problemas

### Error de conexión a MongoDB
```bash
# Verificar que MongoDB esté ejecutándose
sudo systemctl status mongod

# Reiniciar MongoDB
sudo systemctl restart mongod
```

### Error de CORS
- Verificar que el backend tenga configurado CORS
- Verificar que el frontend use la URL correcta del backend

### Error de proxy
- Verificar que el `package.json` del frontend tenga configurado el proxy

## 📄 Licencia

Este proyecto está bajo la Licencia MIT.

## 👥 Contribución

1. Fork el proyecto
2. Crear una rama para tu feature (`git checkout -b feature/nueva-funcionalidad`)
3. Commit tus cambios (`git commit -m 'Agregar nueva funcionalidad'`)
4. Push a la rama (`git push origin feature/nueva-funcionalidad`)
5. Abrir un Pull Request

## 📞 Contacto

- **Desarrollador**: Tu Nombre
- **Email**: tu.email@ejemplo.com
- **GitHub**: https://github.com/tu-usuario

---

⭐ ¡No olvides dar una estrella al proyecto si te fue útil!