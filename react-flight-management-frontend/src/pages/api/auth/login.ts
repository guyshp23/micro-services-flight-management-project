import http, { DJANGO_API_ADDRESS } from '../http';

export default async function Login(username: string, password: string){

    const { data } = await http.post(`${DJANGO_API_ADDRESS}/api/auth/login`, {
        username: username, password: password
    });
    return data;
};
