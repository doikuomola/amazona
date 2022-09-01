import express from 'express';
import orderCtrl from '../controllers/orderCtrl.js';
import { isAdmin, isAuth } from '../utils/utils.js';

const orderRouter = express.Router();

orderRouter.get('/mine', isAuth, orderCtrl.mine);
orderRouter.post('/', isAuth, orderCtrl.createOrder);
// admin
orderRouter.get('/summary', isAuth, isAdmin, orderCtrl.summary);


orderRouter.get('/:id', isAuth, orderCtrl.getOrder);

orderRouter.put('/:id/deliver', isAuth, orderCtrl.deliver);
orderRouter.put('/:id/pay', isAuth, orderCtrl.pay);

export default orderRouter;
