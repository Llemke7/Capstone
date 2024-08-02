const { User, Recipe } = require('../models');

exports.getRecommendations = async (req, res) => {
    const userId = req.user.userId;
    try {
        const user = await User.findByPk(userId, {
            include: Recipe,
        });

        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        // Simple recommendation logic: Recommend recipes not in the user's favorites
        const favoriteRecipeIds = user.Recipes.map(recipe => recipe.id);
        const recommendedRecipes = await Recipe.findAll({
            where: {
                id: {
                    [Op.notIn]: favoriteRecipeIds,
                },
            },
            limit: 5, // Limit to 5 recommendations
        });

        res.status(200).json(recommendedRecipes);
    } catch (error) {
        console.error('Error getting recommendations:', error);
        res.status(500).json({ error: 'Error getting recommendations', details: error.message, stack: error.stack });
    }
};
