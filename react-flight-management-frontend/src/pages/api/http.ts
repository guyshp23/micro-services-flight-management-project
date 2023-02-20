import axios, { AxiosInstance } from 'axios';

const http: AxiosInstance = axios.create({
    withCredentials: true,
    timeout: 20000,
    headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
    },
});

export const DJANGO_API_ADDRESS  = 'http://localhost:8000';
export const FASTAPI_API_ADDRESS = 'http://localhost:8080';

export const isAuthenticted = () => {
    const  access_token = localStorage.getItem('access_token');
    return access_token !== null;
};

export default http;