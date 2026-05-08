const FoodCard = ({ food }) => {
    return (
        <div className="food-card">
            <h2>{food.name}</h2>

            <p>
                <strong>Category:</strong> {food.category}
            </p>

            <p>
                <strong>Cuisine:</strong> {food.cuisine}
            </p>

            <p>
                <strong>Prep:</strong> {food.prepTime}
            </p>

            <p>
                <strong>Budget:</strong> {food.budget}
            </p>

            <p>
                <strong>Spicy Level:</strong> {food.spicyLevel}/5
            </p>

            <p>
                <strong>Score:</strong> {food.score}
            </p>
        </div>
    );
};

export default FoodCard;