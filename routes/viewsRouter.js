import { Router } from 'express';

const router = Router();

router.get('/', (req, res) => {
  res.render('home', { title: 'Página Principal', products: [] });
});


router.get('/realtimeproducts', (req, res) => {
  res.render('realTimeProducts', { title: 'Productos en Tiempo Real' });
});

export default router;