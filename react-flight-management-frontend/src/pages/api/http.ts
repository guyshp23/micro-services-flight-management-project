import axios, { AxiosInstance } from 'axios';

const http: AxiosInstance = axios.create({
    timeout: 20000,
    headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
    },
});

// Use `http://localhost:8000` for testing Django locally
export const DJANGO_API_URL  = 'https://django-aerothree.onthewifi.com';

export const isAuthenticted = () => {
    const  access_token = localStorage.getItem('access_token');
    return access_token !== null;
};

export default http;
