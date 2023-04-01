import { useState } from 'react';
import { ComboBoxInput } from './ComboBoxIinput';
import { DatePickerInput } from './DatePickerInput';
import { Label } from './Label';
import GetDisplayNameByQuery from '../pages/api/airports/GetDisplayNameByQuery';


interface Props {
    onSubmitSend: any;
}


export function FlightForm({onSubmitSend}: Props){

    interface Airport {
        id:           number;
        display_name: string;
        country_code: string;
    }

    interface Airport {
        id:           number;
        display_name: string;
        country_code: string;
    }



    const [fromAirportsList, setFromAirportsList] = useState<Airport[]>([]);
    const [toAirportsList,   setToAirportsList]   = useState<Airport[]>([]);

    // From & To airport query strings
    const [originAirportQuery,      setOriginAirportQuery]      = useState<string>('United States, New York, John F. Kennedy (JFK)');
    const [destinationAirportQuery, setDestinationAirportQuery] = useState<string>('Israel, Tel-aviv, Ben Gurion (TLV)');


    const AWeekFromToday = new Date();
    AWeekFromToday.setDate(AWeekFromToday.getDate() + 12);
    const [departureDate, setDepartingDate] = useState<Date>(AWeekFromToday);



    // Change later to useState type
    const onChangeFilterValues = (e: any, setQueryState: any, setListState: any) => {
        console.debug('Setting query state to', e.target.value)

        // Set the value of the input to the selected value
        setQueryState(e.target.value);

        if (e.target.value.length >= 3) {
            GetDisplayNameByQuery(e.target.value).then((res) => {
                setListState(res);
                console.debug('Setting state to', res)
                return res;
            })
        }else{
            // Display an error message that 
            // at least 3 characters are required
            console.debug('Not enough characters, please enter at least 3 for the query to be searched');
            return;
        }
    }

    const handleSubmit = () => {

        console.debug('Form submitted!',  originAirportQuery+ ' --> ' +destinationAirportQuery);
        console.debug('departingDate', departureDate);


        onSubmitSend({
            origin_airport_id:      originAirportQuery,
            destination_airport_id: destinationAirportQuery,
            departure_date:         departureDate,
        });

        console.debug('Submit false')
    }



    return (
        <div className="p-4 text-center bg-white border border-gray-200 rounded-md">
        <h1  className="text-2xl font-medium text-center text-gray-500">Where would you like to go?</h1>
        <p   className="mb-8 text-base text-center text-gray-500">Round and round we go, hopefully to a new destination!</p>

        {/* Add tabs component with "OneWay" tab as :active */}

            {/* Wrapper */}
            <div className='flex flex-row'>
                <div className='flex flex-col mr-6'>
                    <Label>From:</Label>
                    <ComboBoxInput
                        onChangeFilterValues={(e: any) => onChangeFilterValues(e, setOriginAirportQuery, setFromAirportsList)}
                        onSelect={(e: any) => {setOriginAirportQuery(e); console.debug('changing to', e)}}
                        value={originAirportQuery}
                        valuesArray={fromAirportsList}
                    />
                </div>

                <div className='flex flex-col mr-6'>
                    <Label>To:</Label>
                    <ComboBoxInput
                        onChangeFilterValues={(e: any) => onChangeFilterValues(e, setDestinationAirportQuery, setToAirportsList)}
                        onSelect={(e: any) => {setDestinationAirportQuery(e); console.debug('changing to', e)}}
                        value={destinationAirportQuery}
                        valuesArray={toAirportsList}
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
                className="flex justify-center w-full mt-4 text-white border border-solid rounded shadow-sm h-11 hover:bg-sky-600 hover:shadow-md bg-sky-500 focus:ring-4 focus:ring-sky-200 place-items-center"
            >
            Search Flight
            </button>

        </div>
    )
}
