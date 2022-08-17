require("express-async-errors");
const app = require("express")();
const mongoose = require("mongoose");
const PORT = process.env.PORT || 5000;
require("./start/logger")();
require("./start/middleware")(app);

const mongoURL =
  "mongodb+srv://vercel-admin-user:nw6x60RgXCAjb3Q1@cluster0.6kysb.mongodb.net/codingspace";

mongoose.connect(mongoURL, { useUnifiedTopology: true }).then(() => {
  console.log("success mongodb connect");
});

app.listen(PORT, () => {
  console.log(PORT + " port connected successfuly...");
});
