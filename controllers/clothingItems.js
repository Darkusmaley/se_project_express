const Item = require("../models/clothingItem");
const {
  InternalError,
  InvalidDataError,
  InvalidIdError,
  ForbiddenError,
} = require("../utils/errors");

module.exports.getClothingItems = (req, res) => {
  Item.find({})
    .then((items) => res.send(items))
    .catch((err) => {
      console.log(err);
      res.status(InternalError).send([{ message: "Unable to retrieve data" }]);
    });
};

module.exports.createClothingItem = (req, res) => {
  const { name, weather, imageUrl } = req.body;
  Item.create({ name, weather, imageUrl, owner: req.user._id })
    .then((item) => res.send(item))
    .catch((err) => {
      console.log(err);
      if (err.name === "ValidationError") {
        return res
          .status(InvalidDataError)
          .send({ message: "Unable to create item" });
      }
      return res.status(InternalError).send({ message: "Server error" });
    });
};

module.exports.deleteClothingItem = (req, res) => {
  const { itemId } = req.params;
  const { _id: userId } = req.user;

  Item.findOne({ _id: userId }).then((item) => {
    if (!item) {
      return Promise.reject(new Error("Id cannout be found"));
    }
    if (!item?.owner?.equals(userId)) {
      return Promise.reject(new Error("Incorrect item owner"));
    }
    return Item.deleteOne({ _id: itemId, owner: userId })
      .orFail()
      .then((deletedItem) => res.send(deletedItem))
      .catch((err) => {
        console.log(err);
        if (err.name === "DocumentNotFoundError") {
          return res
            .status(InvalidIdError)
            .send({ message: "Cannot find item" });
        }
        if (err.name === "CastError") {
          return res.status(InvalidDataError).send({ message: "Bad request" });
        }
        if (err.name === "Incorrect item owner") {
          return res
            .status(ForbiddenError)
            .send({ message: "Forbidden request" });
        }
        return res.status(InternalError).send({ message: "Server error" });
      });
  });
};

module.exports.likeItem = (req, res) => {
  Item.findByIdAndUpdate(
    req.params.itemId,
    { $addToSet: { likes: req.user._id } },
    { new: true },
  )
    .orFail()
    .then((item) => {
      res.send(item);
    })
    .catch((err) => {
      console.error(err);
      if (err.name === "DocumentNotFoundError") {
        return res
          .status(InvalidIdError)
          .send({ message: "Cannot find item with that Id" });
      }

      if (err.name === "CastError") {
        return res.status(InvalidDataError).send({ message: "Bad request" });
      }
      return res.status(InternalError).send({ message: "Server error" });
    });
};

module.exports.dislkeItem = (req, res) => {
  Item.findByIdAndUpdate(
    req.params.itemId,
    { $pull: { likes: req.user._id } },
    { new: true },
  )
    .orFail()
    .then((item) => {
      res.send(item);
    })
    .catch((err) => {
      console.error(err);
      if (err.name === "DocumentNotFoundError") {
        return res
          .status(InvalidIdError)
          .send({ message: "Cannot find item with that Id" });
      }
      if (err.name === "CastError") {
        return res.status(InvalidDataError).send({ message: "Bad request" });
      }
      return res.status(InternalError).send({ message: "Server error" });
    });
};
