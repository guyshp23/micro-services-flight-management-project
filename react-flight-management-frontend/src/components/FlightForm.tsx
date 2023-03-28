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
            display_string: 'Tel Aviv, Israel',
            country_code: 'il'
        },
        {
            id: 2,
            code: 'NYC',
            display_string: 'New York, United States',
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


    const [departingDate, setDepartingDate] = useState<Date>();
    const [returningDate, setReturningDate] = useState<Date>();


    const [submitting, setSubmitting] = useState<boolean>(false);
    

    const handleSubmit = () => {
        console.debug('form submit!', originAirport+ ' --> ' +destinationAirport);
        console.debug('departingDate', departingDate);
        console.debug('returningDate', returningDate);
        
        setSubmitting(true);

        onSubmitSend({
            origin_airport_id: originAirport,
            destination_airport_id: destinationAirport,
            departing_date: departingDate,
            returning_date: returningDate
        });

        setSubmitting(false);
    }

    return (
        <div className="bg-white border border-gray-200 rounded-md p-4 text-center">
        <h1  className="text-2xl font-bold text-center mb-8 text-gray-500">Where would you like to go?</h1>



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

                {/* TODO: Add validations, make sure returning date isn't lower than departing date */}
                <div className='flex flex-col mr-6'>
                    <Label>Departing:</Label>
                    <DatePickerInput
                        
                        title='When would you like to depart?'
                        onChange={setDepartingDate}
                    />
                </div>

                <div className='flex flex-col'>
                    <Label>Returning:</Label>
                    <DatePickerInput
                        
                        title='When would you like to return?'
                        onChange={setReturningDate}
                    />
                </div>
            </div>

            <button
                    onClick={handleSubmit}
                    disabled={submitting}
                    className="w-full h-11 rounded flex hover:bg-sky-600 shadow-sm hover:shadow-md border-solid border text-white bg-sky-500 focus:ring-4 focus:ring-sky-200 mt-4 justify-center place-items-center"
            >
            Search Flight
            </button>

        </div>
    )
}
