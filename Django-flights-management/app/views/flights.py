from rest_framework.views  import APIView, Response

from app.exceptions.factory import ExceptionsFactory
from ..exceptions.model_not_found import ModelNotFoundException
from ..facades.base_facade import BaseFacade
from ..serializer.flights_serializer import FlightsSerializer


class GetFlightsByParams(APIView):
    """
    Get all flights that match the given parameters.

    Params (in request):
        - origin_display_name:      The "display_name"   field in Airport.
        - destination_display_name: The "display_name"   field in Airport.
        - departure_time:           The "departure_time" field in Flight.
        - landing_time:             The "landing_time"   field in Flight.

        Times are in the following format: "YYYY-MM-DD", for example: "2020-12-31".

    Raises:
        - Exception: If a general error occurred in the flights service.

    Returns:
        - The flights that match the given parameters.
    """
    serializer_class = FlightsSerializer

    def get(self, request):

        # Get the parameters from the request.
        origin_display_name      = request.GET.get("origin_display_name",      None)
        destination_display_name = request.GET.get("destination_display_name", None)
        departure_time           = request.GET.get("departure_time",           None)
        landing_time             = request.GET.get("landing_time",             None)

        try:
            flights    = BaseFacade.get_flights_by_parameters(request, origin_display_name,
                                                              destination_display_name,
                                                              departure_time, landing_time)
            serializer = self.serializer_class(flights, many=True)


            # Return the flights that match the given parameters.
            return Response(serializer.data, status=200)
        except Exception as e:
            # Return the error message.
            return ExceptionsFactory.handle(e)

class GetFlightDetailsByID(APIView):
    """
    Get flight details by ID

    Params:
        - id: The flight ID

    Raises:
        - NotFoundException: Flight ID is not found in DB, a flight with that ID doesn't exist

    Returns:
        - The flight details object
    
    """
    serializer_class = FlightsSerializer

    def get(self, request, flight_id):

        try:
            flight_details = BaseFacade.get_flight_by_id(self, flight_id)
            serializer     = self.serializer_class(flight_details)


            return Response(serializer.data, status=200)

        except ModelNotFoundException as e:
            return ExceptionsFactory.handle(e)
        except Exception as e:
            return ExceptionsFactory.handle(e)