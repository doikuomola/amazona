import express from 'express';
import dotenv from 'dotenv';
import data from './data.js';

const app = express();
dotenv.config();

app.get('/api/products', (req, res) => {
  res.send(data.products);
});

const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Server running on: http://localhost:${port}`);
});
