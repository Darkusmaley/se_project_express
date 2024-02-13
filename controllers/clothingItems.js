const item = require("../models/clothingItem");
const { Invalid_Data_ERROR } = require("../utils/errors");

module.exports.getClothingItems = (req, res) => {
  item
    .find({})
    .then((items) => res.status(200).res.send(items))
    .catch(() => {
      res
        .status(Invalid_Data_ERROR)
        .send([{ message: "Unable to retrieve data" }]);
    });
};

module.exports.createClothingItem = (req, res) => {
  const { name, weather, imageUrl } = req.body;
  item
    .create({ name, weather, imageUrl })
    .then((item) => res.status(200).res.send({ data: item }))
    .catch(() => {
      res.status(Invalid_Data_ERROR).send({ message: "Unable to create item" });
    });
};

module.exports.deleteClothingItem = (req, res) => {
  const { itemId } = req.body;
  item
    .findByIdAndDelete(itemId)
    .orFail()
    .then((item) => res.status(200).res.send(item))
    .catch((err) => {
      console.error(
        `Error ${err.name} with the message ${err.message} has occurred while executing the code`,
      );
    });
};

module.exports.likeItem = (req, res) => {
  item
    .findByIdAndUpdate(
      req.user._id,
      { $addToSet: { likes: req.user._id } },
      { new: true },
    )
    .orFail()
    .catch((err) => {
      console.error(
        `Error ${err.name} with the message ${err.message} has occurred while executing the code`,
      );
    });
};

module.exports.dislkeItem = (req, res) => {
  item.findByIdAndUpdate(
    req.user._id,
    { $pull: { likes: req.user._id } },
    { new: true },
  );
};
