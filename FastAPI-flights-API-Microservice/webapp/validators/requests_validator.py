import datetime
from webapp.exceptions import AirportNotFoundException, InvalidParametersWereProvidedInRequestException
from webapp.models import Airport



class RequestsValidator():
    def __init__(self, session_factory):
        self.session_factory = session_factory

    def validate_get_flights_by_parmas(self, origin_display_name, destination_display_name, deperture_time, landing_time):
            # Check if the params are valid
            if origin_display_name == '' or destination_display_name == '' or deperture_time == '' or landing_time == '':
                # TODO: replace with an exception, don't return Response here
                raise InvalidParametersWereProvidedInRequestException('Invalid parameters were provided in the request')


            # Check if the given deperture time is valid
            try:
                datetime.datetime.strptime(deperture_time, '%Y-%m-%d')
            except ValueError:
                raise InvalidParametersWereProvidedInRequestException('The given deperture time is invalid!')
            
            # Check if the given landing time is valid
            try:
                datetime.datetime.strptime(landing_time, '%Y-%m-%d')
            except ValueError:
                raise InvalidParametersWereProvidedInRequestException('The given landing time is invalid!')
            
            # Check if the given deperture time is before the given landing time
            if deperture_time > landing_time:
                raise InvalidParametersWereProvidedInRequestException('The given deperture time is after the given landing time!')
            
            # Check if the given deperture time is before the current time
            if deperture_time < datetime.datetime.now():
                raise InvalidParametersWereProvidedInRequestException('The given deperture time is before the current time!')
            
            # Check if the given landing time is before the current time
            if landing_time < datetime.datetime.now():
                raise InvalidParametersWereProvidedInRequestException('The given landing time is before the current time!')


            # Check if params can be found in the local database
            with self.session_factory() as s:
                rec = s.query(Airport).filter(Airport.display_name == origin_display_name).first()
                if not rec:
                    raise AirportNotFoundException('No airport was found with the given origin display name!')
                
                rec = s.query(Airport).filter(Airport.display_name == destination_display_name).first()
                if not rec:
                    raise AirportNotFoundException('No airport was found with the given destination display name!')
