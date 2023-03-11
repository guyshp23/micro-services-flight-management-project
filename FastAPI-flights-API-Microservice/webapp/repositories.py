import datetime

import httpx
from .models import Airport, Flight
from fastapi import Form
from .exceptions import *
from .config import Settings
import json


class FlightsRepository:
    def __init__(self, session_factory):
        self.session_factory = session_factory
        
        # Get external api url from .env file
        # to later call it in the get_flights_by_params method 
        global EXTERNAL_API_URL_01
        global EXTERNAL_API_KEY_01

        EXTERNAL_API_URL_01 = Settings().EXTERNAL_API_URL_01
        EXTERNAL_API_KEY_01 = Settings().EXTERNAL_API_KEY_01


    def get_local_flights_by_params(self, origin_display_name: str, destination_display_name: str,
                                          deperture_time:      str, landing_time:             str) -> list:
        """
        Get all flights from the database that match the given parameters

        Args:
            - origin_display_name:      The airport's origin display name
            - destination_display_name: The airport's destination display name
            - deperture_time:           The flight's deperture time
            - landing_time:             The flight's landing time


        Raises:
            FlightNotFoundException: No flights in the database

        Returns:
            A list of all flights in the database
            (status_code = 200)
        """
        with self.session_factory() as s:
            # Get the origin and destination airport by their display_name
            origin_airport      = s.query(Airport).filter(Airport.display_name == origin_display_name).first()
            destination_airport = s.query(Airport).filter(Airport.display_name == destination_display_name).first()

            rec: list = s.query(Flight).filter(Flight.status == 'deperture', Flight.origin_airport_id == origin_airport,
                                               Flight.destination_airport_id == destination_airport).all()

            if not rec:
                raise FlightNotFoundException('No flights in the database!')

            return rec


    def get_external_flights_by_params(self, origin_display_name: str, destination_display_name: str,
                                             deperture_time:      str, landing_time:             str) -> list:
        """
        Get flights by paramaters from the database

        Args:
            - origin_display_name:      The airport's origin display name
            - destination_display_name: The airport's destination display name
            - deperture_time:           The flight's deperture time
            - landing_time:             The flight's landing time
        
        Raises:
            FlightNotFoundException: Something went wrong while getting the flights from the external api

        Returns:
            A list of all flights in the database
            (status_code = 200)
        """

        # Send a request to the external api to get the flights
        # httpx.get('https://api.skypicker.com/flights?flyFrom=TLV&to=JFK&dateFrom=01/01/2021&dateTo=01/01/2021&partner=picky&v=3')
        external_flights = httpx.get(EXTERNAL_API_URL_01 + '/timetable',
                                        params={'status': 'scheduled',      'type': 'departure', 
                                                'key': EXTERNAL_API_KEY_01, 'limit': '50'}, # TODO: remove limit, only here for debug
                                    )
        
        # Check if the external api returned a valid response
        # if external_flights.status_code != 200 or json.loads(external_flights.text).success:
        #     raise FlightNotFoundException('Something went wrong while getting the flights from the external api')

        print(json.loads(external_flights.text))
        print(type(json.loads(external_flights.text)))

        # if json.loads(external_flights.text).success == False:
        #     print('Something went wrong...')
        #     print(json.loads(external_flights.text).message)
        
        # Turn the response into a list of flights as a list
        return json.loads(external_flights.text)
        # Turn each record in rec into a list of flights in JSON
        # json_list = [f.json() for f in external_flights.json()]
        # return json_list


        # with self.session_factory() as s:
        #     rec: Flights = s.query(Flights).all()

        #     if not rec:
        #         raise FlightNotFoundException('No flights in the database!')

        #     # Turn each record in rec into a list of flightss in JSON
        #     json_list = [r.to_json() for r in rec]
        #     return json_list


    def get(self, flights_id: int):
        """
        Get a flights from the database by ID

        Args:
            flights_id (int): The ID of the flights to get

        Raises:
            FlightNotFoundException: The requested flights doesn't exist

        Returns:
            The flights object that was requested
            (status_code = 200)
        """
        if not isinstance(flights_id, int):
            raise InvalidParametersWereProvidedInRequestException('The flights ID must be an integer!')

        with self.session_factory() as s:
            rec: Flight = s.query(Flight).filter(Flight.id == flights_id).first()
            
            if not rec:
                raise FlightNotFoundException(f"Flights #{flights_id} doesn't exist!")
            
            return rec.to_json()


    def add(self, title: str   = Form(), desc:     str   = Form(),
                  price: float = Form(), quantity: float = Form()):
        """
        Add a flights to the database

        Args:
            title    (str):   The title of the flights
            desc     (str):   The description of the flights
            price    (float): The price of the flights
            quantity (int):   The quantity of the flights

        Raises:
            FlightNotFoundException: The flights already exist
            InvalidParametersWereProvidedInRequestException: The user is trying to add a flights with invalid parameters
            Exception: A general error occured while updating the flights

        Returns:
            The flights that was added to the database
            (status_code = 201)
        """

        with self.session_factory() as s:
            try:
                flights_to_add = Flight(id=None, title=title, desc=desc, price=price,
                                        quantity=quantity, auto_date=datetime.datetime.now())

                # Check if the flights already exists
                rec: Flight = s.query(Flight).filter(Flight.title == title).first()
                if rec:
                    raise FlightNotFoundException(f'Flights "{title}" already exists!')

                # Note: flights validations were moved under the validate() function of the model.
                #       a InvalidParametersWereProvidedInRequestException exception will be raised
                #       if flights_to_add recieves invalid parameters

                # Add the flights to the database
                s.add(flights_to_add)
                s.commit()
            except InvalidParametersWereProvidedInRequestException as e:
                raise InvalidParametersWereProvidedInRequestException(str(e))
            except Exception as e:
                raise Exception('An error occured while adding the flights to the database! (500)', e)

        return flights_to_add


    def update(self, flights_id: int, data: dict):
        """
        Update a flights from the database by ID

        Args:
            flights_id (int): The ID of the flights to update

        Raises:
            FlightNotFoundException: The flights doesn't exist
            InvalidParametersWereProvidedInRequestException: The user is trying to update the flights with invalid parameters
            InvalidParametersWereProvidedInRequestException: The flights ID is not a valid integer
            Exception: A general error occured while updating the flights
        
        Returns:
            The flights object that was sucessfully updated
            (status_code = 204)
        """
        if not isinstance(flights_id, int):
            raise InvalidParametersWereProvidedInRequestException('The flights ID must be an integer!')
        elif not isinstance(data, dict):
            raise InvalidParametersWereProvidedInRequestException('The data must be a dictionary!')

        with self.session_factory() as s:

            try:
                rec: Flight = s.query(Flight).filter(Flight.id == flights_id).first()

                if not rec:
                    raise FlightNotFoundException(f"The flights #{flights_id} doesn't exist!")

                # Check which flights fields were provided in 'data' and update them
                if 'title' in data:
                    rec.title = data['title']
                if 'desc' in data:
                    rec.desc = data['desc']
                if 'price' in data:
                    rec.price = data['price']
                if 'quantity' in data:
                    rec.quantity = data['quantity']
                
                # Update the flights after changing the flights's data
                s.commit()

            except InvalidParametersWereProvidedInRequestException as e:
                raise InvalidParametersWereProvidedInRequestException(str(e))
            except Exception as e:
                raise Exception('An error occured while updating the flights in the database!', e)


    def delete(self, flights_id: int):
        """
        Delete a flights from the database by ID
        
        Args:
            flights_id: The ID of the flights to delete

        Raises:
            FlightNotFoundException: The flights doesn't exist
            Exception: A general error occured while deleting the flights
            InvalidParametersWereProvidedInRequestException: The flights ID is not a valid integer

        Returns:
            No content
            (status_code = 204)
        """
        if not isinstance(flights_id, int):
            raise InvalidParametersWereProvidedInRequestException('The flights ID is not a valid integer!')

        with self.session_factory() as s:
            rec: Flight = s.query(Flight).filter(Flight.id == flights_id).first()

            if not rec:
                raise FlightNotFoundException(f"Flights #{flights_id} doesn't exist!")


            try:
                s.delete(rec)
                s.commit()
            except Exception as e:
                raise Exception('An error occured while deleting the flights from the database!', e)


    def modify_all(self, flights_to_update: list, flights_to_delete: list):
        with self.session_factory() as s:
            for f in flights_to_update:
                rec: Flight = s.query(Flight).filter(Flight.id == f['id']).first()

                if not rec:
                    raise FlightNotFoundException(f"Flights #{f['id']} doesn't exist!")

                rec.title    = f['title']
                rec.desc     = f['desc']
                rec.price    = f['price']
                rec.quantity = f['quantity']
                s.commit()

            for f in flights_to_delete:
                rec: Flight = s.query(Flight).filter(Flight.id == f).first()

                if not rec:
                    raise FlightNotFoundException(f"Flights #{f} doesn't exist!")

                s.delete(rec)
                s.commit()
