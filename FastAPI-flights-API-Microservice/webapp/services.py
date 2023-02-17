import json
from .models import Flights
from .repositories import FlightsRepository
from fastapi import Form, Response
from fastapi.responses import JSONResponse
from .exceptions import *
from fastapi.encoders import jsonable_encoder


# TODO: When catching an exception, it should return an object with the exception name (like FlightNotFoundException) and the exception message
class FlightsService:
    def __init__(self, flights_repository: FlightsRepository):
        self.flights_repo: FlightsRepository = flights_repository

    def get_flights_by_params(self, params):
        # try:
        #     r = self.flights_repo.get_by_params(params)
        # except FlightNotFoundException as e:
        #     return Response(content=str(e), status_code=404)

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
