import axios, { AxiosInstance } from 'axios';

const http: AxiosInstance = axios.create({
    timeout: 20000,
    headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
    },
});


// 1. for testing Django locally
// 2. for 'production'
export const DJANGO_API_URL  = 'http://localhost:8000';
// export const DJANGO_API_URL  = 'https://django-aerothree.onthewifi.com';


export const isAuthenticted = () => {
    const  access_token = localStorage.getItem('access_token');
    return access_token !== null;
};

export default http;
