const Card = require("../models/cards");

const getCards = (req, res) => {
  Card.find({})
    .then((cards) => res.status(200).send(cards))
    .catch((err) => res.status(500).send({ messege: `${err.messege}` }));
};

const createCard = (req, res) => {
  const { name, link } = req.body;
  const { id } = req.params;
  Card.create({ name, link, owner: id })
    .then((card) => res.status(201).send({ data: card }))
    .catch((err) => {
      if(!name && !link){
        res.status(500).send({ messege: `${err.messege}` })
      }else{
        res.status(404).send({ messege: `${err.messege}` })
      }
    });
};
const deleteCard = (req, res) => {
  const { id } = req.params;
  Card.findByIdAndRemove(id)
    .then((card) => {
      if (!card) {
        return res.ststus(404).send({ messege: `${err.messege}` });
      } else {
        return res.status(200).send({ data: card });
      }
    })
    .catch((err) => {
      if (err.name === "CastError") {
        res.status(400).send({ messege: `${err.messege}` });
      } else {
        res.status(500).send({ messege: `${err.messege}` });
      }
    });
};

const likeCard = (req, res) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: req.user._id } },
    { new: true }
  )
    .then((card) => {
      if (!card) {
        return res.ststus(404).send({ messege: `${err.messege}` });
      } else {
        res.status(200).send({ data: card });
      }
    })
    .catch((err) => {
      if (err.name === "CastError") {
        res.status(400).send({ messege: `${err.messege}` });
      } else {
        res.status(500).send({ messege: `${err.messege}` });
      }
    });
};

const dislikeCard = (req, res) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $pull: { likes: req.user._id } },
    { new: true }
  )
    .then((card) => {
      if (!card) {
        return res.ststus(404).send({ messege: `${err.messege}` });
      } else {
        return res.ststus(404).send({ messege: `${err.messege}` });
      }
    })
    .catch((err) => {
      if (err.name === "CastError") {
        res.status(400).send({ messege: `${err.messege}` });
      } else {
        res.status(500).send({ messege: `${err.messege}` });
      }
    });
};

module.exports = {
  getCards,
  createCard,
  deleteCard,
  likeCard,
  dislikeCard,
};
