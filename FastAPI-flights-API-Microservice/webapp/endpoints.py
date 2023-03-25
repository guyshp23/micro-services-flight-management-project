from fastapi import APIRouter, Depends, Query
from dependency_injector.wiring import inject, Provide
from webapp.exceptions import InvalidParametersWereProvidedInRequestException, AirportNotFoundException
from webapp.containers import Container
from webapp.services import FlightsService
from pydantic import Required
from webapp.validators.requests_validator import RequestsValidator

router = APIRouter()

# Get flights by parameters
@router.get("/flights/", status_code=200)
@inject
def get_flights_by_parmas(
                        flights_service: FlightsService = Depends(Provide[Container.flights_service]),
                        origin_display_name:      str = Query(default = Required, min_length=3, max_length=50),
                        destination_display_name: str = Query(default = Required, min_length=3, max_length=50),
                        departure_date:           str = Query(default = Required),
                        ):

    print('date=',departure_date)

    # TODO: Figure out how to send self/how to validate it (in the repository)
    # Validate query parameters
    # try:
    #     RequestsValidator.validate_get_flights_by_parmas(origin_display_name=origin_display_name, destination_display_name=destination_display_name,
    #                                                     departure_time=departure_time, landing_time=landing_time)
    # except InvalidParametersWereProvidedInRequestException as e:
    #     # TODO: Replace later with our own custom exception handler
    #     #       that will return a custom response (& status code) based on the exception type
    #     return {'error': e.message}

    # except AirportNotFoundException as e:
    #     # TODO: Replace later with our own custom exception handler
    #     #       that will return a custom response (& status code) based on the exception type
    #     return {'error': e.message}

    return flights_service.get_flights_by_params(origin_display_name, destination_display_name, departure_date)


# Get the specific flights for the specified flight ID
@router.post("/flights/{flight_id}/", status_code=200)
@inject
def book_flight_by_flight_id(flight_id: int,
                            flights_service: FlightsService =
                            Depends(Provide[Container.flights_service])):
    return flights_service.book_flight_by_flight_id(flight_id)

# Delete the specific flight from the database by flight ID
@router.delete("/flights/{flight_id}/", status_code=204)
@inject
def delete_flight_by_flight_id(flight_id: int,
                                flights_service: FlightsService =
                                Depends(Provide[Container.flights_service])):
    return flights_service.delete_flight_by_flight_id(flight_id)
