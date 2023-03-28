from app.models import Airport
from rest_framework.views import APIView
from rest_framework.response import Response
from app.serializer.airport_serializer import AirportSerializer
from app.services.flights_service import FlightService
from rest_framework import mixins, generics

class GetAllAirportLocations(APIView):
    serializer_class = AirportSerializer

    def get(self, request):
        # Get the query param
        query = request.GET.get("query", None)

        try:
            airports   = FlightService.get_all_airports_display_name_by_query(self, query)
            serializer = self.serializer_class(airports, many=True)

            return Response(serializer.data, status=200)
        except Exception as e:
            return Response(str(e), status=500)


class AirportsCreateAndList(mixins.ListModelMixin, 
                      mixins.CreateModelMixin,
                      mixins.DestroyModelMixin,
                      generics.GenericAPIView):
    
    queryset = Airport.objects.all()
    serializer_class = AirportSerializer

    def get(self, request, *args, **kwargs):
        return self.list(request, *args, **kwargs)

    def post(self, request, *args, **kwargs):
        return self.create(request, *args, **kwargs)

class AirportsGetByIDUpdateDelete( mixins.RetrieveModelMixin,
                                  mixins.DestroyModelMixin,
                                  mixins.UpdateModelMixin,
                                  generics.GenericAPIView):

    def get(self, request, *args, **kwargs):
        return self.retrieve(request, *args, **kwargs)

    def put(self,request, *args , **kwargs):
        return self.update(request, *args, **kwargs)
    
    def delete(self, request, *args, **kwargs):
        return self.destroy(request, *args, **kwargs)
