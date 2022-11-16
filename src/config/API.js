import axios from 'axios';

export const API = axios.create({
    // for using localhost
    // baseURL: 'http://localhost:5000/api/v1/' //base url from backend localhost

    // for deploy using netlify
    baseURL: process.env.REACT_APP_BASEURL,
})

// for set auth token 
export const setAuthToken = (token) => {
    if (token) {
        API.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    } else {
        delete API.defaults.headers.common['Authorization']
    }
};