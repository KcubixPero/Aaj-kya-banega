import { useState } from "react";
import API from "./services/api";

import FilterPanel from "./components/FilterPanel";
import RecommendationList from "./components/RecommendationList";

import "./App.css";

function App() {
  const [foods, setFoods] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleRecommend = async (preferences) => {
    try {
      setLoading(true);
      setError("");

      const response = await API.post(
        "/recommend",
        preferences
      );

      setFoods(response.data.data);
    } catch (err) {
      setError("Something went wrong.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleRandomFood = async () => {
    try {
      setLoading(true);

      const response = await API.get("/random");

      setFoods([response.data.data]);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="app">
      <h1>Aaj Kya Banega? 🍽️</h1>

      <p className="subtitle">
        Stop overthinking food.
        Get instant recommendations.
      </p>

      <FilterPanel
        onRecommend={handleRecommend}
        onRandomFood={handleRandomFood}
      />

      {loading && <p>Loading recommendations...</p>}

      {error && <p>{error}</p>}

      <RecommendationList foods={foods} />
    </div>
  );
}

export default App;