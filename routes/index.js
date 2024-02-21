const router = require("express").Router();
const userRouter = require("./users");
const itemRouter = require("./clothingItems");
const { login, createUser } = require("../controllers/users");
// const { auth } = require("../middlewares/auth");

router.use("/items", itemRouter);
router.use("/users", userRouter);
router.post("/signin", login);
router.post("/signup", createUser);

router.use((req, res) => {
  res.status(404).send({ message: "Router not found" });
});
module.exports = router;
