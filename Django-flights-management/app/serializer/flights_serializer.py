from rest_framework import serializers
from ..models import Flight

"""
Serializers to turn queryset objects to JSON data structures
"""

class FlightsSerializer(serializers.ModelSerializer):
    class Meta:
        model = Flight

        # Which fields should be included in the parsed data?
        # Perhaps you would like to exclude some fields?
        fields = (
            'origin_airport',
            'destination_airport',
            'departure_time',
            'landing_time',
            'remaining_tickets',
            'ticket_economy_price',
        )
