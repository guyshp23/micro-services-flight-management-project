import http, { DJANGO_API_URL } from '../http';

export default async function GetCustomerFlights(customerID: number){

    const { data } = await http.get(`${DJANGO_API_URL}/api/customers/${customerID}/flights/`);
    return data;
};
