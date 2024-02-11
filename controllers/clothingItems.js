const item = require("../models/clothingItem");

module.exports.getClothingItems = (req, res) => {
  item
    .find({})
    .then((user) => res.status(200).res.send(user))
    .catch(() => {
      res.status(500).send({ message: "Error" });
    });
};

module.exports.createClothingItem = (req, res) => {
  const { name, weather, imageUrl } = req.body;
  item
    .create({ name, weather, imageUrl })
    .then((user) => res.status(200).res.send(user))
    .catch(() => {
      res.status(500).send({ message: "Error" });
    });
};

module.exports.deleteClothingItem = (req, res) => {
  const { itemid } = req.body;
  item
    .findByIdAndDelete(itemid)
    .then((user) => res.status(200).res.send(user))
    .catch(() => {
      res.status(500).send({ message: "Error" });
    });
};
