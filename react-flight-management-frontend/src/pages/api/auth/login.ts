import http, { DJANGO_API_URL } from '../http';

export default async function Login(username: string, password: string){

    const { data } = await http.post(`${DJANGO_API_URL}/api/auth/login`, {
        username: username, password: password
    });
    return data;
};
