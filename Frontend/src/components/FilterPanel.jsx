import { useState } from "react";

const FilterPanel = ({ onRecommend }) => {
    const [preferences, setPreferences] = useState({
        mealType: "",
        category: "",
        budget: "",
        spicyLevel: 3,
    });

    const handleChange = (e) => {
        const { name, value } = e.target;

        setPreferences((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onRecommend(preferences);
    };

    return (
        <form className="filter-panel" onSubmit={handleSubmit}>
            <select name="mealType" onChange={handleChange}>
                <option value="">Select Meal Type</option>
                <option value="breakfast">Breakfast</option>
                <option value="lunch">Lunch</option>
                <option value="dinner">Dinner</option>
                <option value="snack">Snack</option>
            </select>

            <select name="category" onChange={handleChange}>
                <option value="">Select Category</option>
                <option value="veg">Veg</option>
                <option value="nonveg">Non-Veg</option>
                <option value="egg">Egg</option>
                <option value="snack">Snack</option>
            </select>

            <select name="budget" onChange={handleChange}>
                <option value="">Select Budget</option>
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
            </select>

            <label>
                Spicy Level: {preferences.spicyLevel}
            </label>

            <input
                type="range"
                min="1"
                max="5"
                name="spicyLevel"
                value={preferences.spicyLevel}
                onChange={handleChange}
            />

            <button type="submit">
                Suggest Food 🍽️
            </button>
        </form>
    );
};

export default FilterPanel;