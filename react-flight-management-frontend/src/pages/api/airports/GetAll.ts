import http, { DJANGO_API_URL } from '../http';

export default async function GetAllAirports(){

    const { data } = await http.get(`${DJANGO_API_URL}/api/airports`);

    return data;
};
