from ..exceptions.model_not_found import ModelNotFoundException
from .base_service_interface import BaseServiceInterface
from ..models import Airport, Flight
import requests



class FlightService(BaseServiceInterface):


    async def get_by_params(origin_display_name: str, destination_display_name: str,
                            departure_time,           landing_time):
        
        # # Find the airport ID in database by the "origin_display_name" variable.
        # origin_display_name_in_db      = Airport.objects.get(display_name=origin_display_name).id
        # destination_display_name_in_db = Airport.objects.get(display_name=destination_display_name).id

        # # Find the flights that match the given parameters.
        # flights = Flight.objects.filter(origin_airport=origin_display_name_in_db, destination_airport=destination_display_name_in_db, 
        #                                 departure_time=departure_time,            landing_time=landing_time)

        # # Return the flights that match the given parameters.
        # return flights




        # Set the basic headers for the request 
        # (will require authentication token in the future)
        headers = {
            'content-type': 'application/json',
            'Accept': 'application/json',
            'Accept-Charset': 'UTF-8',
        }

        # Include all parameters in the request
        payload = {
            'origin_display_name':      origin_display_name,
            'destination_display_name': destination_display_name,
            'deperture_time':           departure_time,
            'landing_time':             landing_time,
        }
        
        # Send an API request to the microservice endpoint
        rest = requests.post('https://api.microservice.aerothree.me/v1/flights',
                             headers=headers, data=payload)
        
        response = await rest.json()

        # Return the response from the microservice
        return response

       


    def get_by_id(flight_id: int):
        
        # Check if the flight exists by ID
        flight = Flight.objects.filter(id=flight_id).first()

        if flight == None:
            raise ModelNotFoundException('Flight not found')
        return flight

        # return {
        #     'object': 'flight',
        #     'flight_id':            flight.id,
        #     'origin_country':       flight.origin_country,
        #     'destination_country':  flight.destination_country,
        #     'deperture_date':       flight.departure_date,
        #     'landing_date':         flight.landing_date,
        #     'remaining_tickets':    flight.remaining_tickets,
        #     'ticket_economy_price': flight.ticket_economy_price,
        # }
