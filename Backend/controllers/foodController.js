const foods = require("../data/foods.json");
const history = require("../data/history.json");
const fs = require("fs-extra");
const path = require("path");

const recommendFoods = require("../services/recommendationService");

// RECOMMEND
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

// RANDOM FOOD
const getRandomFood = (req, res) => {
    try {
        // avoid recently cooked foods
        const recentFoodIds = history.map((item) => item.foodId);

        const filteredFoods = foods.filter(
            (food) => !recentFoodIds.includes(food.id)
        );

        const randomIndex = Math.floor(
            Math.random() * filteredFoods.length
        );

        const randomFood = filteredFoods[randomIndex];

        res.status(200).json({
            success: true,
            data: randomFood,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

// LOG MEAL
const logMeal = async (req, res) => {
    try {
        const { foodId, mealType } = req.body;

        const newLog = {
            foodId,
            mealType,
            date: new Date().toISOString(),
        };

        const mealLogsPath = path.join(
            __dirname,
            "../data/mealLogs.json"
        );

        const historyPath = path.join(
            __dirname,
            "../data/history.json"
        );

        const mealLogs = await fs.readJson(mealLogsPath);
        const historyData = await fs.readJson(historyPath);

        mealLogs.push(newLog);

        // update history
        const existingFood = historyData.find(
            (item) => item.foodId === foodId
        );

        if (existingFood) {
            existingFood.date = new Date().toISOString();
        } else {
            historyData.push({
                foodId,
                date: new Date().toISOString(),
            });
        }

        await fs.writeJson(mealLogsPath, mealLogs, {
            spaces: 2,
        });

        await fs.writeJson(historyPath, historyData, {
            spaces: 2,
        });

        res.status(200).json({
            success: true,
            message: "Meal logged successfully",
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

// ANALYTICS
const getAnalytics = async (req, res) => {
    try {
        const mealLogs = require("../data/mealLogs.json");

        const totalMeals = mealLogs.length;

        const mealTypeStats = {
            breakfast: 0,
            lunch: 0,
            dinner: 0,
            snack: 0,
        };

        mealLogs.forEach((meal) => {
            if (mealTypeStats[meal.mealType] !== undefined) {
                mealTypeStats[meal.mealType]++;
            }
        });

        const foodFrequency = {};

        mealLogs.forEach((meal) => {
            foodFrequency[meal.foodId] =
                (foodFrequency[meal.foodId] || 0) + 1;
        });

        const mostCooked = Object.entries(foodFrequency)
            .sort((a, b) => b[1] - a[1])
            .slice(0, 5)
            .map(([foodId, count]) => {
                const food = foods.find(
                    (item) => item.id === Number(foodId)
                );

                return {
                    name: food?.name,
                    count,
                };
            });

        res.status(200).json({
            success: true,
            data: {
                totalMeals,
                mealTypeStats,
                mostCooked,
            },
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
    getRandomFood,
    logMeal,
    getAnalytics,
};