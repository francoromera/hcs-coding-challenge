const error = require('./response').error;

const withSession = (req, res, next) => {
  if (!req.session.userId) {
    return error(next, 401, 'Access defined');
  }
  next();
};

module.exports = {
  withSession
};