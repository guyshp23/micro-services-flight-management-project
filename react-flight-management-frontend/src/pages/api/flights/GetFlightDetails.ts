import http, { DJANGO_API_URL } from '../http';

export default async function GetFlightDetails(flightID: number){

    const { data } = await http.get(`${DJANGO_API_URL}/api/flights/${flightID}/`);
    return data;
};
