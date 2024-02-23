const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../utils/config");
const User = require("../models/user");
const {
  InternalError,
  InvalidDataError,
  InvalidIdError,
  ConflictError,
  UnauthorizedError,
} = require("../utils/constants");

// module.exports.getUsers = (req, res) => {
//   User.find({})
//     .then((user) => res.send(user))
//     .catch((err) => {
//       console.log(err);
//       res.status(InternalError).send([{ message: "Server error" }]);
//     });
// };

// module.exports.getUserById = (req, res) => {
//   const { userId } = req.params;
//   User.findById(userId)
//     .orFail()
//     .then((user) => res.send(user))
//     .catch((err) => {
//       console.error(err);

//       if (err.name === "CastError") {
//         return res.status(InvalidDataError).send({ message: "Bad request" });
//       }
//       if (err.name === "DocumentNotFoundError") {
//         return res
//           .status(InvalidIdError)
//           .send({ message: "Cannot find item with that Id" });
//       }
//       return res.status(InternalError).send({ message: "Server error" });
//     });
// };

module.exports.createUser = (req, res) => {
  const { name, avatar, email, password } = req.body;

  bcrypt.hash(password, 10).then((hash) => {
    User.create({ name, avatar, email, password: hash })
      .then((user) => {
        res.send({
          name: user.name,
          avatar: user.avatar,
          email: user.email,
        });
        if (!email) {
          throw new Error({ message: "Duplicate email" });
        }
      })
      .catch((err) => {
        console.log(err);

        if (err.code === 11000) {
          return res.status(ConflictError).send({ message: "Duplicate user" });
        }

        if (err.name === "ValidationError") {
          return res.status(InvalidDataError).send({ message: "Invalid data" });
        }
        return res.status(InternalError).send({ message: "Server Error" });
      });
  });
};

module.exports.getCurrentUser = (req, res) => {
  const userId = req.user._id;
  User.findById(userId)
    .orFail()
    .then((user) => {
      console.log(user);
      res.send({ user });
    })
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

module.exports.updateUser = (req, res) => {
  const { name, avatar } = req.body;
  User.findOneAndUpdate(
    { _id: req.user._id },
    { name, avatar },
    { new: true, runValidators: true },
  )
    .then((user) => {
      res.send(user);
    })
    .catch((err) => {
      console.error(err);
      if (err.name === "ValidationError") {
        return req.status(InvalidDataError).send({ message: "Data not found" });
      }
      return res.status(InternalError).send({ message: "Server error" });
    });
};

module.exports.login = (req, res) => {
  const { email, password } = req.body;

  User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign({ _id: user._id }, JWT_SECRET, {
        expiresIn: "7d",
      });
      res.send({ token });
    })
    .catch((err) => {
      console.error(err);

      if (err.name === "DocumentNotFoundError") {
        return res
          .status(InvalidIdError)
          .send({ message: "Cannot find user with that Id" });
      }
      if (err.message === "Incorrect email or password") {
        return res.status(InvalidDataError).send({ message: "User data not found" });
      }
      if (err.name === "Unauthorized") {
        return res
          .status(UnauthorizedError)
          .send({ message: "User unathorized" });
      }


      return res.status(InternalError).send({ message: "Server error" });
    });
};
