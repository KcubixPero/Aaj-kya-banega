const foods = require("../data/foods.json");
const history = require("../data/history.json");

const recommendFoods = (preferences) => {
    const scoredFoods = foods.map((food) => {
        let score = 0;

        // category
        if (
            preferences.category &&
            food.category === preferences.category
        ) {
            score += 30;
        }

        // meal type
        if (
            preferences.mealType &&
            food.mealType.includes(preferences.mealType)
        ) {
            score += 25;
        }

        // budget
        if (
            preferences.budget &&
            food.budget === preferences.budget
        ) {
            score += 15;
        }

        // spicy level
        if (preferences.spicyLevel) {
            const difference = Math.abs(
                food.spicyLevel - preferences.spicyLevel
            );

            score -= difference * 3;
        }

        // hostel friendly
        if (
            preferences.hostelFriendly !== undefined &&
            food.hostelFriendly === preferences.hostelFriendly
        ) {
            score += 15;
        }

        // comfort food
        if (
            preferences.comfortFood !== undefined &&
            food.comfortFood === preferences.comfortFood
        ) {
            score += 10;
        }

        // healthy
        if (
            preferences.healthy !== undefined &&
            food.healthy === preferences.healthy
        ) {
            score += 10;
        }
        
        // protein rich
        if (
            preferences.proteinRich !== undefined &&
            food.proteinRich === preferences.proteinRich
        ) {
            score += 10;
        }

        // ---------- ANTI-REPETITION LOGIC ----------

        const recentlyCooked = history.find(
            (item) => item.foodId === food.id
        );

        if (recentlyCooked) {
            const today = new Date();
            const cookedDate = new Date(recentlyCooked.date);

            const differenceInDays = Math.floor(
                (today - cookedDate) / (1000 * 60 * 60 * 24)
            );

            // yesterday
            if (differenceInDays <= 1) {
                score -= 40;
            }
            // within 3 days
            else if (differenceInDays <= 3) {
                score -= 20;
            }
            // within week
            else if (differenceInDays <= 7) {
                score -= 10;
            }
        }

        return {
            ...food,
            score,
        };
    });

    scoredFoods.sort((a, b) => b.score - a.score);

    return scoredFoods.slice(0, 10);
};

module.exports = recommendFoods;