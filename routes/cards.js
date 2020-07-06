const cardsRouter = require('express').Router();

const {
  getCards, createCard, getCardById, deleteCard,
} = require('../controllers/cards');

cardsRouter.get('/cards', getCards);

cardsRouter.post('/cards', createCard);

cardsRouter.get('/cards/:cardId', getCardById);

cardsRouter.delete('/cards/:cardId', deleteCard);

cardsRouter.all('*', (req, res) => {
  res.status(404).send({ message: 'Запрашиваемый ресурс не найден' });
});

module.exports = cardsRouter;
