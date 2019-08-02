const express = require('express');
const router = express.Router();
const User = require('../models/user');
const bcrypt = require('bcrypt');
const error = require('../helpers/response').error;

router.post('/login', async (req, res, next) => {
  if (!req.body.username || !req.body.password) {
    return error(next, 400, 'Username and password are required');
  }
  try {
    const user = await User.findOne({ username: req.body.username }).exec();
    if (!user) {
      return error(next, 400, 'Username or password is incorrect');
    }
    bcrypt.compare(req.body.password, user.password, (err, result) => {
      if (!result) {
        return error(next, 400, 'Username or password is incorrect');
      }
      req.session.userId = user._id;
      return res.json(user);
    });
  } catch (error) {
    return next(error);
  }
})

router.post('/logout', (req, res) => {
  if (req.session) {
    req.session.destroy();
  }
  res.status(200).send();
});

module.exports = router;
