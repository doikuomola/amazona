import express from 'express';
import authCtrl from '../controllers/authCtrl.js';

const userRoutes = express.Router();

userRoutes.post('/signin', authCtrl.signin);

export default userRoutes;
