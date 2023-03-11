from django.contrib.auth.models import User
from ..services.flights_service import FlightService


class BaseFacade():
    #  The author disclaims copyright to this source code.
    #  In place of a legal notice, here is a blessing:                                          
    #  
    #  May you do good and not evil.                                             
    #  May you find forgiveness for yourself and forgive others.                 
    #  May you share freely, never taking more than you give.

    def __init__(self):
        pass


    def get_flights_by_parameters(self, origin_display_name: int, destination_display_name: int, departure_date, landing_date):
        return FlightService.get_by_params(self, origin_display_name, destination_display_name, departure_date, landing_date)


    def get_flight_by_id(self, flight_id: int):
        return FlightService.get_by_id(self, flight_id)


    def get_all_airports_display_name_by_query(self, query: str):
        return FlightService.get_all_airports_display_name_by_query(self, query)


    def create_new_user(self, user: User):
        pass


    def get_user_by_id(self, user: User):
        pass


    def get_all_customer_flights(self, user_id: int) -> list:
        return FlightService.get_all_customer_flights(self, user_id)
