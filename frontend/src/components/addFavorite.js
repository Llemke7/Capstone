import { saveFavorite } from '../api';

export const handleSaveFavorite = async (recipeId, setError) => {
  const token = localStorage.getItem('token');
  if (!token) {
    setError('You need to log in to save favorites');
    return;
  }
  try {
    await saveFavorite(recipeId, token);
    alert('Recipe added to favorites');
  } catch (err) {
    setError(err.message || 'Error saving favorite');
  }
};


export default handleSaveFavorite;