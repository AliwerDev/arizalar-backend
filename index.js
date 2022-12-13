const app = require("express")();
const mongoose = require("mongoose");
const PORT = 5000;
require("./start/middleware")(app);

// const mongoURL =
//   "mongodb+srv://vercel-admin-user:nw6x60RgXCAjb3Q1@cluster0.6kysb.mongodb.net/application";
const mongoURL = "mongodb://localhost:27017/application";

mongoose.connect(mongoURL, { useUnifiedTopology: true }).then(() => {
  console.log("success mongodb connect");
});

app.listen(PORT, () => {
  console.log(PORT + " port connected successfuly...");
});
