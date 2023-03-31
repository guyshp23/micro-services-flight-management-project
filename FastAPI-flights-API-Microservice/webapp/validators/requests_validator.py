import datetime
from webapp.exceptions import InvalidParamsException
from webapp.repositories.flights_repository import FlightsRepository



class RequestsValidator():
    def __init__(self):
         pass

    def validate_get_flights_by_parmas(origin_display_name, destination_display_name, departure_time, landing_time):
            # Check if the params are valid
            if origin_display_name == '' or destination_display_name == '' or departure_time == '' or landing_time == '':
                # TODO: replace with an exception, don't return Response here
                raise InvalidParamsException('Invalid parameters were provided in the request')

            # Check if the given deperture time is valid
            # Check if the time is instance of datetime
            if not isinstance(departure_time, datetime.datetime):
                raise InvalidParamsException('The given deperture time is invalid!')
            
            # Check if the given deperture time is before the current time
            if departure_time < datetime.datetime.now():
                raise InvalidParamsException('The given deperture time is before the current time!')


            # Check if params can be found in the local database
            FlightsRepository.validate_display_names(origin_display_name, destination_display_name)