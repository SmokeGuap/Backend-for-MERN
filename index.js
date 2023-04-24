import express from 'express';
import jwt from 'jsonwebtoken';
import mongoose from 'mongoose';

const app = express();

mongoose
  .connect('mongodb://127.0.0.1:27017')
  .then(() => console.log('MongoDB is running'))
  .catch((error) => console.log('DB error', error));

app.use(express.json());
app.get('/', (req, res) => {
  res.send('hello world!');
});

app.post('/auth/login', (req, res) => {
  console.log(req.body);

  const token = jwt.sign(
    {
      email: req.body.email,
      fullname: 'Dima Dimanov',
    },
    'secret'
  );
  res.json({ success: true, token });
});

app.listen('4444', (error) => {
  if (error) {
    return console.log(error);
  }
  console.log('Server running!');
});
