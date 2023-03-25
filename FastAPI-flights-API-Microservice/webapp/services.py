import json
from .models import Airport, Flight
from .repositories import FlightsRepository
from fastapi import Form, Response, Request
from fastapi.responses import JSONResponse
from .exceptions import *
import datetime
from .config import Settings
import random

# TODO: When catching an exception, it should return an object with the exception name (like FlightNotFoundException) and the exception message
class FlightsService:
    def __init__(self, flights_repository: FlightsRepository):
        self.flights_repo: FlightsRepository = flights_repository

        # Get external api url from .env file
        # to later call it in the get_flights_by_params method 
        global EXTERNAL_API_URL_01
        EXTERNAL_API_URL_01 = Settings().EXTERNAL_API_URL_01


    def validate_flights(self, origin_display_name,
                         destination_display_name, date, data):
        # Check if data has an attribute of error
        if hasattr(data, 'error'):
            print("Something went wrong while getting external flights", data.error)
            return

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
        added_flights = []

        for flight in data:
            # TODO: Check if the flight already exists in db with the same params
            #       Call function in repo to check that
            print('flight=', flight)
            if 'codeshared' in flight.keys():
                print('codeshared' in flight.keys())
                print('removing codeshared flight')
                del data[data.index(flight)]
                removed_flights += 1

            # Turn both of these to a datetime format
            departure_time = datetime.datetime.strptime(f"{date}T{flight['departure']['scheduledTime']}:00", '%Y-%m-%dT%H:%M:%S')
            arrival_time   = datetime.datetime.strptime(f"{date}T{flight['arrival']['scheduledTime']}:00",   '%Y-%m-%dT%H:%M:%S')

            # Generate ticket price
            ticket_price    = float(random.randint(200, 2000))

            # Generate random ticket quantity
            ticket_quantity = int(random.randint(1, 500))

            inserted_flight = self.flights_repo.insert_external_flight(origin_display_name, destination_display_name, 
                                    departure_time, arrival_time, ticket_price, ticket_quantity).to_json()
                                    ## to json here, specific flight
            added_flights.append(inserted_flight)


        # return data?
        print('total =',len(data), 'removed =',removed_flights)
        print('\n\n\n\n')
        print(added_flights)

        return added_flights
            # don't check the first one, there is nothing to compare it to
            # if flight == data[0]:
            #     print('skipping first flight')
            #     continue
            # print('checking... ' + flight['flight']['number'], data[data.index(flight) - 1]['flight']['number'])
            # # Check if the flight's number is the same as the previous flight's number
            # if flight['flight']['number'] == data[data.index(flight) - 1]['flight']['number']:
            #     print('removing flight', flight.number)
            #     del data[data.index(flight) - 1]
            #     continue


            # for flight.number in flight:
                # if flight.number 


        # flight.number


    def get_flights_by_params(self, origin_display_name: str, 
                              destination_display_name:  str,
                              departure_time:            str):
        # try:
        #     r = self.flights_repo.get_by_params(params)
        # except FlightNotFoundException as e:
        #     return Response(content=str(e), status_code=404)

        # All params from request
        # origin_display_name      = request.query_params['origin_display_name']
        # destination_display_name = request.query_params['destination_display_name']
        # departure_time           = request.query_params['departure_time']
        # landing_time             = request.query_params['landing_time']


        # Call the repository to check if flights exist with the following params
        try:
            # Get all flights from the our database
            # TODO: Fix this bug
            pass
            # local_flights    = self.flights_repo.delete_expired_local_flights()
        except FlightNotFoundException as e:
            # No flights were found with the given params locally
            # Call the external API to get the flights and skip upadting external flights w/ local ones
            print(str(e), 'skipping...')

        # try:
        external_flights = self.flights_repo.get_external_flights_by_params(origin_display_name, destination_display_name, departure_time)
        # json stringify
        data = self.validate_flights(origin_display_name, destination_display_name, departure_time, json.loads(external_flights))


        return Response(content=json.dumps(data), status_code=200)


    def book_flight_by_flight_id(self, flight_id: int):
        # try:
        #     r = self.flights_repo.get(flight_id)
        # except FlightNotFoundException as e:
        #     return Response(content=str(e), status_code=404)
        # except Exception as e:
        #     return Response(content=str(e), status_code=402)
        return Response(content='BOOK flights', status_code=200)



    def delete_flight_by_flight_id(self, flight_id: int):
        # try:
        #     r = self.flights_repo.delete(flight_id)

        # except FlightNotFoundException as e:
        #     return Response(content=str(e), status_code=404)

        # except InvalidParametersWereProvidedInRequestException as e:
        #     return Response(content=str(e), status_code=402)

        # except Exception as e:
        #     return Response(content=str(e), status_code=402)
        

        # if r == 204:
        #     return Response(content=r, status_code=204)
        
        # return r
        return Response(content='DELETE flights', status_code=200)
