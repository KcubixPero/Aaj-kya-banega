const recommendFoods = require("../services/recommendationService");

const getRecommendations = (req, res) => {
    try {
        const preferences = req.body;

        const recommendations = recommendFoods(preferences);

        res.status(200).json({
            success: true,
            count: recommendations.length,
            data: recommendations,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

module.exports = {
    getRecommendations,
};