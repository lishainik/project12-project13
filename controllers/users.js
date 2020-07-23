const bcrypt = require('bcryptjs');
const User = require('../models/user');

module.exports.getUsers = (req, res) => {
  User.find({})
    .then((users) => res.send({ users }))
    .catch(() => res.status(500).send({ message: 'Ошибка чтения базы данных' }));
};

module.exports.createUser = (req, res) => {
  const {
    name, about, avatar, email, password,
  } = req.body;
  if (password === undefined || password.length === 0) {
    res.status(400).send({ message: 'Пароль не должен быть пустым' });
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
            res.status(400).send({ message: 'Ошибка валидации запроса' });
          } else if (err.name === 'MongoError' && err.code === 11000) {
            res.status(409).send({ message: 'Данный email уже зарегистрирован' });
          } else {
            res.status(500).send({ message: 'Ошибка валидации' });
          }
        }));
  }
};

module.exports.getUserById = (req, res) => {
  User.findById(req.params.userId)
    .then((user) => {
      if (user === null) {
        res.status(404).send({ message: 'Пользователь не найден' });
      } else {
        res.send({ user });
      }
    })
    .catch(() => res.status(400).send({ message: 'Некорректный формат ID' }));
};
