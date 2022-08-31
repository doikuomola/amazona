import express from 'express';
import orderCtrl from '../controllers/orderCtrl.js';
import { isAuth } from '../utils/utils.js';

const orderRouter = express.Router();

orderRouter.post('/', isAuth, orderCtrl.createOrder);
orderRouter.get('/:id', isAuth, orderCtrl.getOrder);

orderRouter.put('/:id/deliver', isAuth, orderCtrl.deliver);
orderRouter.put('/:id/pay', isAuth, orderCtrl.pay);

export default orderRouter;
