const cardsRouter = require('express').Router();

const cards = require('../data/cards.json');

cardsRouter.get('/cards', (req, res) => {
  res.send(cards);
});

cardsRouter.get('*', (req, res) => {
  res.send({ message: 'Запрашиваемый ресурс не найден' }, 404);
});

module.exports = cardsRouter;
