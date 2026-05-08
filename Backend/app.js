const express = require("express");
const foodRoutes = require("./routes/foodRoutes");

const app = express();

app.use(express.json());

app.use("/api/foods", foodRoutes);

module.exports = app;