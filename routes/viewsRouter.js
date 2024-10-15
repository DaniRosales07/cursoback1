import { Router } from 'express';

const router = Router();

// Vista principal con la lista de productos
router.get('/', (req, res) => {
  res.render('home', { title: 'Página Principal', products: [] });
});

// Vista en tiempo real con productos y formulario para WebSocket
router.get('/realtimeproducts', (req, res) => {
  res.render('realTimeProducts', { title: 'Productos en Tiempo Real' });
});

export default router;