const User = require("../models/user");
const {
  InternalError,
  InvalidDataError,
  InvalidIdError,
} = require("../utils/errors");

module.exports.getUsers = (req, res) => {
  User.find({})
    .then((user) => res.send(user))
    .catch((err) => {
      console.log(err);
      res.status(InternalError).send([{ message: "Server error" }]);
    });
};

module.exports.getUserById = (req, res) => {
  const { userId } = req.params;
  User.findById(userId)
    .orFail()
    .then((user) => res.send(user))
    .catch((err) => {
      console.error(err);

      if (err.name === "CastError") {
        return res.status(InvalidDataError).send({ message: "Bad request" });
      }
      if (err.name === "DocumentNotFoundError") {
        return res
          .status(InvalidIdError)
          .send({ message: "Cannot find item with that Id" });
      }
      return res.status(InternalError).send({ message: "Server error" });
    });
};

module.exports.createUser = (req, res) => {
  const { name, avatar } = req.body;
  User.create({ name, avatar })
    .then((user) => res.send(user))
    .catch((err) => {
      console.log(err);
      if (err.name === "ValidationError") {
        res.status(InvalidDataError).send({ message: "Cannot create user" });
      } else {
        res.status(InternalError).send({ message: "Server error" });
      }
    });
};
