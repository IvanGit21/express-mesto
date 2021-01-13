const path = require("path");
const fsPromises = require("fs").promises;
const User = require("../models/users");

const getUsers = (req, res) => {
  const filePath = path.join(__dirname, "../", "data", "users.json");
  fsPromises
    .readFile(filePath, { encoding: "utf-8" })
    .then((result) => {
      const users = JSON.parse(result);
      res.send(users);
    })
    .catch((err) => {
      res.status(500).send({ message: "Server Error" });
    });
};
const getUser = (req, res) => {
  const { id } = req.params;
  const filePath = path.join(__dirname, "../", "data", "users.json");
  fsPromises
    .readFile(filePath, { encoding: "utf-8" })
    .then((result) => {
      const users = JSON.parse(result);
      const user = users.find((user) => user._id === id);
      if (!user) {
        res.status(404).send({ message: "Нет пользователя с таким id" });
        return;
      }
      res.send(user);
    })
    .catch((err) => {
      res.status(500).send({ message: "Server Error" });
    });
};

const createUser = (req, res) => {
  const {name, about, avatar } = req.body;
  User.create({ name, about, avatar})
    .then((user) => res.send({data:user}))
    .catch((err) => res.status(500).send({messege:`${err}`}))
};

module.exports = {
  getUsers,
  getUser,
  createUser,
};
