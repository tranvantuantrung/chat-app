const cloudinary = require('cloudinary').v2;
const bcrypt = require('bcryptjs');

const User = require('../models/user.model');

const {
  OK_STATUS,
  BAD_REQUEST_STATUS,
} = require('../constants/httpStatus.constant');

module.exports.editProfile = async (req, res) => {
  const { username, password, avatar } = req.body;
  const { username: currentUsername } = req.user;

  if (username) {
    if (username === currentUsername) {
      return res
        .status(BAD_REQUEST_STATUS)
        .send('username matches current username ');
    }

    const existedUser = await User.findOne({ username });
    if (existedUser) {
      return res.status(BAD_REQUEST_STATUS).send('username is already taken');
    }

    await User.updateOne({ username: currentUsername }, { username });
  }

  if (password) {
    const rounds = 10;
    const salt = await bcrypt.genSalt(rounds);
    const hashedPassword = await bcrypt.hash(password, salt);

    await User.updateOne(
      { username: currentUsername },
      { password: hashedPassword }
    );
  }

  if (avatar) {
    const { url } = await cloudinary.uploader.upload(avatar, {
      folder: 'Realtime-Chat-App',
    });

    await User.updateOne({ username: currentUsername }, { avatarUrl: url });
  }

  if (username || password) {
    return res.status(OK_STATUS).json({ logout: true });
  }

  const updatedUser = await User.findOne({ username: currentUsername });

  return res.status(OK_STATUS).json({ updatedUser });
};
