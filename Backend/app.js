const express = require("express");
const cors = require("cors");

const foodRoutes = require("./routes/foodRoutes");

const app = express();

app.use(cors());

app.use(express.json());

app.use("/api/foods", foodRoutes);

module.exports = app;