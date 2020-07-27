/* eslint-disable eqeqeq */
const Card = require('../models/card');
const NotFoundError = require('../errors/not-found-err');
const AuthorizationError = require('../errors/auth-err');
const BadRequestError = require('../errors/bad-request-err');

module.exports.getCards = (req, res, next) => {
  Card.find({})
    .then((cards) => res.send({ cards }))
    .then((err) => {
      if (err) { throw new Error('Ошибка чтения базы данных'); }
    })
    .catch(next);
};

module.exports.createCard = (req, res, next) => {
  const { name, link } = req.body;
  Card.create({ name, link, owner: req.user._id })
    .then((card) => res.send({ card }))
    .then((err) => {
      if (err) {
        if (err.name === 'ValidationError') {
          throw new BadRequestError('Ошибка валидации запроса');
        } else {
          throw new Error('Ошибка сервера');
        }
      }
    })
    .catch(next);
};

module.exports.deleteCard = (req, res, next) => {
  Card.findById(req.params.cardId)
    .catch((err) => {
      if (err.name === 'CastError') {
        throw new BadRequestError('Некорректный формат ID');
      }
    })
    .then((card) => {
      if (card === null) {
        throw new NotFoundError('Такой карточки не существует');
      }
      return card;
    })
    .then((card) => {
      if (card.owner == req.user._id) {
        Card.findByIdAndRemove({ _id: card._id })
          .then(() => { res.send({ card }); });
      } else {
        throw new AuthorizationError('Запрещено удалять чужие карты');
      }
    })
    .catch(next);
};
