const { resData } = require("../../utils/functions");
const _ = require("lodash");
const { default: mongoose } = require("mongoose");
const { validateService, Service } = require("../../models/services");
const { isEmpty } = require("lodash");
const { Application } = require("../../models/application");

const addService = async (req, res) => {
  const { error } = validateService(req.body);

  if (req.user.role !== "superadmin") {
    return res.status(403).send(resData.error("Forbidden"));
  }

  if (error)
    return res.status(400).send(resData.error(error.details[0].message));

  const newService = _.pick(req.body, ["name", "description", "adminId"]);

  let service = new Service(newService);
  service = await service.save();

  res.status(201).send(resData.success(service));
};

const deleteService = async (req, res) => {
  const id = req.params.id;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).send(resData.error("Something went wrong"));
  }

  const result = await Service.deleteOne({ _id: id });
  if (result.deletedCount === 0) {
    return res.status(400).send(resData.error("Code not found"));
  }
  res.status(200).send(resData.success());
};

const getService = async (req, res) => {
  if (req.user.role === "user") {
    return res.status(403).send(resData.error("Forbidden"));
  }

  const id = req.params.id;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).send(resData.error("Something went wrong"));
  }

  let service = {};
  if (req.user.role === "superadmin") {
    service = await Service.findOne({ _id: id });
  } else {
    service = await Service.findOne({ adminId: req.user._id, _id: id });
  }

  if (isEmpty(service)) {
    return res.status(404).send(resData.error("Service not found"));
  }

  const applications = await Application.find({ serviceId: id });
  res
    .status(200)
    .send(resData.success({ ...service._doc, applications: applications }));
};

const getServices = async (req, res) => {
  if (req.user.role === "user") {
    return res.status(403).send(resData.error("Forbidden"));
  }
  let result;
  if (req.user.role === "superadmin") {
    result = await Service.find({});
  } else {
    result = await Service.find({ adminId: req.user.id });
  }

  res.status(200).send(resData.success(result));
};

module.exports = {
  getService,
  getServices,
  addService,
  deleteService,
};
