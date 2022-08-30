import express from 'express';
import orderCtrl from '../controllers/orderCtrl.js';
import { isAuth } from '../utils/utils.js';

const orderRouter = express.Router();

orderRouter.post('/', isAuth, orderCtrl.createOrder);

export default orderRouter;
