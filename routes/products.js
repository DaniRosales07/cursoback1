import express from 'express';
import fs from 'fs';

const router = express.Router();
const path = './data/productos.json';


const getProducts = () => {
  const data = fs.readFileSync(path, 'utf8');
  return JSON.parse(data);
};


const saveProducts = (products) => {
  fs.writeFileSync(path, JSON.stringify(products, null, 2));
};


router.get('/', (req, res) => {
  let products = getProducts();
  const limit = req.query.limit ? parseInt(req.query.limit) : products.length;
  products = products.slice(0, limit);
  res.json(products);
});


router.get('/:pid', (req, res) => {
  const products = getProducts();
  const product = products.find(p => p.id == req.params.pid);
  if (product) {
    res.json(product);
  } else {
    res.status(404).json({ message: 'Producto no encontrado' });
  }
});


router.post('/', (req, res) => {
  const products = getProducts();
  const newProduct = {
    id: products.length + 1, 
    ...req.body,
    status: req.body.status !== undefined ? req.body.status : true
  };
  products.push(newProduct);
  saveProducts(products);
  res.status(201).json(newProduct);
});


router.put('/:pid', (req, res) => {
  let products = getProducts();
  const index = products.findIndex(p => p.id == req.params.pid);
  if (index !== -1) {
    const updatedProduct = { ...products[index], ...req.body };
    products[index] = updatedProduct;
    saveProducts(products);
    res.json(updatedProduct);
  } else {
    res.status(404).json({ message: 'Producto no encontrado' });
  }
});


router.delete('/:pid', (req, res) => {
  let products = getProducts();
  const filteredProducts = products.filter(p => p.id != req.params.pid);
  saveProducts(filteredProducts);
  res.json({ message: 'Producto eliminado' });
});


export default router;