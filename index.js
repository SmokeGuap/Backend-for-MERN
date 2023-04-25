import express from 'express';
import mongoose from 'mongoose';
import multer from 'multer';
import * as dotenv from 'dotenv';
dotenv.config();

import { UserControllers, PostControllers } from './controllers/index.js';
import checkAuth from './middleWares/checkAuth.js';
import * as validations from './validations.js';
import validationErrors from './middleWares/validationErrors.js';

const port = process.env.PORT || 4000;
const DB_HOST = process.env.DB_HOST;

const app = express();
const upload = multer({
  storage: multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, 'uploads');
    },
    filename: (req, file, cb) => {
      cb(null, file.originalname);
    },
  }),
});

mongoose
  .connect(DB_HOST)
  .then(() => console.log('MongoDB is running'))
  .catch((error) => console.log('DB error', error));

app.use(express.json());
app.use('/uploads', express.static('uploads'));

app.post(
  '/auth/register',
  validations.register,
  validationErrors,
  UserControllers.register
);
app.post(
  '/auth/login',
  validations.login,
  validationErrors,
  UserControllers.login
);
app.get('/auth/me', checkAuth, UserControllers.getMe);

app.post(
  '/posts',
  checkAuth,
  validations.post,
  validationErrors,
  PostControllers.create
);
app.get('/posts', PostControllers.getAll);
app.get('/posts/:id', PostControllers.getOne);
app.patch(
  '/posts/:id',
  checkAuth,
  validations.post,
  validationErrors,
  PostControllers.update
);
app.delete('/posts/:id', checkAuth, PostControllers.remove);

app.post('/uploads', upload.single('image'), PostControllers.upload);

app.listen(port, (error) => {
  if (error) {
    return console.log(error);
  }
  console.log('Server running!');
});
