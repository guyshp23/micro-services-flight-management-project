import { useState } from 'react';
import { ComboBoxInput } from './ComboBoxIinput';
import { DatePickerInput } from './DatePickerInput';
import { Label } from './Label';
// import GetDisplayNameByQuery from '../pages/api/airports/GetDisplayNameByQuery';
import { ApplicationStore } from "../state";
import { useStoreState } from 'easy-peasy';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { solid } from '@fortawesome/fontawesome-svg-core/import.macro';


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


    const allAirportsList = useStoreState((state: ApplicationStore) => state!.airports!.data);

    const [fromAirportsList, setFromAirportsList] = useState<Airport[]>([]);
    const [toAirportsList,   setToAirportsList]   = useState<Airport[]>([]);

    // From & To airport query strings
    const [originAirportQuery,      setOriginAirportQuery]      = useState<string>('');
    const [destinationAirportQuery, setDestinationAirportQuery] = useState<string>('');


    const AWeekFromToday = new Date();
    AWeekFromToday.setDate(AWeekFromToday.getDate() + 12);
    const [departureDate, setDepartingDate] = useState<Date>(AWeekFromToday);



    // Change later to useState type
    const onChangeFilterValues = (e: any, setQueryState: any, setListState: any) => {
        console.debug('Setting query state to', e.target.value)
        
        // Set the value of the input to the selected value
        setQueryState(e.target.value);

        // if (e.target.value.length >= 3) {
        //     GetDisplayNameByQuery(e.target.value).then((res) => {
        //         setListState(res);
        //         console.debug('Setting state to', res)
        //         return res;
        //     })
        // }else{
        //     // Display an error message that 
        //     // at least 3 characters are required
        //     console.debug('Not enough characters, please enter at least 3 for the query to be searched');
        //     return;
        // }
        if (e.target.value.length >= 3) {
            
            setListState(allAirportsList.filter((val: any) => {
                // setCurrentValue(e.target.value)
                return val.display_name.toLowerCase().includes(e.target.value.toLowerCase())
            }))
        }

    }

    const clearListState = () => {
        setFromAirportsList([]);
        setToAirportsList([]);

        console.debug('Cleared list state');

        return;
    }

    const handleSubmit = () => {
        clearListState();

        console.debug('Form submitted!',  originAirportQuery+ ' --> ' +destinationAirportQuery);
        console.debug('departingDate', departureDate);


        onSubmitSend({
            origin_airport_id:      originAirportQuery,
            destination_airport_id: destinationAirportQuery,
            departure_date:         departureDate,
        });

        console.debug('Submit false')
    }

    // Represents a list of recommended destinations that we would normally recieve
    // From the backend, from an API request sent in the useEffect hook
    const recommendedFlightDestinations = [
            {
                'New York': 'John F. Kennedy, New York, United States (JFK)',
                'Tel Aviv': 'Ben Gurion, Tel-aviv, Israel (TLV)',
            },
            {
                'Moscow': 'John F. Kennedy, New York, United States (JFK)',
                'Tel Aviv': 'Ben Gurion, Tel-aviv, Israel (TLV)',
            }
            // {
            //     ... This would be another destination ...
            //     ... With only 2 params, from and to   ...
            // }
        ]

    function onRecommendedFlightClick(fromDisplay: string, toDisplay: string){
        console.debug('Clicked on recommended flight', fromDisplay, toDisplay);

        setOriginAirportQuery(fromDisplay);
        setDestinationAirportQuery(toDisplay);
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

            <div className='flex flex-row mt-2 mb-4 font-medium text-left text-gray-400'>
                {
                    recommendedFlightDestinations.map((val: any, key: any) => {
                        return (
                            <div
                                key={key} 
                                className='flex flex-row p-1 px-2 ml-2 text-sm text-gray-500 bg-gray-100 rounded-full cursor-pointer hover:bg-gray-200 first:ml-0 w-fit'
                                // @ts-expect-error
                                onClick={() => onRecommendedFlightClick(Object.values(val)[0], Object.values(val)[1])}
                            >
                                <span className='mr-2'>{Object.keys(val)[0]}</span>
                                <FontAwesomeIcon icon={solid('plane')} className='mt-1 mr-2 text-sky-400' />
                                <span className='mr-2'>{Object.keys(val)[1]}</span>
                            </div>
                        )
                    })
                }
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
