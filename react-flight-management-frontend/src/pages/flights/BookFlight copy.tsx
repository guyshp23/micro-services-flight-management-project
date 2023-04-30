/* eslint-disable @typescript-eslint/no-unused-vars */
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import GetFlightDetails from "../api/flights/GetFlightDetails";
import { Flight } from "../HomePage";
import { faker } from '@faker-js/faker';
import { object, string } from "yup";
import { Formik, Form } from "formik";
import { ToastContainer, toast } from 'react-toastify';
import { Input } from "../../components/Input";
import SpinnerComponent from "../../components/Spinner";
import 'yup-phone';


function BookFlight(){
    const { pk } = useParams();
    const [flight, setFlight]         = useState<Flight>();
    const [isNotFound, setIsNotFound] = useState(false);
    const [isLoading, setIsLoading]   = useState(true);

    useEffect(() => {
        setIsLoading(true);

        // Get flight details from API by pk (flight ID)
        GetFlightDetails(parseInt(pk || '0'))
            .then((response) => {
                console.debug('Get flight details response:', response);
                setFlight(response);
                setIsLoading(false);
            })
            .catch((error) => {
                console.error('Get flight details error:', error);
                setIsNotFound(true);
                setIsLoading(false);
            })

        // setFlight(response);
    }, [pk])

    function generateRandomYear(){
        const min  = 2024;
        const max  = 2036;
        const rand = min + Math.random() * (max - min);

        return Math.round(rand);
    }

    function generateRandomMonth(){
        const min  = 1;
        const max  = 12;
        const rand = min + Math.random() * (max - min);

        if (rand < 10){
            return "0" + Math.round(rand);
        }

        return Math.round(rand);
    }

    function splitString(str: string, N: number) {
        const arr = [];
      
        for (let i = 0; i < str.length; i += N) {
          arr.push(str.substring(i, i + N));
        }
      
        return arr;
      }

    // useState for each customer detail
    const [customerName, setCustomerName]             = useState(faker.name.firstName);
    const [customerSurname, setCustomerSurname]       = useState(faker.name.lastName);
    const [customerEmail, setCustomerEmail]           = useState(faker.internet.email);
    const [customerPhone, setCustomerPhone]           = useState(faker.phone.number('0#########'));
    const [customerAddress, setCustomerAddress]       = useState(`${faker.address.streetAddress(true)}, ${faker.address.city()}, ${faker.address.country()}`);
    const [customerCreditCard, setCustomerCreditCard] = useState(faker.finance.creditCardNumber('visa').replaceAll('-', ''));

    const [customerNameOnCard, setCustomerNameOnCard] = useState(customerName + " " + customerSurname);
    const [customerCardExpirationMonth, setCustomerCardExpirationMonth] = useState(generateRandomMonth);
    const [customerCardExpirationYear, setCustomerCardExpirationYear]   = useState(generateRandomYear);
    const [customerCardCVV, setCustomerCardCVV]       = useState(faker.finance.creditCardCVV);

    useEffect(() => {
        setCustomerNameOnCard(customerName + " " + customerSurname);
    }, [customerName, customerSurname])


    // TODO: Redirect to login page if user is not logged in (can't book a flight without being a user)

    const phoneRegExp = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/


    const CustomerDetailsValidation = object().shape({
        // TODO: Cannot include numbers in name
        FirstName:  string()
                        .required("A First Name is required")
                        .min(3, "Must be at least 3 characters")
                        .matches(/^[a-zA-Z ]*$/, 'Your name cannot contain any numbers or special characters'),

        SurName:    string()
                        .required("A Last Name is required")
                        .min(3, "Must be at least 3 characters")
                        .matches(/^[a-zA-Z ]*$/, 'Your name cannot contain any numbers or special characters'),

        Email:      string()
                        .email(),

        Phone:      string()
                        .required("A Phone Number is required")
                        .min(10, "Must be at least 10 characters")
                        .max(10, "Must be max 10 characters"),


        Address:    string()
                        .required("An Address is required")
                        .min(10, "Must be at least 10 characters"),

        CreditCard: string()
                        .required("A Credit Card Number is required")
                        .min(16, "Must be at least 16 characters"),
    });

    function handleSubmit(values: any){
        console.debug('handleSubmit values:', values);

    }

    return( 
        <>
      <ToastContainer />
        <div className="py-12">
            
        
        <div className="max-w-md mx-auto bg-white rounded-lg shadow-lg md:max-w-5xl">
            <div className="md:flex ">
                <div className="w-full p-4 px-5 py-5">

                    <div className="gap-2 md:grid md:grid-cols-3 ">
                        <div className="col-span-2 p-5">

                            <h1 className="text-xl font-medium text-gray-700">Book Your Flight</h1>
                            <p className="text-sm text-gray-600">You're one step closer to booking flight #{pk}</p>
                            {
                                isLoading && (
                                    <div className="flex items-center justify-center mt-6 py-24">
                                        <SpinnerComponent />
                                    </div>
                                )
                            }
                            {
                                flight && (
                                    <div key={flight.id}>
                                        <div className="flex justify-between mt-6 pt-6 border-t">
                                            <div className="flex items-center">
                                                <Formik
                                                    initialValues={{
                                                        FirstName:  customerName,
                                                        SurName:    customerSurname,
                                                        Email:      customerEmail,
                                                        Phone:      customerPhone,
                                                        Address:    customerAddress,
                                                        CreditCard: customerCreditCard,    
                                                    }}
                                                    onSubmit={handleSubmit}
                                                    validationSchema={CustomerDetailsValidation}
                                                >
                                                {
                                                    () => {
                                                        return (
                                                            <Form className="w-full rounded">
                                                                <div className="grid grid-cols-2 gap-x-8">
                                                                    <Input name="FirstName"  label="First Name"  />
                                                                    <Input name="SurName"    label="Last Name"   />

                                                                    <Input name="Email"      label="Email"       />
                                                                    <Input name="Phone"      label="Phone"       />
                                                                    <Input name="Address"    label="Address"     />
                                                                    <Input name="CreditCard" label="Credit Card" readOnly className="shadow appearance-none border-2 border-gray-100 focus:outline-none focus:shadow-outline rounded w-full py-2 px-3 text-gray-700 leading-tight cursor-not-allowed"/>
                                                                </div>

                                                            </Form>
                                                        )
                                                    }
                                                }
                                                </Formik>
                                            </div>
                                            {/* <div className="flex items-center">
                                                <i className="pr-2 text-sm fa fa-arrow-left"></i>
                                                <span className="font-medium text-blue-500 cursor-pointer text-md">Continue Shopping</span>
                                            </div> */}
                                        </div>
                                    </div>
                                )
                            }
                            {
                                !isLoading &&
                                <div className="flex items-center justify-between pt-6 mt-6 border-t"> 
                                    <Link to="/" className="flex items-center">
                                        <span className="font-medium text-sky-500 hover:text-sky-600 cursor-pointer text-sm">Cancel. I'll find a different flight</span>
                                    </Link>

                                    <div className="flex items-end">
                                        <span className="text-lg font-medium text-gray-600"><span className="text-sm font-medium text-gray-500">Due today:</span> ${flight?.ticket_economy_price}</span>
                                    </div>
                                </div>
                            }
                        </div>

                            
                        <div className="p-5 overflow-visible bg-gray-100 shadow rounded ">

                            <span className="text-xs text-gray-500">Card Type</span>
                            <div className="flex items-center justify-between mt-2 overflow-visible">

                            


                                <div className="relative px-4 py-2 bg-gray-400 rounded w-52 h-28 right-10">

                                    <span className="text-lg italic font-medium text-gray-200 underline">VISA</span>

                                    <div className="flex items-center justify-between pt-4 ">   
                                    {
                                        splitString(customerCreditCard, 4).map((item, index) => (
                                            <span key={index} className="text-xs font-medium text-gray-200">{index !== 3 ? '****' : item}</span>
                                        ))
                                    }
                                    </div>

                                    <div className="flex items-center justify-between mt-3">
                                        <span className="text-xs text-gray-200">{customerNameOnCard}</span>
                                        <span className="text-xs text-gray-200">{customerCardExpirationMonth}/{customerCardExpirationYear}</span>
                                    </div>


                                    
                                </div>






                                <div className="flex flex-col items-center justify-center">
                                    <img src="https://img.icons8.com/color/96/000000/mastercard-logo.png" alt="Mastercard logo" width="40" className="relative right-5" />
                                    <span className="relative text-xs font-medium text-gray-600 bottom-2 right-5">mastercard.</span>
                                    
                                </div>
                                
                            </div>




                            <div className="flex flex-col justify-center pt-3">
                                <label className="text-xs text-gray-500">Name on Card</label>
                                <input
                                    type="text"
                                    className="cursor-not-allowed w-full h-6 py-4 px-2 rounded text-sm text-gray-600 placeholder-gray-300 bg-white border-2 border-gray-200 focus:outline-none"
                                    value={customerNameOnCard}
                                    readOnly
                                />
                            </div>


                            <div className="flex flex-col justify-center pt-3">
                                <label className="text-xs text-gray-500">Card Number</label>
                                <input
                                    type="text"
                                    className="cursor-not-allowed w-full h-6 py-4 px-2 rounded text-sm text-gray-600 placeholder-gray-300 bg-white border-2 border-gray-200 focus:outline-none"
                                    value={`${splitString(customerCreditCard, 4).map((item, index) => (`${index !== 3 ? '****' : item}         `))}`.replaceAll(',', '')}
                                    readOnly
                                />
                            </div>




                            <div className="grid grid-cols-3 gap-2 pt-2 mb-3">

                                <div className="col-span-2 ">
                                    <label className="text-xs text-gray-500">Expiration Date (MM/YYYY)</label>
                                    <div className="grid grid-cols-2">
                                        <input
                                            type="text"
                                            className="cursor-not-allowed w-full h-6 py-4 px-2 rounded rounded-br-none rounded-tr-none border-r text-sm text-gray-600 placeholder-gray-300 bg-white border-2 border-gray-200 focus:outline-none"
                                            value={customerCardExpirationMonth}
                                            readOnly
                                        />
                                        <input
                                            type="text"
                                            className="cursor-not-allowed w-full h-6 py-4 px-2 rounded rounded-bl-none rounded-tl-none text-sm text-gray-600 placeholder-gray-300 bg-white border-2 border-l-0 border-gray-200 focus:outline-none"
                                            value={customerCardExpirationYear}
                                            readOnly
                                        />
                                    </div>
                                </div>


                                    

                                <div className="">
                                    <label className="text-xs text-gray-500">CVV</label>
                                    <input
                                        type="text"
                                        className="cursor-not-allowed w-full h-6 py-4 px-2 rounded text-sm text-gray-600 placeholder-gray-300 bg-white border-2 border-gray-200 focus:outline-none"
                                        value={customerCardCVV}
                                        readOnly
                                    />
                                </div>
                            </div>


                            <div className={`${isLoading && 'cursor-not-allowed'}`}>
                            <button
                                className={`${isLoading && 'pointer-events-none'} w-full h-12 text-white bg-sky-500 hover:bg-sky-600 focus:ring-4 focus:ring-sky-200 rounded focus:outline-none`}
                                type="submit"
                                >Book Flight</button>
                            </div>




                        </div>

                        
                    </div>
                    
                
            </div>
            </div>
        </div>
        </div>
    </>
    )
}

export default BookFlight;