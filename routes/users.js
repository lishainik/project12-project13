/* eslint-disable consistent-return */
/* eslint-disable array-callback-return */
const usersRouter = require('express').Router();
const path = require('path');
const fs = require('fs');

const users = path.join(__dirname, '../data/users.json');

usersRouter.get('/users', (req, res) => {
  fs.readFile(users, 'utf8', (err, contents) => {
    res.send(contents);
  });
});

usersRouter.get('/users/:id', (req, res) => {
  fs.readFile(users, 'utf8', (err, contents) => {
    const usersdb = JSON.parse(contents);
    if (Array.isArray(usersdb) === true) {
      const result = usersdb.filter((element) => {
        // eslint-disable-next-line no-underscore-dangle
        if (element._id === req.params.id) {
          return element;
        }
      });
      if (result.length === 0) {
        res.status(404).send({ message: 'Нет пользователя с таким id' });
      } else {
        res.send(result);
      }
    }
  });
});
module.exports = usersRouter;
