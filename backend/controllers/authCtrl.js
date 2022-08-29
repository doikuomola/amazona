import expressAsyncHandler from 'express-async-handler';
import User from '../models/userModel.js';
import bcrypt from 'bcryptjs';
import { generateToken } from '../utils/utils.js';

const authCtrl = {
  signin: expressAsyncHandler(async (req, res) => {
    const user = await User.findOne({ email: req.body.email });
    if (user) {
      if (bcrypt.compareSync(req.body.password, user.password)) {
        res.send({
          _id: user._id,
          name: user.name,
          email: user.email,
          isAdmin: user.isAdmin,
          token: generateToken({
            _id: user._id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin,
          }),
        });
        return;
      } else {
        res.status(401).send({ message: 'Invalid email or password' });
      }
    } else {
      res.status(401).send({ message: 'Invalid email or password' });
    }
  }),
  signup: expressAsyncHandler(async (req, res) => {
    const userExists = await User.findOne({ email: req.body.email });
    if (userExists)
      return res
        .status(404)
        .send({ message: 'User with email already exists' });
    const newUser = new User({
      name: req.body.name,
      email: req.body.email,
      password: bcrypt.hashSync(req.body.password, 12),
    });
    const user = await newUser.save();
    if (user) {
      if (bcrypt.compareSync(req.body.password, user.password)) {
        res.send({
          _id: user._id,
          name: user.name,
          email: user.email,
          isAdmin: user.isAdmin,
          token: generateToken({ user }),
        });
        return;
      } else {
        res.status(401).send({ message: 'Invalid email or password' });
      }
    } else {
      res.status(401).send({ message: 'Invalid email or password' });
    }
  }),
};

export default authCtrl;
