const mongoose = require('mongoose');

const messageSchema = mongoose.Schema({
  content: { type: String },
  author: { type: mongoose.Schema.Types.Mixed, ref: 'User' },
  date: { type: Date, default: Date.now },
  type: { type: String, default: 'text' },
});

const roomSchema = mongoose.Schema({
  name: { type: String },
  password: { type: String, require: true },
  admin: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  members: [
    { type: mongoose.Schema.Types.Mixed, ref: 'User', default: ['system'] },
  ],
  messages: [{ type: messageSchema, default: [] }],
});

const Room = mongoose.model('Room', roomSchema);

module.exports = Room;
