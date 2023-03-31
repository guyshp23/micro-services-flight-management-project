import http, { DJANGO_API_URL } from '../http';

export default async function Register(refresh_token: string | null){

    if (refresh_token === null) {
        return null;
    }

    const { data } = await http.post(`${DJANGO_API_URL}/api/auth/logout/`, {
        refresh_token: refresh_token
    });
    return data;
};
