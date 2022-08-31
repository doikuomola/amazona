import express from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import seedRouter from './routes/seedRoutes.js';
import productRouter from './routes/productRoutes.js';
import userRoutes from './routes/authRoutes.js';
import orderRouter from './routes/orderRoutes.js';

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
app.use(express.urlencoded({ extended: true }));

app.get('/api/keys/paystack', (req, res) => {
  res.send(process.env.PAYSTACK_PUBLIC_KEY || 'sb');
});

// http://localhost:5000/api/seed
app.use('/api/seed', seedRouter);

app.use('/api/products', productRouter);
app.use('/api/orders', orderRouter);
app.use('/api/users', userRoutes);

app.use((err, req, res, next) => {
  res.status(500).json({ message: err.message });
});

const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Server running on: http://localhost:${port}`);
});
