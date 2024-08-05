const express = require('express');
const { sequelize, connectDB } = require('./config/db');
const bodyParser = require('body-parser');
const cors = require('cors');
const authRoutes = require('./routes/authRoutes');
const recipeRoutes = require('./routes/recipeRoutes');
const recommendationRoutes = require('./routes/recommendationRoutes');
const { initializeRecipes } = require('./fetchData');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(bodyParser.json());
app.use(cors());

app.use('/api/auth', authRoutes);
app.use('/api/recipes', recipeRoutes);
app.use('/api/recommendations', recommendationRoutes);

const startServer = async () => {
  try {
    await connectDB();
    await initializeRecipes();
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  } catch (error) {
    console.error('Error starting server:', error);
    process.exit(1); // Exit process with failure
  }
};

startServer();

