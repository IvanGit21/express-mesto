const path = require("path");
const fsPromises = require("fs").promises;
const Card = require("../models/cards");

const getCards = (req, res) => {
  const filePath = path.join(__dirname, "../", "data", "cards.json");
  fsPromises
    .readFile(filePath, { encoding: "utf-8" })
    .then((result) => {
      const cards = JSON.parse(result);
      res.send(cards);
    })
    .catch((err) => {
      res.status(500).send({ message: "Server Error" });
    });
};

const createCard = (req, res) => {
  const { name, link } = req.body;
  Card.create({ name, link })
    .then((card) => res.send({ data: card }))
    .catch((err) => res.status(500).send({ messege: `${err}` }));
};

const deleteCard = (req, res) => {
  const { id } = req.params;
  Card.findByIdAndRemove(id)
    .then((card) => res.send({ data: card }))
    .catch((err) => res.status(500).send({ messege: `${err}` }));
};

module.exports = {
  getCards,
  createCard,
  deleteCard,
};
