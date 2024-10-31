import express from 'express';
import { engine } from 'express-handlebars';
import viewsRouter from './routes/viewsRouter.js';
import http from 'http';
import { Server } from 'socket.io';

import mongoose from 'mongoose';
import dotenv from 'dotenv';

import productsRouter from './routes/productsRouter.js';

import cartsRouter from './routes/cartsRouter.js';

import connectDB from './config.js';

dotenv.config();

connectDB();

const app = express();
const server = http.createServer(app);
const io = new Server(server);

let products = []; 

app.engine('handlebars', engine({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');
app.set('views', './views');

app.use(express.json());
app.use(express.static('public'));
app.use('/', viewsRouter); // Rutas

io.on('connection', (socket) => {
  console.log('Cliente conectado');

  socket.emit('updateProducts', products);

  socket.on('newProduct', (product) => {
    products.push(product);
    io.emit('updateProducts', products); 
  });

  socket.on('deleteProduct', (index) => {
    products.splice(index, 1);
    io.emit('updateProducts', products); 
  });
});


const PORT = 8080;
server.listen(PORT, () => {
  console.log('Servidor corriendo en http://localhost:${PORT}');
});

app.use('/api/products', productsRouter);
app.use('/api/carts', cartsRouter);


