const usersRouter = require('express').Router();
const path = require('path');
const fs = require('fs');

const users = path.join(__dirname, '../data/users.json');

usersRouter.get('/users', (req, res) => {
  fs.readFile(users, 'utf8', (err, contents) => {
    if (err) {
      res.status(500).send({ message: 'Ошибка чтения базы данных' });
    }
    try {
      const result = JSON.parse(contents);
      res.send(result);
    } catch (error) {
      res.status(500).send({ message: 'Ошибка чтения базы данных' });
    }
  });
});

usersRouter.get('/users/:id', (req, res) => {
  fs.readFile(users, 'utf8', (err, contents) => {
    try {
      const usersdb = JSON.parse(contents);
      if (Array.isArray(usersdb) === true) {
        const result = usersdb.find((element) => {
          // eslint-disable-next-line no-underscore-dangle
          if (element._id === req.params.id) {
            return element;
          }
          return undefined;
        });
        if (result === undefined) {
          res.status(404).send({ message: 'Нет пользователя с таким id' });
        } else {
          res.send(result);
        }
      } else {
        res.status(500).send({ message: 'Ошибка формата базы' });
      }
    } catch (error) {
      res.status(500).send({ message: 'Ошибка чтения базы данных' });
    }
  });
});
module.exports = usersRouter;
