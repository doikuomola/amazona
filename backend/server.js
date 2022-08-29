import express, { application } from 'express';
import dotenv from 'dotenv';
import data from './data.js';
import mongoose from 'mongoose';
import seedRouter from './routes/seedRoutes.js';
import productRouter from './routes/productRoutes.js';

const app = express();
dotenv.config();

const connectDb = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('connected to mongoDB');
  } catch (error) {
    console.log(error.message);
  }
};

connectDb();

app.use(express.json());

app.use('/api/seed', seedRouter);
app.use('/api/products', productRouter);

const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Server running on: http://localhost:${port}`);
});
