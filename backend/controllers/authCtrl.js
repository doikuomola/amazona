import expressAsyncHandler from 'express-async-handler';
import User from '../models/userModel.js';
import bcrypt from 'bcryptjs'
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
};

export default authCtrl;
