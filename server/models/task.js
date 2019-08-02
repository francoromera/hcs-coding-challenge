const mongoose = require('mongoose');

const schema = new mongoose.Schema({
  description: {
    type: String,
    required: true
  },
  due: {
    type: Date,
    required: true
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
});

module.exports = mongoose.model('Task', schema);
