const item = require("../models/clothingItem");
const { Invalid_Data_ERROR, Invalid_Id_ERROR } = require("../utils/errors");

module.exports.getClothingItems = (req, res) => {
  console.log(req);
  console.log(req.body);
  item
    .find({})
    .then((items) => res.status(200).send(items))
    .catch((err) => {
      console.log(err);
      res
        .status(Invalid_Data_ERROR)
        .send([{ message: "Unable to retrieve data" }]);
    });
};

module.exports.createClothingItem = (req, res) => {
  const { name, weather, imageUrl } = req.body;
  item
    .create({ name, weather, imageUrl, owner: req.user._id })
    .then((item) => res.status(200).send(item))
    .catch((err) => {
      console.log(err);

      res.status(Invalid_Data_ERROR).send({ message: "Unable to create item" });
    });
};

module.exports.deleteClothingItem = (req, res) => {
  const { itemId } = req.body;
  item
    .findByIdAndDelete(itemId)
    .orFail()
    .then((item) => res.status(200).send(item))
    .catch((err) => {
      console.log(err);
      console.error(
        `Error ${err.name} with the message ${err.message} has occurred while executing the code`,
      );
    });
};

module.exports.likeItem = (req, res) => {
  item
    .findByIdAndUpdate(
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
      if (err.name === "CastError") {
        res
          .status(Invalid_Data_ERROR)
          .send({ message: "Cannot find item with that Id" });
      } else {
        res.status(Invalid_Id_ERROR).send({ message: "Invalid item Id" });
      }
    });
};

module.exports.dislkeItem = (req, res) => {
  item
    .findByIdAndUpdate(
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
      if (err.name === "CastError") {
        res
          .status(Invalid_Data_ERROR)
          .send({ message: "Cannot find item with that Id" });
      } else {
        res.status(Invalid_Id_ERROR).send({ message: "Invalid item Id" });
      }
    });
};
