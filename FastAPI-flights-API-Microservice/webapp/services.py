import json
from .models import Airport, Flight
from .repositories import FlightsRepository
from fastapi import Form, Response, Request
from fastapi.responses import JSONResponse
from .exceptions import *
from fastapi.encoders import jsonable_encoder
import httpx
import datetime
from .config import Settings

# TODO: When catching an exception, it should return an object with the exception name (like FlightNotFoundException) and the exception message
class FlightsService:
    def __init__(self, flights_repository: FlightsRepository):
        self.flights_repo: FlightsRepository = flights_repository
        
        # Get external api url from .env file
        # to later call it in the get_flights_by_params method 
        global EXTERNAL_API_URL_01
        EXTERNAL_API_URL_01 = Settings().EXTERNAL_API_URL_01


    def get_flights_by_params(self, request: Request):
        # try:
        #     r = self.flights_repo.get_by_params(params)
        # except FlightNotFoundException as e:
        #     return Response(content=str(e), status_code=404)

        # All params from request
        origin_display_name      = request.query_params['origin_display_name']
        destination_display_name = request.query_params['destination_display_name']
        deperture_time           = request.query_params['deperture_time']
        landing_time             = request.query_params['landing_time']

        # Check if the params are valid
        if origin_display_name == '' or destination_display_name == '' or deperture_time == '' or landing_time == '':
            # TODO: replace with an exception, don't return Response here
            return Response(content='Invalid parameters were provided in the request', status_code=402)


        ###########################
        ### Move somewhere else ###
        ###########################
        # Check if the given deperture time is valid
        try:
            datetime.datetime.strptime(deperture_time, '%Y-%m-%d %H:%M:%S')
        except ValueError:
            raise InvalidParametersWereProvidedInRequestException('The given deperture time is invalid!')
        
        # Check if the given landing time is valid
        try:
            datetime.datetime.strptime(landing_time, '%Y-%m-%d %H:%M:%S')
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


        # Turn the 'deperture_time' and 'landing_time' into datetime objects
        deperture_time = datetime.datetime.strptime(deperture_time, '%Y-%m-%d')
        landing_time   = datetime.datetime.strptime(landing_time,   '%Y-%m-%d')

        # Call the repository to check if flights exist with the following params
        try:
            # Get all flights from the our database
            local_flights    = self.flights_repo.get_local_flights_by_params()
            external_flights = self.flights_repo.get_external_flights_by_params(origin_display_name, destination_display_name, deperture_time, landing_time)

            # Check which flights need to be removed
            for f in local_flights:
                pass


            for f in external_flights:
                # Pass all details to repository and check if they can be
                # resolved in the local database, if not, grab them from the external API
                pass



            # # Check which flights need to be removed / updated
            # for flight in r:
            #     # If the flight's landing time is less than the current time, remove it from the list
            #     if flight['landing_time'] < datetime.datetime.now():
            #         r.remove(flight)

            #     # If the flight's deperture time is less than the current time, update the flight's status to 'in flight'
            #     if flight['deperture_time'] < datetime.datetime.now():
            #         flight['status'] = 'in flight'


            # # Call the repository to update/remove the flights database
            # # aka. modify all flights in the database at scale by passing a list of flights
            # self.flights_repo.modify_all(r)



        except FlightNotFoundException as e:
            pass
            # No flights were foudn with the given params
            # Call the external API to get the flights
            # httpx.get(EXTERNAL_API_URL_01 + '/timetable',
            #           params={'status': 'scheduled', 'type': 'departure'})

        


        return Response(content='flights', status_code=200)


    def book_flight_by_flight_id(self, flight_id: int):
        # try:
        #     r = self.flights_repo.get(flight_id)
        # except FlightNotFoundException as e:
        #     return Response(content=str(e), status_code=404)
        # except Exception as e:
        #     return Response(content=str(e), status_code=402)
        
        # return JSONResponse(content=r, status_code=200, media_type='application/json')
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
