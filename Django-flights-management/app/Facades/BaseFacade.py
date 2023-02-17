from django.contrib.auth.models import User
from abc import ABC, abstractmethod


class BaseFacade(ABC):
    def __init__(self):
        pass


    @abstractmethod
    def get_all_flights():
        pass

    @abstractmethod
    def get_flight_by_id(flight_id: int):
        pass

    @abstractmethod
    def get_flights_by_parameters(origin_airport_id: int, destination_airport_id: int, departing_date, returning_date):
        pass

    @abstractmethod
    def get_all_airports():
        pass

    @abstractmethod
    def create_new_user(user: User):
        pass

    @abstractmethod
    def get_user_by_id(user: User):
        pass
