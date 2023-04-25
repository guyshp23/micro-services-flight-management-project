import http, { DJANGO_API_URL } from '../http';

export default async function BookFlight(
                                flight_id:         number,
                                ){
    const { data } = await http.post(`${DJANGO_API_URL}/api/tickets/book/${flight_id}/`);

    return data;
};
