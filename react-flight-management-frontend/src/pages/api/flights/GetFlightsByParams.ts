import http from '../http';

export default async function GetFlightsByParams(origin_airport_id: string, destination_airport_id: string,
                                                 departing_date: Date, returning_date: Date){

    const { data } = await http.post(`http://localhost:8080/flights/search`, {
        origin_airport_id: origin_airport_id, destination_airport_id: destination_airport_id,
        departing_date: departing_date, returning_date: returning_date
    });
    return data;
};
