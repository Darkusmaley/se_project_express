const User = require("../models/user");

module.exports.getUsers = (req, res) => {
  User.find({})
    .then((user) => res.status(200).res.send(user))
    .catch(() => {
      res.status(500).send({ message: "Error" });
    });
};

module.exports.getUser = (req, res) => {
  User.findById(req.params.id)
    .then((user) => res.status(200).res.send(user))
    .catch(() => {
      res.status(500).send({ message: "Error" });
    });
};

module.exports.createUser = (req, res) => {
  const { name, avatar } = req.body;
  console.log(req.body);
  User.create({ name, avatar })
    .then((user) => res.status(200).res.send(user))
    .catch(() => {
      res.status(500).send({ message: "Unable to create user" });
    });
};
