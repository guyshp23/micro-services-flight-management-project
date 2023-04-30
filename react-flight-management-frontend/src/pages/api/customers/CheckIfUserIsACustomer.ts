import http, { DJANGO_API_URL } from '../http';

export default async function CheckIfUserIsACustomer(userID: number){

    const { data } = await http.post(`${DJANGO_API_URL}/api/customers/checkme/`, {
        userID
    });
    return data;
};
