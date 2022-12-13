const mongoose = require("mongoose");
const Joi = require("joi");

const userChema = mongoose.Schema({
  username: {
    type: String,
    required: true,
    minLength: 3,
    unique: true,
    maxLength: 50,
  },
  password: {
    type: String,
    minLength: 5,
    maxLength: 255,
    required: true,
  },
  role: {
    type: String,
    required: true,
    default: "user",
    enum: ["user", "admin", "superadmin"],
  },
  fullName: { type: String, minLength: 3, maxLength: 50 },
});

const User = mongoose.model("User", userChema);

const validate = (data) => {
  const schema = Joi.object({
    username: Joi.string().required().min(3).max(50),
    password: Joi.string().required().min(5).max(255),
    fullName: Joi.string().min(2).max(50),
  });
  return schema.validate(data);
};

const validateLogin = (data) => {
  const schema = Joi.object({
    username: Joi.string().required().min(3).max(50),
    password: Joi.string().required().min(5).max(255),
  });
  return schema.validate(data);
};

module.exports.User = User;
module.exports.validate = validate;
module.exports.validateLogin = validateLogin;
