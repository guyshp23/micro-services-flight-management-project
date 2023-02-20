// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
// import { solid } from '@fortawesome/fontawesome-svg-core/import.macro' // regular, brands, icon
import { CircleFlag } from 'react-circle-flags'

type Props = {
    origin_code: string,
    
    origin_city: string,
    origin_country_name: string,
    origin_country_code: string,

    destination_code: string,
    destination_city: string,
    destination_country_name: string,
    destination_country_code: string,

    departing_date: Date,
    returning_date: Date,
    airline_company: string,
    airline_company_code: string,
    price: number,
    remaining_tickets: number
}

export const FlightCard: React.FC<Props> = ({
    origin_code,
    origin_city,
    origin_country_name,
    origin_country_code,
    
    destination_code,
    destination_city,
    destination_country_name,
    destination_country_code,

    departing_date,
    returning_date,
    airline_company,
    airline_company_code,
    price,
    remaining_tickets
}) => {
    return (
        <>
        <div className="p-10">
        <div className="max-w-full bg-white flex flex-col rounded overflow-hidden shadow-lg">
            <div className="relative flex flex-row items-baseline flex-nowrap border-b-2 border-gray-100 px-6 p-2">
                <svg viewBox="0 0 64 64" data-testid="tripDetails-bound-plane-icon" pointerEvents="all" aria-hidden="true" className="mt-2 mr-1" role="presentation" style={{fill: 'rgb(102, 102, 102)', height: '0.9rem', width: '0.9rem'}}>
                    <path d="M43.389 38.269L29.222 61.34a1.152 1.152 0 01-1.064.615H20.99a1.219 1.219 0 01-1.007-.5 1.324 1.324 0 01-.2-1.149L26.2 38.27H11.7l-3.947 6.919a1.209 1.209 0 01-1.092.644H1.285a1.234 1.234 0 01-.895-.392l-.057-.056a1.427 1.427 0 01-.308-1.036L1.789 32 .025 19.656a1.182 1.182 0 01.281-1.009 1.356 1.356 0 01.951-.448l5.4-.027a1.227 1.227 0 01.9.391.85.85 0 01.2.252L11.7 25.73h14.5L19.792 3.7a1.324 1.324 0 01.2-1.149A1.219 1.219 0 0121 2.045h7.168a1.152 1.152 0 011.064.615l14.162 23.071h8.959a17.287 17.287 0 017.839 1.791Q63.777 29.315 64 32q-.224 2.685-3.807 4.478a17.282 17.282 0 01-7.84 1.793h-9.016z"></path>
                </svg>
                <h1 className="ml-2 uppercase font-bold text-gray-500">departure</h1>
                {/* tranform departing_date Date object to Day - Month number - Month format */}

                {/* TODO: Format date to extract it into date & hour and print it here accordingly */}
                <p className="absolute right-6 bottom-2 ml-2 font-normal text-gray-500">{departing_date.toLocaleDateString()} at 19:00</p>
            </div>
            <div className="mt-2 flex sm:flex-row mx-6 sm:justify-between flex-wrap">
            <div className="flex flex-row w-full justify-between">
                <div className="flex flex-col p-2">
                    <div className='flex'>
                        <CircleFlag countryCode={origin_country_code} height="35" className={'h-10 border-2 rounded-full border-gray-100 mr-2'} />
                        <div>
                            <p className="font-bold text-gray-600">18:25</p>
                            <p className="text-gray-500"><span className="font-medium">{origin_city}</span> ({origin_code})</p>
                            <p className="text-gray-500">{origin_country_name}</p>
                        </div>
                    </div>
                </div>
                <div className="flex flex-col flex-wrap p-2">
                    <div className='flex'>
                        <CircleFlag countryCode={destination_country_code} height="35" className={'h-10 border-2 rounded-full border-gray-100 mr-2'} />
                        <div>
                            <p className="font-bold text-gray-600">19:25</p>
                            <p className="text-gray-500"><span className="font-medium">{destination_city}</span> ({destination_code})</p>
                            <p className="text-gray-500">{destination_country_name}</p>
                        </div>
                    </div>
                </div>
            </div>
            <div className="flex flex-row place-items-center pt-6 p-2">
                <img alt={airline_company}
                        className="w-10 h-10 rounded-full shadow-md"
                        src={`https://api.dicebear.com/5.x/identicon/svg?seed=${airline_company}`} 
                        style={{opacity: '1', transformOrigin: '0% 50% 0px', transform: 'none'}} 
                />
                <div className="flex flex-col ml-2">
                    <p className="text-xs text-gray-500 font-bold">{airline_company}</p>
                    <p className="text-xs text-gray-500">{airline_company_code}</p>
                </div>
            </div>
        </div>
            
            <div className="relative mt-4 bg-gray-50 flex flex-row flex-wrap md:flex-nowrap justify-between items-baseline">
            <div className=" flex mx-6 py-4 flex-row flex-wrap justify-between items-center w-full">
                <div className='flex flex-row'>
                    <svg className="w-12 h-10 p-2 mx-2 self-center bg-sky-200 rounded-full fill-current text-white" viewBox="0 0 64 64" pointerEvents="all" aria-hidden="true" role="presentation"><path d="M43.389 38.269L29.222 61.34a1.152 1.152 0 01-1.064.615H20.99a1.219 1.219 0 01-1.007-.5 1.324 1.324 0 01-.2-1.149L26.2 38.27H11.7l-3.947 6.919a1.209 1.209 0 01-1.092.644H1.285a1.234 1.234 0 01-.895-.392l-.057-.056a1.427 1.427 0 01-.308-1.036L1.789 32 .025 19.656a1.182 1.182 0 01.281-1.009 1.356 1.356 0 01.951-.448l5.4-.027a1.227 1.227 0 01.9.391.85.85 0 01.2.252L11.7 25.73h14.5L19.792 3.7a1.324 1.324 0 01.2-1.149A1.219 1.219 0 0121 2.045h7.168a1.152 1.152 0 011.064.615l14.162 23.071h8.959a17.287 17.287 0 017.839 1.791Q63.777 29.315 64 32q-.224 2.685-3.807 4.478a17.282 17.282 0 01-7.84 1.793h-9.016z"></path></svg>
                    <div className="text-sm mx-2 flex flex-col">
                        <p className="">Standard Ticket</p>
                        <p className="font-bold">${price}</p>
                        <p className="text-xs text-gray-500">Price per adult</p>
                    </div>
                </div>
                <div className="absolute top-2 right-0">
                    {/* Maybe replace this w/ gardient combination of light blues? */}
                    <button className="w-32 h-9 rounded flex shadow-sm hover:shadow-md active:shadow-md border-solid border text-white bg-sky-500 hover:bg-sky-600 focus:ring-4 focus:ring-sky-200 mx-6 mt-2 justify-center place-items-center"><div className="">Book</div></button>
                    <p className="ml-[1.85rem] mt-1 text-xs text-gray-500"><b>{remaining_tickets}</b> Remaining tickets</p>
                </div>
            </div>
            </div>
        </div>
        </div>
    </>
    )
}