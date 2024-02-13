const User = require("../models/user");
const {
  INTERNAL_ERROR,
  Invalid_Data_ERROR,
  Invalid_Id_ERROR,
} = require("../utils/errors");

module.exports.getUsers = (req, res) => {
  User.find({})
    .then((user) => res.status(200).res.send(user))
    .catch(() => {
      res
        .status(Invalid_Data_ERROR)
        .send([{ message: "Unable to find users" }]);
    });
};

module.exports.getUserById = (req, res) => {
  User.findById(req.user._id)
    .orFail()
    .then((user) => res.status(200).res.send(user))
    .catch(() => {
      res
        .status(Invalid_Id_ERROR)
        .send({ message: "Cannot find user with that Id" });
    });
};

module.exports.createUser = (req, res) => {
  const { name, avatar } = req.body;
  User.create({ name, avatar })
    .then((user) => res.status(201).res.send(user))
    .catch(() => {
      res.status(Invalid_Data_ERROR).send({ message: "Cannot create user" });
    });
};
