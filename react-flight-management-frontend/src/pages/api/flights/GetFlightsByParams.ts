import http, { DJANGO_API_URL } from '../http';

export default async function GetFlightsByParams(origin_display_name: string,
                                                 destination_display_name: string,
                                                 departure_date: string,
                                                ){

    const { data } = await http.get(`${DJANGO_API_URL}/api/flights/`, {
        params: {
            origin_display_name:      origin_display_name,
            destination_display_name: destination_display_name,
            departure_date:           departure_date
        }
    });
    return data;
};
