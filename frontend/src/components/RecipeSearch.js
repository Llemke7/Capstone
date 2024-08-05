import React, { useState } from 'react';
import { searchRecipes } from '../api';
import { handleSaveFavorite } from './addFavorite';

const RecipeSearch = () => {
    const [query, setQuery] = useState('');
    const [recipes, setRecipes] = useState([]);
    const [error, setError] = useState(null);
    const [searched, setSearched] = useState(false);

    const handleSearch = async (e) => {
        e.preventDefault();
        setSearched(true);
        try {
          const data = await searchRecipes(query);
          setRecipes(data);
          if (data.length === 0) {
            setError('No recipes found');
          } else {
            setError('');
          }
        } catch (err) {
          setError(err.message || 'Error fetching recipes');
        }
      };
    
      return (
        <div className="container">
          <h2>Search Recipes</h2>
          <form onSubmit={handleSearch}>
            <input
              type="text"
              placeholder="Search for recipes"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
            <button type="submit">Search</button>
          </form>
          {error && <p className="error">{error}</p>}
          <ul>
            {recipes.length > 0 ? (
              recipes.map((recipe) => (
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
                  <button onClick={() => handleSaveFavorite(recipe.id, setError)}>Save to Favorites</button>
                </li>
              ))
            ) : (
              searched && <p>No recipes found</p>
            )}
          </ul>
        </div>
      );
    };

    
export default RecipeSearch;











