const router = require("express").Router();
const userRouter = require("./users");
const itemRouter = require("./clothingItems");
const { login, createUser } = require("../controllers/users");
const { InvalidIdError } = require("../utils/constants");

router.post("/signin", login);
router.post("/signup", createUser);
router.use("/items", itemRouter);
router.use("/users", userRouter);

router.use((req, res) => {
  res.status(InvalidIdError).send({ message: "Router not found" });
});
module.exports = router;
