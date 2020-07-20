const usersRouter = require('express').Router();

const { getUsers, createUser, getUserById } = require('../controllers/users');

usersRouter.get('/users', getUsers);

usersRouter.post('/users', createUser);

usersRouter.get('/users/:userId', getUserById);

module.exports = usersRouter;
