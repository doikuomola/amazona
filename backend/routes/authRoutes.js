import express from 'express';
import authCtrl from '../controllers/authCtrl.js';
import { isAuth } from '../utils/utils.js';

const userRoutes = express.Router();

userRoutes.post('/signin', authCtrl.signin);
userRoutes.post('/signup', authCtrl.signup);

// http://localhost:5000/api/users/profile
userRoutes.put('/profile', isAuth, authCtrl.userProfile);

export default userRoutes;
