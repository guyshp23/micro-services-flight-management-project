from rest_framework.views import APIView, Response
from ..services import flights_service

class GetFlightByParams(APIView):
    def get(self, request):
        """
        Get all flights that match the given parameters.

        Params (in request):
            - origin_display_name:      The "display_name"   field in Airport.
            - destination_display_name: The "display_name"   field in Airport.
            - departure_time:           The "departure_time" field in Flight.
            - landing_time:             The "landing_time"   field in Flight.

            Times are in the following format: "YYYY-MM-DD", for example: "2020-12-31".

        Returns:
            - The flights that match the given parameters.

        Raises:
            - Exception: If a general error occurred in the flights service.
        """

        # Get the parameters from the request.
        origin_display_name      = request.GET.get("origin_display_name",      None)
        destination_display_name = request.GET.get("destination_display_name", None)
        departure_time           = request.GET.get("departure_time",           None)
        landing_time             = request.GET.get("landing_time",             None)

        try:
            flights = flights_service.get_by_params(origin_display_name, destination_display_name,
                                                    departure_time,      landing_time)

            # Return the flights that match the given parameters.
            return Response(flights, status=200)
        except Exception as e:
            # Return the error message.
            # TODO: Tranform this to a custom error handling function that will convert this to a formated error message.
            return Response(str(e), status=400)

