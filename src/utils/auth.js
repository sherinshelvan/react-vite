export const getToken = () => {
    return sessionStorage.getItem('jwtToken');
};

export const setToken = (token) => {
    sessionStorage.setItem('jwtToken', token);
};

export const isAuthenticated = () => {
    return !!getToken();
};

export const logout = () => {
    sessionStorage.removeItem('jwtToken');
};
