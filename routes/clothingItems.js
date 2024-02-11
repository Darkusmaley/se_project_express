const router = require("express").Router();
const {
  getClothingItems,
  createClothingitem,
  deleteClothingItem,
} = require("../controllers/clothingItems");

router.get("/", getClothingItems);
router.post("/", createClothingitem);
router.delete("/:itemId", deleteClothingItem);

module.exports = router;
