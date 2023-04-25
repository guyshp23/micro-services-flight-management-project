import json
from webapp.repositories.airports_repository import AirportsRepository
from .models import Flight
from .repositories.flights_repository import FlightsRepository
from fastapi import Response
from .exceptions import *
import datetime
from .config import Settings
import random
import pycountry

class FlightsService:
    def __init__(self,
                 flights_repository: FlightsRepository,
                 airports_repository: AirportsRepository
                 ):
        self.flights_repo: FlightsRepository         = flights_repository
        self.airports_repository: AirportsRepository = airports_repository

        # Get external api url from .env file
        # to later call it in the get_flights_by_params method 
        global EXTERNAL_API_URL_01
        EXTERNAL_API_URL_01 = Settings().EXTERNAL_API_URL_01


    def validate_flights(self, origin_display_name,
                         destination_display_name, date, data):

        # Check if data has an attribute of error
        if 'error' in data:

            if data['error'] == 'No Record Found':
                raise FlightNotFoundException('No flight(s) were found with the given parameters')

            raise Exception("Something went wrong while getting external flights:", data['error'])


        # Check if there are any existing flight in the database
        departure_time = datetime.datetime.strptime(f"{date}T00:00:00", '%Y-%m-%dT%H:%M:%S')
        check_internal_db_flights = self.flights_repo.is_internal_flights_in_db(origin_display_name, destination_display_name, departure_time)

        if check_internal_db_flights:
            internal_flights = []
            print('There are already flights in the database, skipping external fetch from external API, returning existing ones from the db...')

            for flight in check_internal_db_flights:
                internal_flights.append(flight)

            return internal_flights


        removed_flights = 0
        added_flights   = []

        for flight in data:
            # TODO: Check if the flight already exists in db with the same params
            #       Call function in repo to check that
            print('flight=', flight)
            if 'codeshared' in flight.keys():
                print('codeshared' in flight.keys())
                print('removing codeshared flight')
                del data[data.index(flight)]
                removed_flights += 1
                continue

            # Turn both of these to a datetime format
            departure_time = datetime.datetime.strptime(f"{date}T{flight['departure']['scheduledTime']}:00", '%Y-%m-%dT%H:%M:%S')
            arrival_time   = datetime.datetime.strptime(f"{date}T{flight['arrival']['scheduledTime']}:00",   '%Y-%m-%dT%H:%M:%S')

            # Get airline company info
            airline_company      = flight['airline']['name']
            airline_company_code = flight['airline']['iataCode']

            # Generate ticket price
            ticket_price    = float(random.randint(200, 2000))

            # Generate random ticket quantity
            ticket_quantity = int(random.randint(1, 500))

            inserted_flight = self.flights_repo.insert_external_flight(origin_display_name, destination_display_name, 
                                    departure_time, arrival_time, airline_company, airline_company_code, ticket_price, ticket_quantity)
                                    ## to json here, specific flight
            added_flights.append(inserted_flight)


        # return data?
        print('total =',len(data), 'removed =',removed_flights)
        print('\n\n\n\n')
        print(added_flights)

        # Sometimes thrown when there is only 1 codeshared flight
        if len(added_flights) == 0:
            raise FlightNotFoundException('No flights were found with the given parameters')


        return added_flights


    def get_flights_by_params(self, origin_display_name:      str, 
                                    destination_display_name: str,
                                    departure_time:           str):

        try:
            external_flights = self.flights_repo.get_external_flights_by_params(origin_display_name, destination_display_name, departure_time)
            # json stringify
            data = self.validate_flights(origin_display_name, destination_display_name, departure_time, json.loads(external_flights))
        except Exception as e:
            # Call the exceptions repo
            return ExceptionsFactory.handle(e)

        return Response(content=json.dumps(data), status_code=200)


    def book_flight_by_flight_id(self, flight_id: int):
        # try:
        #     r = self.flights_repo.get(flight_id)
        # except FlightNotFoundException as e:
        #     return Response(content=str(e), status_code=404)
        # except Exception as e:
        #     return Response(content=str(e), status_code=402)
        return Response(content='BOOK flights', status_code=200)


    def serialize_flight(self, flight: Flight):

        origin_airport_details = self.airports_repository.get_airport_details_by_id(self, flight.origin_airport_id)
        destin_airport_details = self.airports_repository.get_airport_details_by_id(self, flight.destination_airport_id)

        return {
            "object": "Flight",
            "data": {
                "origin_code"              : origin_airport_details.airport_code,
                "id"                       : flight.id,
                "origin_city"              : origin_airport_details.city_name,
                "origin_country_name"      : origin_airport_details.country_name,
                "origin_country_code"      : pycountry.countries.search_fuzzy(origin_airport_details.country_name)[0].alpha_2, # Like IL or US

                "destination_code"         : destin_airport_details.airport_code,
                "destination_city"         : destin_airport_details.city_name,
                "destination_country_name" : destin_airport_details.country_name,
                "destination_country_code" : pycountry.countries.search_fuzzy(destin_airport_details.country_name)[0].alpha_2, # Like IL or US

                "departure_datetime"       : flight.serialize_time(flight.departure_time),
                "landing_datetime"         : flight.serialize_time(flight.landing_time),
                "remaining_tickets"        : flight.remaining_tickets,
                "ticket_economy_price"     : flight.ticket_economy_price,

                "airline_company"          : flight.airline_company,
                "airline_company_code"     : flight.airline_company_code,
            }
        }
