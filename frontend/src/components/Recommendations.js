import React, { useEffect, useState } from 'react';
import { getRecommendations } from '../api';

const Recommendations = () => {
  const [recommendations, setRecommendations] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchRecommendations = async () => {
      try {
        const token = localStorage.getItem('token');
        const data = await getRecommendations(token);
        setRecommendations(data);
      } catch (err) {
        setError(err.message || 'Error fetching recommendations');
      }
    };

    fetchRecommendations();
  }, []);

  return (
    <div className="container">
      <h2>Recipe Recommendations</h2>
      {error && <p className="error">{error}</p>}
      <ul>
        {recommendations.map((recipe) => (
          <li key={recipe.id}>
            <h3>{recipe.title}</h3>
            {recipe.image && <img src={recipe.image} alt={recipe.title} />}
            {recipe.analyzedInstructions.length > 0 ? (
              <ol>
                {recipe.analyzedInstructions[0].steps.map((step) => (
                  <li key={step.number}>{step.step}</li>
                ))}
              </ol>
            ) : (
              <p>No instructions available</p>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Recommendations;


