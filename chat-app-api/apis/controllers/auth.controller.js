const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const User = require('../models/user.model');

const {
  OK_STATUS,
  CREATED_STATUS,
  BAD_REQUEST_STATUS,
  FORBIDDEN_STATUS,
  UNAUTHORIZED_STATUS,
} = require('../constants/httpStatus.constant');

module.exports.auth = async (req, res) => {
  const token = req.headers['authorization'];

  if (token === null) {
    return res.status(UNAUTHORIZED_STATUS).send('unauthorized');
  }

  const jwtToken = token.split(' ')[1];
  try {
    const user = jwt.verify(jwtToken, process.env.JWT_KEY);
    const userMatched = await User.findOne({ username: user.username });

    return res.status(OK_STATUS).send(userMatched);
  } catch (error) {
    return res.status(FORBIDDEN_STATUS).send('Wrong token.');
  }
};

module.exports.login = async (req, res) => {
  const { username, password } = req.body;

  const user = await User.findOne({ username });
  if (!user) {
    return res.status(BAD_REQUEST_STATUS).send('user does not exist');
  }

  const comparePassword = await bcrypt.compare(password, user.password);
  if (!comparePassword) {
    return res.status(BAD_REQUEST_STATUS).send('password is incorrect');
  }

  const payload = {
    username,
    avatarUrl: user.avatarUrl,
  };

  try {
    const token = jwt.sign(payload, process.env.JWT_KEY);

    return res.status(OK_STATUS).json({ token });
  } catch (error) {
    return res.status(BAD_REQUEST_STATUS).send('Error: ', error);
  }
};

module.exports.register = async (req, res) => {
  const { username, password, rePassword } = req.body;

  const existedUser = await User.findOne({ username });
  if (existedUser) {
    return res.status(BAD_REQUEST_STATUS).send('username is already taken');
  }

  if (password !== rePassword) {
    return res
      .status(BAD_REQUEST_STATUS)
      .send('re-enter password is incorrect');
  }

  const rounds = 10;
  const salt = await bcrypt.genSalt(rounds);
  const hashedPassword = await bcrypt.hash(password, salt);

  const avatarUrl = process.env.DEFAULT_AVATAR_URL;

  const newUser = new User({
    username,
    avatarUrl,
    password: hashedPassword,
    rooms: [],
  });

  try {
    await newUser.save();
  } catch (error) {
    return res.status(BAD_REQUEST_STATUS).send(error);
  }

  const payload = { username, avatarUrl };
  const token = jwt.sign(payload, process.env.JWT_KEY);

  return res.status(CREATED_STATUS).json({ token });
};
