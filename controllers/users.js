const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../utils/config");
const User = require("../models/user");
const ConflictError = require("../utils/errors/ConflictError");
const BadRequestError = require("../utils/errors/BadRequestError");
const NotFoundError = require("../utils/errors/NotFoundError");
const UnauthorizedError = require("../utils/errors/UnauthorizedError");

module.exports.createUser = (req, res, next) => {
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
          return next(new ConflictError("Duplicate user"));
        }

        if (err.name === "ValidationError") {
          return next(new BadRequestError("Bad request"));
        }
        next(err);
      });
  });
};

module.exports.getCurrentUser = (req, res, next) => {
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
        return next(new BadRequestError("Bad request"));
      }
      if (err.name === "DocumentNotFoundError") {
        return next(new NotFoundError("Cannot find user with that id"));
      }
      next(err);
    });
};

module.exports.updateUser = (req, res, next) => {
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
        return next(new BadRequestError("Unable to valudate user"));
      } else {
        next(err);
      }
    });
};

module.exports.login = (req, res, next) => {
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
        return next(new NotFoundError("Cannot find user with that id"));
      }
      if (err.message === "Incorrect email or password") {
        return next(new UnauthorizedError("User data not authorized"));
      }

      next(err);
    });
};
