const express = require("express");
const cors = require("cors");
const homeRotes = require("../routers/home");
const authRoutes = require("../routers/authRoutes");
const applicationRoutes = require("../routers/applicationRoutes");
const serviceRoutes = require("../routers/services");

module.exports = function (app) {
  app.use(express.json());
  app.use(
    cors({
      origin: ["*", "https://www.google.com/"],
    })
  );
  app.use("/", homeRotes);
  app.use("/api/auth", authRoutes);
  app.use("/api/application", applicationRoutes);
  app.use("/api/service", serviceRoutes);
};
