const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../utils/config");
const { UnauthorizedError } = require("../utils/constants");

const extractToken = (header) => header.replace("Bearer ", "");

module.exports.auth = (req, res, next) => {
  const { authorization } = req.headers;
  if (!authorization || !authorization.startsWith("Bearer ")) {
    console.error("Authorization header is missing", authorization);
    next(new UnauthorizedError("Authorization Required"));
  }
  const token = extractToken(authorization);
  let payload;

  try {
    payload = jwt.verify(token, JWT_SECRET);
  } catch (err) {
    console.error(err);
    next(new UnauthorizedError("Authorization Required"));
  }
  req.user = payload;
  return next();
};
