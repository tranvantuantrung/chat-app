const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const {
  OK_STATUS,
  BAD_REQUEST_STATUS,
  CREATED_STATUS,
} = require('../constants/httpStatus.constant');

const User = require('../models/user.model');
const Room = require('../models/room.model');

module.exports.getRooms = async (req, res) => {
  const { username } = req.user;

  const user = await User.findOne({ username });
  const rooms = await Room.find({ members: user._id });

  const arrangedRooms = [];

  user.rooms.forEach((roomId) => {
    const matchedRoom = rooms.find(
      (room) => room._id.toString() === roomId.toString()
    );

    arrangedRooms.push(matchedRoom);
  });

  return res.status(OK_STATUS).json({ rooms: arrangedRooms });
};

module.exports.arrangeRooms = async (req, res) => {
  const { roomId } = req.params;
  const { username } = req.user;

  const convertedRoomId = mongoose.Types.ObjectId(roomId);

  await User.updateOne({ username }, { $pull: { rooms: roomId } });
  await User.updateOne(
    { username },
    { $push: { rooms: { $each: [convertedRoomId], $position: 0 } } }
  );

  const user = await User.findOne({ username });
  const rooms = await Room.find({ members: user._id });

  const arrangedRooms = [];

  user.rooms.forEach((roomId) => {
    const matchedRoom = rooms.find(
      (room) => room._id.toString() === roomId.toString()
    );

    arrangedRooms.push(matchedRoom);
  });

  return res.status(OK_STATUS).json({ rooms: arrangedRooms });
};

module.exports.getRoom = async (req, res) => {
  const { roomId } = req.params;

  try {
    const room = await Room.findOne({ _id: roomId });

    return res.status(OK_STATUS).json({ room });
  } catch (error) {
    return res
      .status(BAD_REQUEST_STATUS)
      .send('something wrong, please try again');
  }
};

module.exports.getMembers = async (req, res) => {
  const { roomId } = req.params;

  const members = await User.find({ rooms: roomId });

  return res.status(OK_STATUS).json({ members });
};

module.exports.create = async (req, res) => {
  const { username } = req.user;
  const { name, password } = req.body;

  const room = await Room.findOne({ name });
  if (room) {
    return res.status(BAD_REQUEST_STATUS).send('room name is already taken');
  }

  const rounds = 10;
  const salt = await bcrypt.genSalt(rounds);
  const hashedPassword = await bcrypt.hash(password, salt);

  const user = await User.findOne({ username });
  const systemNotification = {
    author: 'system',
    content: `${username} has created room`,
  };
  const newRoom = new Room({
    name,
    password: hashedPassword,
    admin: user._id,
    members: [user._id],
    messages: [systemNotification],
  });

  try {
    const createdRoom = await newRoom.save();

    await User.updateOne(
      { username },
      { $push: { rooms: { $each: [createdRoom._id], $position: 0 } } }
    );

    return res.status(CREATED_STATUS).json({ createdRoom: newRoom });
  } catch (error) {
    return res
      .status(BAD_REQUEST_STATUS)
      .send('something wrong, please try again');
  }
};

module.exports.join = async (req, res) => {
  const { name, password } = req.body;
  const { username } = req.user;
  const { io } = req.app;

  const room = await Room.findOne({ name });

  if (!room) {
    return res.status(BAD_REQUEST_STATUS).send('room does not exist');
  }

  const existedUser = await User.findOne({ rooms: room._id });
  if (existedUser.username === username) {
    return res.status(BAD_REQUEST_STATUS).send('user is already in the room');
  }

  const comparePassword = await bcrypt.compare(password, room.password);
  if (!comparePassword) {
    return res.status(BAD_REQUEST_STATUS).send('password is incorrect');
  }

  const systemNotification = {
    author: 'system',
    content: `${username} has joined room`,
  };

  const user = await User.findOne({ username });
  await user.updateOne({
    $push: { rooms: { $each: [room._id], $position: 0 } },
  });
  await room.updateOne({
    $push: { members: user._id, messages: systemNotification },
  });

  const updatedRoom = await Room.findOne({ name });

  const members = await User.find({ rooms: room._id });

  io.to(room._id.toString()).emit('server-emit-join-room--room', {
    members,
    messages: updatedRoom.messages,
    roomId: updatedRoom._id,
  });

  return res.status(CREATED_STATUS).json({ updatedRoom });
};
