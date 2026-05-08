const express = require("express");

const {
    getRecommendations,
} = require("../controllers/foodController");

const router = express.Router();

router.get("/health", (req, res) => {
    res.json({
        success: true,
        message: "API working"
    });
});

router.post("/recommend", getRecommendations);

module.exports = router;