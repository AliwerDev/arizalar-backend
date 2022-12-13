const { Router } = require("express");
const {
  deleteApplication,
  addApplication,
} = require("../pages/dashboard/application");
const { validateToken } = require("../pages/dashboard/other");

const router = Router();

router.post("/:serviceId", addApplication);
router.delete("/:id", validateToken, deleteApplication);

module.exports = router;
