import express from 'express';
import fs from 'fs';

const router = express.Router();
const path = './data/carritos.json';

const getCarts = () => {
  const data = fs.readFileSync(path, 'utf8');
  return JSON.parse(data);
};

const saveCarts = (carts) => {
  fs.writeFileSync(path, JSON.stringify(carts, null, 2));
};

router.post('/', (req, res) => {
  const carts = getCarts();
  const newCart = {
    id: carts.length + 1,
    products: []
  };
  carts.push(newCart);
  saveCarts(carts);
  res.status(201).json(newCart);
});

router.get('/:cid', (req, res) => {
  const carts = getCarts();
  const cart = carts.find(c => c.id == req.params.cid);
  if (cart) {
    res.json(cart.products);
  } else {
    res.status(404).json({ message: 'Carrito no encontrado' });
  }
});

router.post('/:cid/product/:pid', (req, res) => {
  let carts = getCarts();
  const cart = carts.find(c => c.id == req.params.cid);
  if (cart) {
    const product = cart.products.find(p => p.product == req.params.pid);
    if (product) {
      product.quantity += 1;
    } else {
      cart.products.push({ product: req.params.pid, quantity: 1 });
    }
    saveCarts(carts);
    res.json(cart);
  } else {
    res.status(404).json({ message: 'Carrito no encontrado' });
  }
});

router.delete('/:cid/product/:pid', (req, res) => {
  let carts = getCarts();
  const cart = carts.find(c => c.id == req.params.cid);
  if (cart) {
    const initialLength = cart.products.length;
    cart.products = cart.products.filter(p => p.product != req.params.pid);

    if (cart.products.length < initialLength) {
      saveCarts(carts);
      res.json({ message: 'Producto eliminado del carrito', cart });
    } else {
      res.status(404).json({ message: 'Producto no encontrado en el carrito' });
    }
  } else {
    res.status(404).json({ message: 'Carrito no encontrado' });
  }
});

export default router;