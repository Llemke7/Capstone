import React from 'react';
import { Link } from 'react-router-dom';
import '../Welcome.css'; // Import the CSS file

const Welcome = () => {
  return (
    <div className="welcome-container">
      <h1>Welcome to Recipe Finder</h1>
      <p>Your one stop shop to culinary genius</p>
      <div className="welcome-links">
        <Link to="/recipes" className="welcome-link">Recipes</Link>
        <Link to="/recommendations" className="welcome-link">Recommendations</Link>
        <Link to="/favorites" className="welcome-link">Favorites</Link>
      </div>
      <div className="welcome-image-container">
        <img src="https://cdnimg.webstaurantstore.com/images/products/large/225160/2251412.jpg" alt="Recipe Finder" className="welcome-image"/>
      </div>
    </div>
  );
};

export default Welcome;
