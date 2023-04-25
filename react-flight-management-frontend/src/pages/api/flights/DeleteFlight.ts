import http, { DJANGO_API_URL } from '../http';

export default async function DeleteFlight(flight_id: number){
    const { data } = await http.delete(`${DJANGO_API_URL}/api/flights/${flight_id}/`);

    return data;
};
