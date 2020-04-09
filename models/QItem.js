const mongoose = require('mongoose');

const QItemSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  user_id: {
    type: String,
    required: true
  },
  type: {
    type: String,
    default: "normal"
  },
  status: {
    type: String,
    default: "active"
  },
  time: {
    type: Date,
    default: Date.now
  }
});

module.exports = QItem = mongoose.model('QItem', QItemSchema);