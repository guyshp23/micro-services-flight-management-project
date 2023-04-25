import http, { DJANGO_API_URL } from '../http';

export default async function UpdateFlight(
                                flight_id:         number,
                                remaining_tickets: number,
                                ticket_price:      number,
                                ){
    const { data } = await http.patch(`${DJANGO_API_URL}/api/flights/${flight_id}/`, {
            remaining_tickets:    remaining_tickets,
            ticket_economy_price: ticket_price,
        });

    return data;
};
