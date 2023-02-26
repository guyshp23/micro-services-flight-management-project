from django.contrib.auth.models import User
from ..services.flights_service import FlightService


class BaseFacade():
    def __init__(self):
        pass


    def get_flights_by_parameters(self, origin_display_name: int, destination_display_name: int, departure_date, landing_date):
        return FlightService.get_by_params(origin_display_name, destination_display_name, departure_date, landing_date)


    def get_flight_by_id(self, flight_id: int):
        return FlightService.get_by_id(flight_id)


    def get_all_airports(self):
        pass


    def create_new_user(self, user: User):
        pass


    def get_user_by_id(self, user: User):
        pass
