import express from 'express';
import data from '../data.js';
import Product from '../models/productModel.js';

const seedRouter = express.Router();

seedRouter.get('/', async (req, res) => {
  await Product.deleteMany();
  await Product.insertMany(data.products);
  res.send({ message: 'products seeded successfully' });
});

export default seedRouter;
