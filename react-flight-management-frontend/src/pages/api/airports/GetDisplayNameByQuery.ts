import http, { DJANGO_API_URL } from '../http';

export default async function GetDisplayNameByQuery(query: string){

    const { data } = await http.get(`${DJANGO_API_URL}/api/airports/locations`, {
        params: {
            query: query
        }
    });

    return data;
};
