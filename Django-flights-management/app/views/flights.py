from rest_framework.views  import APIView, Response
from app.exceptions.factory import ExceptionsFactory
from app.services.flights_service import FlightService
from app.models import Flight
from app.serializer.flights_serializer import FlightsSerializer
from rest_framework import mixins, generics


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
        departure_date           = request.GET.get("departure_date",           None)

        # try:
        flights = FlightService.get_by_params(request, origin_display_name,
                                                            destination_display_name,
                                                            departure_date)
        # serializer = self.serializer_class(flights, many=True)


        # Return the flights that match the given parameters.
        return Response(flights, status=200)
        # except Exception as e:
            # Return the error message.
            # return ExceptionsFactory.handle(e)

class FlightsCRUD(mixins.ListModelMixin,
                      mixins.RetrieveModelMixin,
                      mixins.DestroyModelMixin,
                      mixins.UpdateModelMixin,
                      generics.GenericAPIView):
    
    queryset = Flight.objects.all()
    serializer_class = FlightsSerializer

    def get(self, request, *args, **kwargs):
        return self.retrieve(request, *args, **kwargs)

    def put(self,request, *args , **kwargs):
        return self.update(request, *args, **kwargs)

    def delete(self, request, *args, **kwargs):
        return self.destroy(request, *args, **kwargs)
