const router = require("express").Router();
const { getCurrentUser, updateUser } = require("../controllers/users");
const { auth } = require("../middlewares/auth");
const { validateUpdateCurrentUser } = require("../middlewares/validation");

router.patch("/me", auth, validateUpdateCurrentUser, updateUser);
router.get("/me", auth, getCurrentUser);
module.exports = router;
