from .base_service_interface import BaseServiceInterface
from ..models import Airport, Flight

class FlightService(BaseServiceInterface):
    
    
    def get_by_params(origin_display_name: str, destination_display_name: str,
                      departure_time, landing_time):
        
        # Find the airport ID in database by the "origin_airport_name" variable.
        origin_display_name_in_db      = Airport.objects.get(display_name=origin_display_name)
        destination_display_name_in_db = Airport.objects.get(display_name=destination_display_name)

        # Find the flights that match the given parameters.
        flights = Flight.objects.filter(origin_airport=origin_display_name_in_db, destination_airport=destination_display_name_in_db, 
                                        departure_time=departure_time,            landing_time=landing_time)

        # Return the flights that match the given parameters.
        return flights
