const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const session = require('express-session');
const mongoose = require('mongoose');

const url = 'mongodb://localhost:27017/hcs';

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors({
  credentials: true,
  origin: true
}));

mongoose.connect(url, { useNewUrlParser: true });
mongoose.set('useCreateIndex', true);

app.use(session({
  secret: 'somesecret',
  resave: true,
  saveUninitialized: false
}));

const authRoutes = require('./routes/auth');
const userRoutes = require('./routes/user');
const taskRoutes = require('./routes/task');
app.use('/auth', authRoutes);
app.use('/user', userRoutes);
app.use('/task', taskRoutes);

// 404
app.use((req, res, next) => {
  const err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// other errors
app.use((err, req, res, next) => {
  res.status(err.status || 500).json({
    message: err.message,
    error: true
  });
});

app.listen(3001, () => {
  console.log('App listening on port 3001');
});
