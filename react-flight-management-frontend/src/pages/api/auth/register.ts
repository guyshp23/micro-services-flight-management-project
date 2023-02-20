import http, { DJANGO_API_ADDRESS } from '../http';

export default async function Register(username: string, email: string, password: string){

    const { data } = await http.post(`${DJANGO_API_ADDRESS}/api/auth/register`, {
        username: username, email: email, password: password
    });
    return data;
};
