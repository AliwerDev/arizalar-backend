const { Router } = require("express");
const router = Router();

// categories
router.get("/", (req, res) => {
  res.send("home page");
});
router.get("/user", (req, res) => {
  res.send("user page");
});
module.exports = router;
