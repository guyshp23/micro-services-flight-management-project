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
    def get_flights_by_parameters(origin_country_id: int, destination_country_id: int, date):
        pass

    @abstractmethod
    def get_all_airports():
        pass

    @abstractmethod
    def get_airport_by_id(airport_id: int):
        pass

    @abstractmethod
    def create_new_user(user: User):
        pass
