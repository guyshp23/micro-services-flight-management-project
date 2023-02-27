from fastapi import APIRouter, Depends, Request
from dependency_injector.wiring import inject, Provide
from .containers import Container
from .services import FlightsService

router = APIRouter()


# Get flights by parameters
@router.get("/flights/", status_code=200, response_class='application/json')
@inject
def get_flights_by_parmas(request: Request, flights_service: FlightsService =
                      Depends(Provide[Container.flights_service])):
    return flights_service.get_flights_by_params(request)

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
