const express = require('express');
const router = express.Router();
const User = require('../models/user');
const error = require('../helpers/response').error;

router.get('/', async (req, res, next) => {
  try {
    const user = await User.findById(req.session.userId).exec();
    if (!user) {
      return error(next, 401, 'Access denied');
    }
    return res.json(user);
  } catch (error) {
    return next(error);
  }
});

router.post('/', async (req, res, next) => {
  if (req.body.password !== req.body.password2) {
    return error(next, 400, 'Passwords don\'t match');
  }
  if (!req.body.username || !req.body.password) {
    return error(next, 400, 'Username and password are required');
  }
  const user = await User.findOne({ username: req.body.username }).exec();
  if (user) {
    return error(next, 400, 'Username already in use');
  }
  try {
    const result = await User.create({
      username: req.body.username,
      password: req.body.password,
      name: req.body.name
    });
    req.session.userId = result._id;
    return res.redirect('/user');
  } catch (error) {
    return next(error);
  }
});

module.exports = router;
