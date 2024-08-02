const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/db');

const Recipe = sequelize.define('Recipe', {
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  ingredients: {
    type: DataTypes.TEXT,
  },
  instructions: {
    type: DataTypes.TEXT,
  },
  imageUrl: {
    type: DataTypes.STRING,
  },
  nutrition: {
    type: DataTypes.JSON,
  },
}, {
  timestamps: true,
});

module.exports = Recipe;
