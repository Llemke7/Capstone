const express = require('express');
const { Recipe, User } = require('../models');
const authMiddleware = require('../middleware/authMiddleware');
const axios = require('axios');
require('dotenv').config();

const router = express.Router();

// Recommendations
router.get('/', authMiddleware, async (req, res) => {
  try {
    const userId = req.user.id;
    const user = await User.findByPk(userId, {
      include: Recipe,
    });

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const favoriteRecipes = user.Recipes;

    if (favoriteRecipes.length === 0) {
      return res.status(404).json({ message: 'No favorite recipes found' });
    }

    const recommendations = [];
    for (const recipe of favoriteRecipes) {
      const response = await axios.get(`https://api.spoonacular.com/recipes/${recipe.id}/similar`, {
        params: {
          apiKey: process.env.SPOONACULAR_API_KEY,
          number: 5,
        },
      });

      const similarRecipes = response.data;

      for (const similarRecipe of similarRecipes) {
        const detailedRecipeResponse = await axios.get(`https://api.spoonacular.com/recipes/complexSearch`, {
          params: {
            query: similarRecipe.title,
            addRecipeInformation: true,
            addRecipeInstructions: true,
            number: 1,
            apiKey: process.env.SPOONACULAR_API_KEY,
          },
        });

        if (detailedRecipeResponse.data.results.length > 0) {
          recommendations.push(detailedRecipeResponse.data.results[0]);
        }
      }
    }

    res.json(recommendations);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;

