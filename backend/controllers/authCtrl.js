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
  userProfile: expressAsyncHandler(async (req, res) => {
    const user = await User.findById(req.user._id);
    if (user) {
      user.name = req.body.name || user.name;
      user.email = req.body.email || user.email;
      if (req.body.password) {
        user.password = bcrypt.hashSync(req.body.password, 8);
      }

      const updatedUser = await user.save();
      res.send({
        _id: updatedUser._id,
        name: updatedUser.name,
        email: updatedUser.email,
        isAdmin: updatedUser.isAdmin,
        token: generateToken({ updatedUser }),
      });
    } else {
      res.status(404).send({ message: 'User not found' });
    }
  }),
};

export default authCtrl;
