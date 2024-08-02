import React from 'react';
import { Link } from 'react-router-dom';
import '../Home.css'; 

const Home = () => {
  return (
    <div className="home-container">
      <div className="home-text">
        <h1>Welcome to Recipe Finder</h1>
        <p>Your Personalized Recipe Finder</p>
        <div className="home-links">
          <Link to="/register" className="home-link">Register</Link>
          <Link to="/login" className="home-link">Login</Link>
          
        </div>
      </div>
      <div className="home-image-container">
        <img src="https://cdnimg.webstaurantstore.com/images/products/large/225160/2251412.jpg" alt="Chef Cooking" className="home-image" />
      </div>
    </div>
  );
};

export default Home;
