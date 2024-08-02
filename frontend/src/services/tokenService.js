// src/services/tokenService.js

const TOKEN_KEY = 'jwt_token';

const getToken = () => {
    return localStorage.getItem(TOKEN_KEY);
};

const setToken = (token) => {
    localStorage.setItem(TOKEN_KEY, token);
};

const removeToken = () => {
    localStorage.removeItem(TOKEN_KEY);
};

export default {
    getToken,
    setToken,
    removeToken,
};
