const error = (next, code, message) => {
  const err = new Error(message || 'Unexpected error');
  err.status = code || 500;
  return next(err);
};

module.exports = {
  error
};