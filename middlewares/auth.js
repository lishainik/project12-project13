/* eslint-disable consistent-return */
const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
  if (req.headers.cookie) {
    const token = req.headers.cookie.replace('jwt=Bearer%20', '');
    let payload;

    try {
      payload = jwt.verify(token, 'some-secret-key');
    } catch (err) {
      return res.status(401).send({ message: 'Необходима авторизация' });
    }
    req.user = payload;
  } else {
    return res.status(401).send({ message: 'Необходима авторизация' });
  }
  next();
};
