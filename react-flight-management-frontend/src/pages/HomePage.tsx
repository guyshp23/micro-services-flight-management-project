import { FlightCard } from "../components/FlightCard";
import { FlightForm } from "../components/FlightForm";
import GetFlightsByParams from "./api/flights/GetFlightsByParams";
import { useEffect, useState } from "react";

export function HomePage() {
    
    // Test data for now
    const CurrentFlights = [
        {
            id: 1,
            origin_code: 'LAX',
            origin_city: 'Los Angeles',
            origin_country_name: 'United States',
            origin_country_code: 'us',

            destination_code: 'NYC',
            destination_city: 'New York',
            destination_country_name: 'United States',
            destination_country_code: 'us',

            // today's date in Date format + 1 day
            departing_date: new Date(new Date().getTime() + 1 * 24 * 60 * 60 * 1000),
            // today's date + 3 days in Date format
            returning_date: new Date(new Date().getTime() + 3 * 24 * 60 * 60 * 1000),

            airline_company: 'Kosher airlines',
            airline_company_code: 'KL',

            price: 420,
            remaining_tickets: 69
        },
        {
            id: 2,
            origin_code: 'TLV',
            origin_city: 'Tel Aviv',
            origin_country_name: 'Israel',
            origin_country_code: 'il',

            destination_code: 'NYC',
            destination_city: 'New York',
            destination_country_name: 'United States',
            destination_country_code: 'us',

            // today's date in Date format + 1 day
            departing_date: new Date(new Date().getTime() + 1 * 24 * 60 * 60 * 1000),
            // today's date + 3 days in Date format
            returning_date: new Date(new Date().getTime() + 3 * 24 * 60 * 60 * 1000),

            airline_company: 'Kosher airlines',
            airline_company_code: 'KL-743',

            price: 120,
            remaining_tickets: 420
        },
        {
            id: 3,
            origin_code: 'TLV',
            origin_city: 'Tel Aviv',
            origin_country_name: 'Israel',
            origin_country_code: 'il',

            destination_code: 'NYC',
            destination_city: 'New York',
            destination_country_name: 'United States',
            destination_country_code: 'us',

            // today's date in Date format + 1 day
            departing_date: new Date(new Date().getTime() + 1 * 24 * 60 * 60 * 1000),
            // today's date + 3 days in Date format
            returning_date: new Date(new Date().getTime() + 3 * 24 * 60 * 60 * 1000),

            airline_company: 'Kosher airlines',
            airline_company_code: 'KL-743',

            price: 420,
            remaining_tickets: 97
        },
        {
            id: 4,
            origin_code: 'TLV',
            origin_city: 'Tel Aviv',
            origin_country_name: 'Israel',
            origin_country_code: 'il',

            destination_code: 'MLC',
            destination_city: 'Milan',
            destination_country_name: 'United States',
            destination_country_code: 'us',

            // today's date in Date format + 1 day
            departing_date: new Date(new Date().getTime() + 1 * 24 * 60 * 60 * 1000),
            // today's date + 3 days in Date format
            returning_date: new Date(new Date().getTime() + 3 * 24 * 60 * 60 * 1000),

            airline_company: 'Kosher airlines',
            airline_company_code: 'KL-743',

            price: 420,
            remaining_tickets: 3
        },
    ]
    
    
    const [Flights, setFlights] = useState(CurrentFlights);

    // useEffect(() => {
    //     setFlights(CurrentFlights);
    // }, [CurrentFlights]);

    useEffect(() => {
        // ...
    }, [])


    return (
    <div className="container flex flex-col items-center justify-between mx-auto mt-12">
        <FlightForm onSubmitSend={(e: {
            origin_airport_id: string, destination_airport_id: string, departing_date: Date, returning_date: Date
        }) => GetFlightsByParams(e.origin_airport_id, e.destination_airport_id, e.departing_date, e.returning_date).then(
            (res) => {
                console.debug('response of GetFlightsByParams', res);
                setFlights(res);
            }
        )}/>
        <div className="grid lg:grid-cols-2 xl:grid-cols-3 items-center justify-between mx-auto mt-12">
            {
                Flights.map((flight) => {
                    return (
                        <FlightCard
                            key={flight.id}
                            origin_code={flight.origin_code}
                            origin_city={flight.origin_city}
                            origin_country_name={flight.origin_country_name} 
                            origin_country_code={flight.origin_country_code} 

                            destination_code={flight.destination_code}
                            destination_city={flight.destination_city}
                            destination_country_name={flight.destination_country_name}
                            destination_country_code={flight.destination_country_code}

                            airline_company={flight.airline_company}   
                            airline_company_code={flight.airline_company_code}

                            departing_date={flight.departing_date}
                            returning_date={flight.returning_date}

                            price={flight.price}
                            remaining_tickets={flight.remaining_tickets} />
                    )
                })
            }
        </div>

    </div>
    )
}