import express from 'express';
import productCtrl from '../controllers/productCtrl.js';

const productRouter = express.Router();

productRouter.get('/', productCtrl.getAllProducts);
productRouter.get('/categories', productCtrl.getCategories);
productRouter.get('/search', productCtrl.search);
productRouter.get('/slug/:slug', productCtrl.getProductBySlug);
productRouter.get('/:id', productCtrl.getProductById);

export default productRouter;
