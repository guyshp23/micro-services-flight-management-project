import logging
from ..exceptions.model_not_found import ModelNotFoundException
from .base_service_interface import BaseServiceInterface
from ..models import Airport, Flight
import requests


class FlightService(BaseServiceInterface):
    """
    The following strings are meant to be funny. Do not edit these strings
    unless you are funny, too. If you don't know if you're funny, you're
    not funny. If fewer than 2 people unrelated to you have told you that 
    you're funny, you're not funny. And, you should avoid changing this.
    """
    global logger
    logger = logging.getLogger('main')

    def __init__(self):
        logger.debug("FlightService initialized")

    async def get_by_params(self, origin_display_name: str, destination_display_name: str,
                            departure_time,           landing_time):
        logger.debug("FlightService.get_by_params() called")
        print("FlightService.get_by_params() called")

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
            'content-type':   'application/json',
            'Accept':         'application/json',
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
        rest = requests.post('https://api.ms.aerothree.me/v1/flights',
                             headers=headers, data=payload)
        logger.debug("Sending API request to microservice...")


        response = await rest.json()
        logger.debug("Got response from API: " + str(response))


        # Return the response from the microservice
        return response


    def get_by_id(self, flight_id: int):
        logger.debug("FlightService.get_by_id() called")
        
        # Check if the flight exists by ID
        flight = Flight.objects.filter(id=flight_id).first()

        if flight == None:
            logger.error('Flight not found, id: ' + str(flight_id))
            raise ModelNotFoundException('Flight not found')
        
        logger.debug('Returned flight: ' + str(flight))
        return flight


    def get_all_airports_display_name_by_query(self, query: str) -> list:
        logger.debug("FlightService.get_all_airports_display_name_by_query() called")

        # Find all airports that match the query
        airports = Airport.objects.filter(display_name__icontains=query)

        # Return the airports that match the query
        return airports
