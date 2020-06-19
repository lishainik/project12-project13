const usersRouter = require('express').Router();
const users = require('../data/users');

usersRouter.get('/users', (req, res) => {
  res.send(users);
});

usersRouter.get('/users/:id', (req, res) => {
  users.forEach((element) => {
    if (element._id === req.params.id) { res.send(element); }
  });

  res.send({ message: 'Нет пользователя с таким id' });
});

module.exports = usersRouter;
