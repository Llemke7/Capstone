import axios from 'axios';

const API_URL = 'http://localhost:5000/api';

export const registerUser = async (userData) => {
  try {
    const response = await axios.post(`${API_URL}/auth/register`, userData);
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

export const loginUser = async (userData) => {
  try {
    const response = await axios.post(`${API_URL}/auth/login`, userData);
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};


export const searchRecipes = async (query) => {
  try {
    const response = await axios.get(`${API_URL}/recipes`, {
      params: {
        query,
        addRecipeInformation: true,
        addRecipeInstructions: true,
      },
    });
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : new Error('Network error');
  }
};


export const saveFavorite = async (recipeId, token) => {
  try {
    const response = await axios.post(`${API_URL}/recipes/favorites`, { recipeId }, {
      headers: { Authorization: `Bearer ${token}` }
    });
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

export const fetchFavorites = async (token) => {
  try {
    const response = await axios.get(`${API_URL}/recipes/favorites`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};


export const getRecommendations = async () => {
  try {
    const token = localStorage.getItem('token');
    const response = await axios.get(`${API_URL}/recommendations`, {
      headers: { Authorization: `Bearer ${token}` }
    });
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};