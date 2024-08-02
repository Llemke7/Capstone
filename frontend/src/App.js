import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Home from './components/Home';
import Login from './components/Login';
import Register from './components/Register';
import RecipeSearch from './components/RecipeSearch';
import Favorites from './components/Favorites';
import Welcome from './components/Welcome';
import Recommendations from './components/Recommendations';

const PrivateRoute = ({ element: Element }) => {
  const token = localStorage.getItem('token');
  return token ? <Element /> : <Navigate to="/login" />;
};

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/welcome" element={<PrivateRoute element={Welcome} />} />
        <Route path="/recipes" element={<PrivateRoute element={RecipeSearch} />} />
        <Route path="/favorites" element={<PrivateRoute element={Favorites} />} />
        <Route path="/recommendations" element={<PrivateRoute element={Recommendations} />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  );
}

export default App;







