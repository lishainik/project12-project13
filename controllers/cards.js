/* eslint-disable eqeqeq */
const Card = require('../models/card');

module.exports.getCards = (req, res) => {
  Card.find({})
    .then((cards) => res.send({ cards }))
    .catch(() => res.status(500).send({ message: 'Ошибка чтения базы данных' }));
};

module.exports.createCard = (req, res) => {
  const { name, link } = req.body;
  Card.create({ name, link, owner: req.user._id })
    .then((card) => res.send({ card }))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        res.status(400).send({ message: 'Ошибка валидации запроса' });
      } else {
        res.status(500).send({ message: 'Ошибка сервера' });
      }
    });
};

module.exports.deleteCard = (req, res) => {
  Card.findById(req.params.cardId)
    .then((card) => {
      if (card === null) {
        return Promise.reject(new Error('Такой карточки не существует'));
      }
      return card;
    })
    .then((card) => {
      if (card.owner == req.user._id) {
        Card.findByIdAndRemove({ _id: card._id })
          .then(() => { res.send({ card }); });
      } else {
        res.status(401).send({ message: 'Запрещено удалять чужие карты' });
      }
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        res.status(400).send({ message: 'Некорректный формат ID' });
      } else {
        res.status(404).send({ message: 'Такой карточки не существует' });
      }
    });
};
