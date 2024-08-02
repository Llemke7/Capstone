import React, { useEffect, useState } from 'react';
import axios from 'axios';

const API_URL = 'http://localhost:5000/api';

const fetchFavorites = async () => {
  const token = localStorage.getItem('token');
  const response = await axios.get(`${API_URL}/recipes/favorites`, {
    headers: { Authorization: `Bearer ${token}` }
  });
  return response.data;
};

const Favorites = () => {
  const [favorites, setFavorites] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getFavorites = async () => {
      try {
        const data = await fetchFavorites();
        setFavorites(data);
      } catch (err) {
        setError(err.message || 'Error fetching favorites');
      }
    };

    getFavorites();
  }, []);

  return (
    <div className="container">
      <h2>Favorite Recipes</h2>
      {error && <p className="error">{error}</p>}
      <ul>
        {favorites.map((recipe) => (
          <li key={recipe.id}>
            <h3>{recipe.title}</h3>
            {recipe.imageUrl && <img src={recipe.imageUrl} alt={recipe.title} />}
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

export default Favorites;
