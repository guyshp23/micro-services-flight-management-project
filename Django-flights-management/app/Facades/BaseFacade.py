from django.contrib.auth.models import User


class BaseFacade():
    def __init__(self):
        pass



    def get_all_flights():
        pass


    def get_flight_by_id(flight_id: int):
        pass


    def get_flights_by_parameters(origin_airport_id: int, destination_airport_id: int, departing_date, returning_date):
        pass


    def get_all_airports():
        pass


    def create_new_user(user: User):
        pass


    def get_user_by_id(user: User):
        pass
