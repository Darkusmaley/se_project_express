const Item = require("../models/clothingItem");
const ForbiddenError = require("../utils/errors/ForbiddenError");
const BadRequestError = require("../utils/errors/BadRequestError");
const NotFoundError = require("../utils/errors/NotFoundError");

module.exports.getClothingItems = (req, res, next) => {
  Item.find({})
    .then((items) => res.send(items))
    .catch((err) => {
      console.log(err);
      next(err);
    });
};

module.exports.createClothingItem = (req, res, next) => {
  const { name, weather, imageUrl } = req.body;
  Item.create({ name, weather, imageUrl, owner: req.user._id })
    .then((item) => res.send(item))
    .catch((err) => {
      console.log(err);
      if (err.name === "ValidationError") {
        next(new BadRequestError("Bad request"));
      }
      next(err);
    });
};

module.exports.deleteClothingItem = (req, res, next) => {
  const { itemId } = req.params;

  Item.findById(itemId)
    .orFail()
    .then((item) => {
      if (!item.owner.equals(req.user._id)) {
        next(new ForbiddenError("Forbidden request"));
      }
      return Item.findByIdAndRemove(req.params.itemId).then((user) => {
        res.send(user);
      });
    })
    .catch((err) => {
      console.log(err);
      if (err.name === "DocumentNotFoundError") {
        next(new NotFoundError("Cannot find item with that Id"));
      }
      if (err.name === "CastError") {
        next(new BadRequestError("Bad request"));
      }
      if (err.name === "Incorrect item owner") {
        next(new ForbiddenError("Forbidden request"));
      }
      next(err);
    });
};

module.exports.likeItem = (req, res, next) => {
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
        next(new NotFoundError("Cannot find item with that Id"));
      }

      if (err.name === "CastError") {
        next(new BadRequestError("Bad request"));
      }
      next(err);
    });
};

module.exports.dislkeItem = (req, res, next) => {
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
        next(new NotFoundError("Cannot find item with that Id"));
      }
      if (err.name === "CastError") {
        next(new BadRequestError("Bad request"));
      }
      next(err);
    });
};
