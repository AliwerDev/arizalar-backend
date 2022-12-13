const { Router } = require("express");
const { login, getMe } = require("../pages/auth/login");
const { getUsers, createUser } = require("../pages/auth/user");
const { validateToken } = require("../pages/dashboard/other");

const router = Router();

router.post("/register", createUser);
router.post("/login", login);
router.get("/me", validateToken, getMe);
router.get("/users", validateToken, getUsers);

module.exports = router;
