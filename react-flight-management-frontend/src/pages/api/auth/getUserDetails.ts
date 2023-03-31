import http, { DJANGO_API_URL } from '../http';

export default async function getUserDetails(){

    const { data } = await http.post(`${DJANGO_API_URL}/api/auth/get_details/`);
    return data;
};
