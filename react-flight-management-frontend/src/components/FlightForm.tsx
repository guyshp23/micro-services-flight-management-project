import { useState } from 'react';
import { ComboBoxInput } from './ComboBoxIinput';
import { DatePickerInput } from './DatePickerInput';
import { Label } from './Label';


interface Props {
    onSubmitSend: any;
}


export function FlightForm({onSubmitSend}: Props){

    interface Airport {
        id: number;
        code: string;
        display_string: string;
        country_code: string;
    }

    const airportsTestList = [
        {
            id: 1,
            code: 'TLV',
            display_string: 'Ben Gurion, Tel Aviv, Israel (TLV)',
            country_code: 'il'
        },
        {
            id: 2,
            code: 'NYC',
            display_string: 'New York, United States (NYC)',
            country_code: 'us'
        },
    ]

    // replace 'useState<Airport[]>(airportsTestList); => useState<Airport[]>([]);
    // to have an empty array until state is set (after response from microservice)
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [airports_list, setAirportsList] = useState<Airport[]>(airportsTestList);

    // From & To airport IDs
    const [originAirport,      setOriginAirport]      = useState<string>('');
    const [destinationAirport, setDestinationAirport] = useState<string>('');

    const AWeekFromToday = new Date();
    AWeekFromToday.setDate(AWeekFromToday.getDate() + 7);
    const [departureDate, setDepartingDate] = useState<Date>(AWeekFromToday);


    const [submitting, setSubmitting] = useState<boolean>(false);
    

    const handleSubmit = () => {
        console.debug('form submit!', originAirport+ ' --> ' +destinationAirport);
        console.debug('departingDate', departureDate);

        setSubmitting(true);

        onSubmitSend({
            origin_airport_id: originAirport,
            destination_airport_id: destinationAirport,
            departure_date: departureDate,
        });

        console.log('submit false')
        setSubmitting(false);
    }

    return (
        <div className="p-4 text-center bg-white border border-gray-200 rounded-md">
        <h1  className="mb-8 text-2xl font-bold text-center text-gray-500">Where would you like to go?</h1>


        {/* Add tabs component with "OneWay" tab as :active */}

            {/* wrapper */}
            <div className='flex flex-row'>
                <div className='flex flex-col mr-6'>
                    <Label>From:</Label>
                    <ComboBoxInput
                        
                        value={originAirport}
                        onSelect={(e: any) => setOriginAirport(e)}
                        valuesArray={airports_list}
                    />
                </div>

                <div className='flex flex-col mr-6'>
                    <Label>To:</Label>
                    <ComboBoxInput
                        
                        value={destinationAirport}
                        onSelect={(e: any) => setDestinationAirport(e)}
                        valuesArray={airports_list}
                    />
                </div>

                <div className='flex flex-col mr-6'>
                    <Label>Departing:</Label>
                    <DatePickerInput
                        title='When would you like to depart?'
                        onChange={setDepartingDate}
                        defaultValue={AWeekFromToday}
                    />
                </div>

            </div>

            <button
                onClick={handleSubmit}
                disabled={submitting}
                className="flex justify-center w-full mt-4 text-white border border-solid rounded shadow-sm h-11 hover:bg-sky-600 hover:shadow-md bg-sky-500 focus:ring-4 focus:ring-sky-200 place-items-center"
            >
            Search Flight
            </button>

        </div>
    )
}
