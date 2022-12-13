const { resData } = require("../../utils/functions");
const jwt = require("jsonwebtoken");

const jwtPrivateKey = "JWT_PRIVATE_KEY";

module.exports.validateToken = validateToken = (req, res, next) => {
  const token = req.header("x-auth-token");
  if (!token) return res.status(403).send(resData.error("Not authorized"));

  try {
    var decoded = jwt.verify(token, jwtPrivateKey);
  } catch (err) {
    return res.status(403).send(resData.error("Not authorized"));
  }

  req.user = decoded;
  next();
};
