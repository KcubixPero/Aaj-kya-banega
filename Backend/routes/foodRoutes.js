const express = require("express");

const {
    getRecommendations,
    getRandomFood,
    logMeal,
    getAnalytics,
} = require("../controllers/foodController");

const router = express.Router();

router.post("/recommend", getRecommendations);

router.get("/random", getRandomFood);

router.post("/log", logMeal);

router.get("/analytics", getAnalytics);

router.get("/health", (req, res) => {
    res.json({
        success: true,
        message: "API working",
    });
});

module.exports = router;