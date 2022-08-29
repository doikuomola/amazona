import express from 'express';
import data from '../data.js';
import Product from '../models/productModel.js';
import User from '../models/userModel.js';

const seedRouter = express.Router();

seedRouter.get('/', async (req, res) => {
  await Product.deleteMany();
  await Product.insertMany(data.products);
  await User.deleteMany();
  await User.insertMany(data.users);
  res.send({ message: 'data seeded successfully' });
});

export default seedRouter;
