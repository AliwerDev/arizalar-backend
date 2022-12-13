const mongoose = require("mongoose");
const Joi = require("joi");

const applicaionSchema = mongoose.Schema({
  title: {
    type: String,
    required: true,
    minLength: 2,
    trim: true,
    maxLength: 75,
  },
  text: {
    type: String,
    required: true,
    minLength: 2,
    maxLength: 5000,
    trim: true,
  },
  phoneNumber: {
    type: String,
    required: true,
    minLength: 10,
    maxLength: 15,
    trim: true,
  },
  ownerName: {
    type: String,
    required: true,
    minLength: 2,
  },
  serviceId: {
    type: mongoose.Types.ObjectId,
    ref: "Service",
    required: true,
  },
});

const Application = mongoose.model("Application", applicaionSchema);

const validateApplication = (data) => {
  const schema = Joi.object({
    title: Joi.string().required().min(2).max(75),
    text: Joi.string().required().min(2).max(5000),
    phoneNumber: Joi.string().required().min(10).max(15),
    ownerName: Joi.string().required().min(2).max(15),
  });
  return schema.validate(data);
};

module.exports.Application = Application;
module.exports.validateApplication = validateApplication;
