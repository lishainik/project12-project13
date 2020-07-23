const usersRouter = require('express').Router();

const { getUsers, getUserById } = require('../controllers/users');

usersRouter.get('/users', getUsers);

usersRouter.get('/users/:userId', getUserById);

module.exports = usersRouter;
