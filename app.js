import express from 'express';
import { engine } from 'express-handlebars';
import viewsRouter from './routes/viewsRouter.js';
import http from 'http';
import { Server } from 'socket.io';

const app = express();
const server = http.createServer(app);
const io = new Server(server);

let products = []; // Productos almacenados en memoria

// Configuración de Handlebars
app.engine('handlebars', engine({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');
app.set('views', './views');

// Middlewares
app.use(express.json());
app.use(express.static('public'));
app.use('/', viewsRouter); // Rutas

// WebSocket: Gestión de eventos
io.on('connection', (socket) => {
  console.log('Cliente conectado');

  // Enviar productos actuales al conectarse
  socket.emit('updateProducts', products);

  // Escuchar cuando se crea un producto
  socket.on('newProduct', (product) => {
    products.push(product);
    io.emit('updateProducts', products); // Notificar a todos los clientes
  });

  // Escuchar cuando se elimina un producto
  socket.on('deleteProduct', (index) => {
    products.splice(index, 1);
    io.emit('updateProducts', products); // Actualizar a todos los clientes
  });
});

// Iniciar el servidor
const PORT = 8080;
server.listen(PORT, () => {
  console.log('Servidor corriendo en http://localhost:${PORT}');
});