const { User, validateLogin } = require("../../models/user");
const { resData } = require("../../utils/functions");
const _ = require("lodash");
const { compaireHash } = require("../../utils/hash");
const jwt = require("jsonwebtoken");

const jwtPrivateKey = "JWT_PRIVATE_KEY";

// categories
const login = async (req, res) => {
  const { error } = validateLogin(req.body);
  if (error)
    return res.status(400).send(resData.error(error.details[0].message));

  let user = await User.findOne({ username: req.body.username });

  if (!user)
    return res
      .status(400)
      .send(resData.error("Login or password is incorrect"));

  const isValidPassword = await compaireHash(req.body.password, user.password);
  if (!isValidPassword)
    return res
      .status(400)
      .send(resData.error("Login or password is incorrect"));

  const token = jwt.sign({ _id: user._id, role: user.role }, jwtPrivateKey);
  user.token = token;
  res
    .header({ "x-auth-token": token })
    .send(
      resData.success(_.pick(user, ["username", "email", "fullName", "token"]))
    );
};

const getMe = async (req, res) => {
  let user = await User.findById(req.user._id);

  if (!user) return res.status(400).send(resData.error("Not authorized"));

  res.send(
    resData.success(_.pick(user, ["username", "fullName", "role", "_id"]))
  );
};

module.exports = { login, getMe };
