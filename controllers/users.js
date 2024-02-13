const User = require("../models/user");
const {
  INTERNAL_ERROR,
  Invalid_Data_ERROR,
  Invalid_Id_ERROR,
} = require("../utils/errors");

module.exports.getUsers = (req, res) => {
  User.find({})
    .then((user) => res.status(200).send(user))
    .catch(() => {
      console.log(err);
      res
        .status(Invalid_Data_ERROR)
        .send([{ message: "Unable to find users" }]);
    });
};

module.exports.getUserById = (req, res) => {
  const { userId } = req.params;
  User.findById(userId)
    .orFail()
    .then((user) => res.status(200).send(user))
    .catch((err) => {
      console.log(err);
      if (err.name === "DocumentNotFoundError") {
        res.status(Invalid_Id_ERROR).send({ message: "Invalid user Id" });
      } else {
        res
          .status(Invalid_Data_ERROR)
          .send({ message: "Cannot find User with that Id" });
      }
    });
};

module.exports.createUser = (req, res) => {
  const { name, avatar } = req.body;
  User.create({ name, avatar })
    .then((user) => res.status(201).send(user))
    .catch((err) => {
      console.log(err);
      res.status(Invalid_Data_ERROR).send({ message: "Cannot create user" });
    });
};
