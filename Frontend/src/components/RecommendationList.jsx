import FoodCard from "./FoodCard";

const RecommendationList = ({ foods }) => {
    if (foods.length === 0) {
        return <p>No recommendations yet.</p>;
    }

    return (
        <div className="recommendation-list">
            {foods.map((food) => (
                <FoodCard key={food.id} food={food} />
            ))}
        </div>
    );
};

export default RecommendationList;