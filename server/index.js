const express = require("express");
const app = express();
require("dotenv").config();
const mongoose = require("mongoose");
mongoose.connect(process.env.MONGO_URL);
const db = mongoose.connection;
db.on("error", console.error.bind(console, "Error in connecting database"));
db.once("open", () => console.log("Connected to database"));
app.use(express.json());
app.use("/api/users", require("./routes/user"));
const port = process.env.PORT;
app.listen(port, () => {
  console.log("Server listening on port", port);
});
