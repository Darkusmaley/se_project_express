const { UnauthorizedError } = require("../utils/errors");
const { JWT_SECRET } = require("../utils/config");
const jwt = require("jsonwebtoken");

const extractToken = (header) => header.replace("Bearer ", "");

module.exports.auth = (req, res, next) => {
  const { Authorization } = req.headers;
  if (!Authorization || !Authorization.startsWith("Bearer ")) {
    console.error("Authorization header is missing", Authorization);
    return res.status(UnauthorizedError).send({ message: "User unauthorized" });
  }
  const token = extractToken(Authorization);
  let payload;

  try {
    payload = jwt.verify(token, JWT_SECRET);
  } catch (err) {
    console.error(err);
    return res
      .status(UnauthorizedError)
      .send({ message: "Authorization Required" });
  }
  req.user = payload;
  next();
};
