import { Formik, FormikHelpers } from 'formik';
import { useState } from 'react';
import { ComboBoxInput } from './ComboBoxIinput';
import { DatePickerInput } from './DatePickerInput';
import { Label } from './Label';

// interface errorsInterface{
//     departure: string;
//     arrival: string;
//     date: string;
// }

// interface ValuesInterface {
//     origin_airport_id: number;
//     destination_airport_id: number;
//     departing_date: Date;
//     returning_date: Date;
// }

// const errors: errorsInterface = {
//     departure: '',
//     arrival: '',
//     date: ''
// };

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
    

    // function validateForm(values: any){
    //     if (!values.email) {
    //         errors.departure = 'Required';
    //     } else if (
    //         !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
    //     ) {
    //         errors.departure = 'Invalid email address';
    //     }
    //     return errors;
    // }

    const handleSubmit = () => {
        console.log('form submit!', originAirport+ ' --> ' +destinationAirport);
        console.log('departingDate', departingDate);
        console.log('returningDate', returningDate);
        // setTimeout(() => {
        //     alert(JSON.stringify({origin_airport_id, destination_airport_id, departing_date, returning_date}, null, 2));
        //     resetForm();
        // })
        
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
        <h1  className="text-2xl font-bold text-center mb-8 text-gray-700">Where would you like to go?</h1>



         <form onSubmit={() => handleSubmit()}>
            {/* wrapper */}
            <div className='flex flex-row'>
                <div className='flex flex-col mr-6'>
                    <Label>From:</Label>
                    <ComboBoxInput
                        value={originAirport}
                        onSelect={(e: any) => {setOriginAirport(e); console.log(e)}}
                        valuesArray={airports_list}
                    />
                </div>

                <div className='flex flex-col mr-6'>
                    <Label>To:</Label>
                    <ComboBoxInput
                        value={destinationAirport}
                        onSelect={(e: any) => {setDestinationAirport(e); console.log(e)}}
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

            <button type={'submit'}
                    disabled={submitting}
                    className="w-full h-11 rounded flex border-solid border text-white bg-vanHelsing-700 focus:ring-2 focus:ring-vanHelsing-600 mt-4 justify-center place-items-center"
            >
            Search Flight
            </button>
         </form>

        </div>
    )
}
