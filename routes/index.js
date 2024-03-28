const router = require("express").Router();
const userRouter = require("./users");
const itemRouter = require("./clothingItems");
const { login, createUser } = require("../controllers/users");
const { NotFoundError } = require("../utils/constants");
const {
  validateUserLogin,
  validateUserCreation,
} = require("../middlewares/validation");

router.post("/signin", validateUserLogin, login);
router.post("/signup", validateUserCreation, createUser);
router.use("/items", itemRouter);
router.use("/users", userRouter);

router.use((req, res) => {
  next(new NotFoundError("Router not found"));
});
module.exports = router;
