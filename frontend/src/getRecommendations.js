import axios from 'axios';

const API_URL = 'http://localhost:5000/api';

export const getRecommendations = async (token) => {
  try {
    const response = await axios.get(`${API_URL}/recommendations`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};
