const router = require("express").Router();
const {
  getClothingItems,
  createClothingItem,
  deleteClothingItem,
  likeItem,
  dislkeItem,
} = require("../controllers/clothingItems");
const { auth } = require("../middlewares/auth");
const {
  validateItemCreation,
  validateUserID,
} = require("../middlewares/validation");

router.get("/", getClothingItems);
router.post("/", auth, validateItemCreation, createClothingItem);
router.delete("/:itemId", auth, validateUserID, deleteClothingItem);
router.put("/:itemId/likes", auth, validateUserID, likeItem);
router.delete("/:itemId/likes", auth, validateUserID, dislkeItem);

module.exports = router;
