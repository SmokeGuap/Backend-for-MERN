import express from 'express';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import mongoose from 'mongoose';
import { validationResult } from 'express-validator';

import { registerValidation } from './validations/auth.js';
import User from './models/User.js';
import checkAuth from './middleWares/checkAuth.js';

const app = express();

mongoose
  .connect('mongodb://127.0.0.1:27017/mern')
  .then(() => console.log('MongoDB is running'))
  .catch((error) => console.log('DB error', error));

app.use(express.json());

app.post('/auth/register', registerValidation, async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json(errors.array());
    }

    const password = req.body.password;
    const salt = await bcrypt.genSalt(10);
    const passwordHash = await bcrypt.hash(password, salt);

    const doc = new User({
      email: req.body.email,
      fullName: req.body.fullName,
      avatarUrl: req.body.avatarUrl,
      passwordHash,
    });
    const user = await doc.save();

    const { passwordHash: hash, ...userData } = user._doc;
    res.json({ ...userData });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: 'Не удалось зарегистрироваться',
    });
  }
});

app.post('/auth/login', async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (!user) {
      res.status(404).json({
        message: 'Пользователь не найден',
      });
    } else {
      const isValidPass = await bcrypt.compare(
        req.body.password,
        user._doc.passwordHash
      );
      if (!isValidPass) {
        res.status(400).json({
          message: 'Неверный логин или пароль',
        });
      } else {
        const token = jwt.sign(
          {
            _id: user._id,
          },
          'secret',
          { expiresIn: '30d' }
        );
        const { passwordHash, ...userData } = user._doc;
        res.json({ ...userData, token });
      }
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Не удалось авторизоваться' });
  }
});

app.get('/auth/me', checkAuth, async (req, res) => {
  try {
    const user = await User.findById(req.userId);

    if (!user) {
      return res.status(404).json({
        message: 'Пользователь не найден',
      });
    } else {
      const { passwordHash, ...userData } = user._doc;
      res.json({
        ...userData,
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: 'Нет доступа',
    });
  }
});

app.listen('4444', (error) => {
  if (error) {
    return console.log(error);
  }
  console.log('Server running!');
});
