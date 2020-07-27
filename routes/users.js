const usersRouter = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const { getUsers, getUserById } = require('../controllers/users');

usersRouter.get('/users', getUsers);

usersRouter.get('/users/:userId', celebrate({
  params: Joi.object().keys({
    userId: Joi.string().alphanum().length(24),
  }),
}), getUserById);

module.exports = usersRouter;
