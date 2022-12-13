const { resData } = require("../../utils/functions");
const _ = require("lodash");
const { default: mongoose } = require("mongoose");
const {
  validateApplication,
  Application,
} = require("../../models/application");
const { Service } = require("../../models/services");

const addApplication = async (req, res) => {
  const serviceId = req.params.serviceId;

  if (mongoose.Types.ObjectId.isValid(serviceId)) {
    const service = await Service.findOne({ _id: serviceId });
    if (!service) {
      return res.status(400).send(resData.error("Service is not available"));
    }
  } else {
    return res.status(400).send(resData.error("Something went wrong"));
  }

  const { error } = validateApplication(req.body);
  if (error)
    return res.status(400).send(resData.error(error.details[0].message));

  const newApplication = _.pick(req.body, [
    "title",
    "text",
    "phoneNumber",
    "ownerName",
  ]);
  newApplication.serviceId = serviceId;

  let application = new Application(newApplication);
  application = await application.save();

  res.status(201).send(resData.success());
};

const deleteApplication = async (req, res) => {
  const id = req.params.id;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).send(resData.error("Something went wrong"));
  }

  const result = await Application.deleteOne({ _id: id });
  if (result.deletedCount === 0) {
    return res.status(400).send(resData.error("Code not found"));
  }
  res.status(200).send(resData.success());
};

module.exports = {
  addApplication,
  deleteApplication,
};
