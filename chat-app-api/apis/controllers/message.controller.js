const cloudinary = require('cloudinary').v2;

const User = require('../models/user.model');
const Room = require('../models/room.model');

const { CREATED_STATUS } = require('../constants/httpStatus.constant');

module.exports.sendMessage = async (req, res) => {
  const { roomId, content, type } = req.body;
  const { username } = req.user;
  const { io } = req.app;

  const user = await User.findOne({ username });
  const room = await Room.findOne({ _id: roomId });

  let message;

  if (type === 'image') {
    const { url } = await cloudinary.uploader.upload(content, {
      folder: 'Realtime-Chat-App',
    });

    message = {
      author: user._id,
      content: url,
      type,
    };
  } else {
    message = {
      author: user._id,
      content,
    };
  }

  await room.updateOne({ $push: { messages: message } });
  const updatedRoom = await Room.findOne({ _id: roomId });
  const members = await User.find({ rooms: roomId });

  io.in(roomId).emit('server-emit-send-message', {
    members,
    messages: updatedRoom.messages,
    roomId: updatedRoom._id,
  });

  return res
    .status(CREATED_STATUS)
    .json({ members, messages: updatedRoom.messages });
};
