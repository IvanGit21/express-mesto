const User = require("../models/users");

const getUsers = (req, res) => {
  User.find({})
    .then((users) => res.status(200).send({ data: users }))
    .catch((err) => res.status(500).send({ messege: `${err.messege}` }));
};
const getUser = (req, res) => {
  const { id } = req.params;
  User.findById(id)
    .then((user) => {
      if (!user) {
        return res.ststus(404).send({ messege: "Пользователь не найден!" });
      } else {
        res.status(200).send({ data: user });
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

const createUser = (req, res) => {
  const { name, about, avatar } = req.body;
  User.create({ name, about, avatar })
    .then((user) => res.status(201).send({ data: user }))
    .catch((err) => {
      if (err.name === "ValidationError") {
        res.status(400).send({ messege: `${err.messege}` });
      } else {
        res.status(500).send({ messege: `${err.messege}` });
      }
    });
};

const updateUserProfile = (req, res) => {
  const { id } = req.params;
  const { name, about } = req.body;
  User.findByIdAndUpdate(
    id,
    { name, about },
    {
      new: true,
      runValidators: true,
      upsert: true,
    }
  )
    .then((user) => {
      if (!user) {
        return res.ststus(404).send({ messege: `${err.messege}` });
      } else {
        return res.status(200).send({ data: user });
      }
    })
    .catch((err) => {
      if (err.name === "CastError") {
        res.status(400).send({ messege: `${err.messege}` });
      } else {
        res.status(500).send({ messege: `${err.messege}` });
      }
    })
    .catch((err) => {
      if (err.name === "ValidationError") {
        res.status(400).send({ messege: `${err.messege}` });
      } else {
        res.status(500).send({ messege: `${err.messege}` });
      }
    });
};

const updateUserAvatar = (req, res) => {
  const { id } = req.params;
  const { avatar } = req.body;
  User.findByIdAndUpdate(
    id,
    { avatar },
    {
      new: true,
      runValidators: true,
      upsert: true,
    }
  )
    .then((user) => {
      if (!user) {
        return res.ststus(404).send({ messege: `${err.messege}` });
      } else {
        return res.status(200).send({ data: user });
      }
    })
    .catch((err) => {
      if (err.name === "CastError") {
        res.status(400).send({ messege: `${err.messege}` });
      } else {
        res.status(500).send({ messege: `${err.messege}` });
      }
    })
    .catch((err) => {
      if (err.name === "ValidationError") {
        res.status(400).send({ messege: `${err.messege}` });
      } else {
        res.status(500).send({ messege: `${err.messege}` });
      }
    });
};

module.exports = {
  getUsers,
  getUser,
  createUser,
  updateUserProfile,
  updateUserAvatar,
};
