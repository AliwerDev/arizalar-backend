const mongoose = require("mongoose");
const Joi = require("joi");

const serviceSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
    minLength: 2,
    trim: true,
  },
  description: {
    type: String,
  },
  adminId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
});

const Service = mongoose.model("Service", serviceSchema);

const validateService = (data) => {
  const schema = Joi.object({
    name: Joi.string().required(),
    description: Joi.string(),
    adminId: Joi.string(),
  });
  return schema.validate(data);
};

module.exports.Service = Service;
module.exports.validateService = validateService;
