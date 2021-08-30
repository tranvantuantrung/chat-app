const jwt = require('jsonwebtoken');

const {
  FORBIDDEN_STATUS,
  UNAUTHORIZED_STATUS,
} = require('../constants/httpStatus.constant');

module.exports.checkAuth = (req, res, next) => {
  const token = req.headers['authorization'];

  if (token === null) {
    return res.status(UNAUTHORIZED_STATUS).send('unauthorized');
  }

  const jwtToken = token.split(' ')[1];
  try {
    const user = jwt.verify(jwtToken, process.env.JWT_KEY);

    req.user = user;
  } catch (error) {
    return res.status(FORBIDDEN_STATUS).send('wrong token');
  }

  next();
};
