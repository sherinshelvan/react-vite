// src/utils/auth.js
export const isAuthenticated = () => {
    const token = sessionStorage.getItem('jwtToken');
    return !!token; // returns true if token exists
};