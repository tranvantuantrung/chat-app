const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: { type: String },
  password: { type: String },
  avatarUrl: { type: String },
  rooms: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Room' }],
});

const User = mongoose.model('User', userSchema);

module.exports = User;
