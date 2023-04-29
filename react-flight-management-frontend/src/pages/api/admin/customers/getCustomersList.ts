import http, { DJANGO_API_URL } from '../../http';

export default async function GetCustomersList(){

    const { data } = await http.get(`${DJANGO_API_URL}/api/customers`);

    return data;
};
