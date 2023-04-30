import http, { DJANGO_API_URL } from '../http';

export default async function BookFlightByID(
                                flight_id:  number,
                                firstName?:  string,
                                lastName?:   string,
                                email?:      string,
                                phone?:      string,
                                address?:    string,
                                creditCard?: string,
                                ){
    const { data } = await http.post(`${DJANGO_API_URL}/api/tickets/book/${flight_id}/`, {
        firstName,
        lastName,
        email,
        phone,
        address,
        creditCard,       
    });

    return data;
};
