const axios = require('axios');
const { Recipe } = require('./models');
require('dotenv').config();

const fetchAndSaveRecipes = async () => {
  try {
    const response = await axios.get(`https://api.spoonacular.com/recipes/complexSearch`, {
      params: {
        apiKey: process.env.SPOONACULAR_API_KEY,
        number: 10,
        addRecipeInformation: true,
        addRecipeInstructions: true,
      },
    });

    const recipes = response.data.results;

    if (!recipes || recipes.length === 0) {
      console.log('No recipes found.');
      return;
    }

    for (const recipeData of recipes) {
      const [recipe, created] = await Recipe.findOrCreate({
        where: { id: recipeData.id },
        defaults: {
          title: recipeData.title,
          ingredients: recipeData.extendedIngredients
            ? recipeData.extendedIngredients.map(ing => ing.original).join(', ')
            : '',
          instructions: recipeData.analyzedInstructions.length > 0
            ? recipeData.analyzedInstructions[0].steps.map(step => step.step).join(' ')
            : 'No instructions available',
          imageUrl: recipeData.image,
          nutrition: recipeData.nutrition || null,
        },
      });
      if (!created) {
        console.log(`Recipe with ID ${recipe.id} already exists.`);
      }
    }
  } catch (err) {
    console.error('Error fetching and saving recipes:', err.message);
  }
};

const initializeRecipes = async () => {
  await fetchAndSaveRecipes();
};

module.exports = { initializeRecipes };
