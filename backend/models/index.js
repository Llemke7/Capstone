const User = require('./User');
const Recipe = require('./Recipe');

User.belongsToMany(Recipe, { through: 'UserRecipes' });
Recipe.belongsToMany(User, { through: 'UserRecipes' });

module.exports = { User, Recipe };
