// models/Product.js
import mongoose from 'mongoose';

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  category: String,
  stock: {
    type: Number,
    default: 1,
  },
  description: String,
});

const Product = mongoose.model('Product', productSchema);

export default Product;