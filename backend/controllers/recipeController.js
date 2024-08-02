const axios = require('axios');
const { User, Recipe } = require('../models');

exports.searchRecipes = async (req, res) => {
    const { query } = req.query;
    try {
        const response = await axios.get(`https://api.spoonacular.com/recipes/complexSearch`, {
            params: {
                query,
                apiKey: process.env.SPOONACULAR_API_KEY,
            },
        });
        res.json(response.data.results);
    } catch (error) {
        console.error('Error searching recipes:', error);
        res.status(500).json({ error: 'Error searching recipes', details: error.message, stack: error.stack });
    }
};

exports.saveFavoriteRecipe = async (req, res) => {
    const { recipeId } = req.body;
    const userId = req.user.userId;

    try {
        const user = await User.findByPk(userId);
        const recipe = await Recipe.findByPk(recipeId);
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }
        if (!recipe) {
            return res.status(404).json({ error: 'Recipe not found' });
        }
        await user.addRecipe(recipe);
        res.status(200).json({ message: 'Recipe saved to favorites' });
    } catch (error) {
        console.error('Error saving favorite recipe:', error);
        res.status(500).json({ error: 'Error saving favorite recipe', details: error.message, stack: error.stack });
    }
};

exports.getFavoriteRecipes = async (req, res) => {
    const userId = req.user.userId;
    try {
        const user = await User.findByPk(userId, {
            include: Recipe,
        });
        res.status(200).json(user.Recipes);
    } catch (error) {
        console.error('Error getting favorite recipes:', error);
        res.status(500).json({ error: 'Error getting favorite recipes', details: error.message, stack: error.stack });
    }
};



