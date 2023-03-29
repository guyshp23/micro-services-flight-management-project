import { FlightCard } from "../components/FlightCard";
import { FlightForm } from "../components/FlightForm";
import GetFlightsByParams from "./api/flights/GetFlightsByParams";
import { useEffect, useState } from "react";
import ScreenBlock, { Error } from "../components/ScreenBlock";

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
            departure_date: new Date(new Date().getTime() + 1 * 24 * 60 * 60 * 1000),
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
            departure_date: new Date(new Date().getTime() + 1 * 24 * 60 * 60 * 1000),
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
            departure_date: new Date(new Date().getTime() + 1 * 24 * 60 * 60 * 1000),
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
            departure_date: new Date(new Date().getTime() + 1 * 24 * 60 * 60 * 1000),
            // today's date + 3 days in Date format
            returning_date: new Date(new Date().getTime() + 3 * 24 * 60 * 60 * 1000),

            airline_company: 'Kosher airlines',
            airline_company_code: 'KL-743',

            price: 420,
            remaining_tickets: 3
        },
    ]
    
    interface Flight {
        id:                       number;
        origin_code:              string;
        origin_city:              string;
        origin_country_name:      string;
        origin_country_code:      string;
        destination_code:         string;
        destination_city:         string;
        destination_country_name: string;
        destination_country_code: string;
        departure_date:           Date;
        returning_date:           Date;
        airline_company:          string;
        airline_company_code:     string;
        price:                    number;
        remaining_tickets:        number;
    }


    const [Flights, setFlights]   = useState<Flight[]>([]);
    const [ErrorObj, setErrorObj] = useState<any | null>(null);

    function onFlightFormSubmit(e: {
        origin_airport_id: string, destination_airport_id: string, departure_date: Date
    }) {
        console.debug('onFlightFormSubmit', e)
        GetFlightsByParams(e.origin_airport_id,
                           e.destination_airport_id,
                           e.departure_date.toISOString().split('T')[0])
            .then((res) => {
                console.debug('response of GetFlightsByParams', res);
                    console.log('fligths set')
                    setFlights(res);
            })
            .catch((err) => {
                console.error('error in GetFlightsByParams', err.response.data);
                setErrorObj(err.response.data);
            })
    }


    return (
        <div className="container flex flex-col items-center justify-between mx-auto mt-12 h-full">
            <FlightForm onSubmitSend={onFlightFormSubmit}/>
            <div className="grid items-center justify-between mx-auto mt-12 lg:grid-cols-2 xl:grid-cols-3">
                {
                    !ErrorObj && Flights && Flights.length > 0
                    && 
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

                                departure_date={flight.departure_date}
                                returning_date={flight.returning_date}

                                price={flight.price}
                                remaining_tickets={flight.remaining_tickets} />
                        )
                    })
                }
            </div>
            {
                ErrorObj && <Error title={ErrorObj.message} message={ErrorObj.custom_message} type="general" />
            }
            {
            (!ErrorObj && Flights.length === 0) && (
                <ScreenBlock
                    title={'Explore flights around the world'}
                    message={'Round and round we go... Hopefully to a new destination!'}
                    image={<img
                                alt="2 Empty Notepads"
                                className="h-60 mb-8"
                                src="http://localhost:3000/main_logo.png"
                            />}
                />
                )
            }

        </div>
    )
}