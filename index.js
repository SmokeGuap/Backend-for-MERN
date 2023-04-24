import express from 'express';
import mongoose from 'mongoose';

import { registerValidation } from './validations/auth.js';
import checkAuth from './middleWares/checkAuth.js';
import { register, login, getMe } from './middleWares/Queries/UserQueries.js';

const app = express();

mongoose
  .connect('mongodb://127.0.0.1:27017/mern')
  .then(() => console.log('MongoDB is running'))
  .catch((error) => console.log('DB error', error));

app.use(express.json());

app.post('/auth/register', registerValidation, register);

app.post('/auth/login', login);

app.get('/auth/me', checkAuth, getMe);

app.listen('4444', (error) => {
  if (error) {
    return console.log(error);
  }
  console.log('Server running!');
});
