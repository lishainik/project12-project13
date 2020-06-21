const cardsRouter = require('express').Router();
const path = require('path');
const fs = require('fs');

const cards = path.join(__dirname, '../data/cards.json');

cardsRouter.get('/cards', (req, res) => {
  fs.readFile(cards, 'utf8', (err, contents) => {
    if (err) {
      res.status(500).send({ message: 'Ошибка чтения базы данных' });
    }
    try {
      const result = JSON.parse(contents);
      res.json(result);
    } catch (error) {
      res.status(500).send({ message: 'Ошибка чтения базы данных' });
    }
  });
});

cardsRouter.all('*', (req, res) => {
  res.status(404).send({ message: 'Запрашиваемый ресурс не найден' });
});

module.exports = cardsRouter;
