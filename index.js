import express from 'express';
import mongoose from 'mongoose';
import multer from 'multer';

import { UserControllers, PostControllers } from './controllers/index.js';
import checkAuth from './middleWares/checkAuth.js';
import * as validations from './validations.js';
import validationErrors from './middleWares/validationErrors.js';

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
  .connect('mongodb://127.0.0.1:27017/mern')
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

app.listen('4444', (error) => {
  if (error) {
    return console.log(error);
  }
  console.log('Server running!');
});
