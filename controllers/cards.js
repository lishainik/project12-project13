const Card = require('../models/card');

module.exports.getCards = (req, res) => {
  Card.find({})
    .then((cards) => res.send({ cards }))
    .catch(() => res.status(500).send({ message: 'Ошибка чтения базы данных' }));
};

module.exports.getCardById = (req, res) => {
  Card.findById(req.params.cardId)
    .then((card) => res.send({ card }))
    .catch(() => res.status(500).send({ message: 'Ошибка чтения базы данных' }));
};

module.exports.createCard = (req, res) => {
  const { name, link } = req.body;
  Card.create({ name, link, owner: req.user._id })
    .then((card) => res.send({ card }))
    .catch(() => res.status(500).send({ message: 'Ошибка создания карточки' }));
};

module.exports.deleteCard = (req, res) => {
  Card.findByIdAndRemove(req.params.cardId)
    .then((card) => res.send({ card }))
    .catch(() => res.status(500).send({ message: 'Произошла ошибка' }));
};
