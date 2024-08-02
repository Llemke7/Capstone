const express = require('express');
const { Recipe, User } = require('../models');
const authMiddleware = require('../middleware/authMiddleware');
const axios = require('axios');
require('dotenv').config();

const router = express.Router();

// Search Recipes
router.get('/', async (req, res) => {
  const { query } = req.query;
  try {
    const response = await axios.get(`https://api.spoonacular.com/recipes/complexSearch`, {
      params: {
        query,
        addRecipeInformation: true,
        addRecipeInstructions: true,
        number: 10,
        apiKey: process.env.SPOONACULAR_API_KEY,
      },
    });
    const recipes = response.data.results;
    res.json(recipes);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});


// Save Favorite Recipe
router.post('/favorites', authMiddleware, async (req, res) => {
  const { recipeId } = req.body;
  try {
    const recipe = await Recipe.findByPk(recipeId);
    if (!recipe) {
      return res.status(404).json({ message: 'Recipe not found' });
    }
    await req.user.addRecipe(recipe);
    res.json({ message: 'Recipe added to favorites' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});


// Get Favorite Recipes
router.get('/favorites', authMiddleware, async (req, res) => {
  try {
    const user = await User.findByPk(req.user.id, {
      include: {
        model: Recipe,
        through: { attributes: [] } 
      }
    });

    const detailedFavorites = [];
    for (const recipe of user.Recipes) {
      const detailedRecipeResponse = await axios.get(`https://api.spoonacular.com/recipes/complexSearch`, {
        params: {
          query: recipe.title,
          addRecipeInformation: true,
          addRecipeInstructions: true,
          number: 1,
          apiKey: process.env.SPOONACULAR_API_KEY,
        },
      });

      if (detailedRecipeResponse.data.results.length > 0) {
        detailedFavorites.push(detailedRecipeResponse.data.results[0]);
      }
    }

    res.json(detailedFavorites);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;



