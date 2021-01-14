const Card = require("../models/cards");

const getCards = (req, res) => {
  Card.find({})
    .then((cards)=>res.status(200).send(cards))
    .catch((err) => res.status(500).send({ messege: `${err}` }));
};

const createCard = (req, res) => {
  const { name, link } = req.body;
  Card.create({ name, link, owner:req._id })
    .then((card) => res.status(201).send({ data: card }))
    .catch((err) => res.status(500).send({ messege: `${err}` }));
};

const deleteCard = (req, res) => {
  const { id } = req.params;
  Card.findByIdAndRemove(id)
    .then((card) => res.status(200).send({ data: card }))
    .catch((err) => res.status(500).send({ messege: `${err}` }));
};

module.exports = {
  getCards,
  createCard,
  deleteCard,
};
