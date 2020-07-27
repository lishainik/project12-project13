const bcrypt = require('bcryptjs');
const User = require('../models/user');
const NotFoundError = require('../errors/not-found-err');
const BadRequestError = require('../errors/bad-request-err');
const ConflictError = require('../errors/conflict-err');

module.exports.getUsers = (req, res, next) => {
  User.find({})
    .then((users) => res.send({ users }))
    .catch(() => {
      throw new Error('Ошибка чтения базы данных');
    })
    .catch(next);
};

module.exports.createUser = (req, res, next) => {
  const {
    name, about, avatar, email, password,
  } = req.body;
  if (password === undefined || password.length === 0) {
    throw new BadRequestError('Пароль не должен быть пустым');
  } else {
    bcrypt.hash(req.body.password, 10)
      .then((hash) => User.create({
        name, about, avatar, email, password: hash,
      })
        .then((user) => res.status(201).send({
          name: user.name,
          about: user.about,
          avatar: user.avatar,
          email: user.email,
        }))
        .catch((err) => {
          if (err.name === 'ValidationError') {
            throw new BadRequestError('Ошибка валидации запроса');
          } else if (err.name === 'MongoError' && err.code === 11000) {
            throw new ConflictError('Данный email уже зарегистрирован');
          } else {
            throw new Error('Ошибка валидации');
          }
        }))
      .catch(next);
  }
};

module.exports.getUserById = (req, res, next) => {
  User.findById(req.params.userId)
    .catch(() => {
      throw new BadRequestError('Некорректный формат ID');
    })
    .then((user) => {
      if (user === null) {
        throw new NotFoundError('Пользователь не найден');
      } else {
        res.send({ user });
      }
    })
    .catch(next);
};
