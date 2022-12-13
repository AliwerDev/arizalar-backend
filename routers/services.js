const { Router } = require("express");
const { validateToken } = require("../pages/dashboard/other");
const {
  addService,
  getService,
  deleteService,
  getServices,
} = require("../pages/dashboard/services");

const router = Router();

router.post("/", validateToken, addService);
router.get("/", validateToken, getServices);
router.get("/:id", validateToken, getService);
router.delete("/:id", validateToken, deleteService);

module.exports = router;
