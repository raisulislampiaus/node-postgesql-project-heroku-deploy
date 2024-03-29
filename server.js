const express = require("express");
const db = require("./config/db");
const router = require("./controllers/userController");
const ProductRouter = require("./controllers/productCtr");
const path = require("path");
const app = express();
require('dotenv').config()
app.use(express.json());

app.get("/", (req, res) => {
  res.send("hellow hhhhhh");
});

app.use("/api/user", router);
app.use("/api/products", ProductRouter);

app.use("/Images", express.static("./Images"));
// const dirname = path.resolve();
// app.use("/Images", express.static(path.join(dirname, "/Images")));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
