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


    def validate_remaining_tickets(self, value):
        if value < 0:
            raise serializers.ValidationError('Remaining tickets cannot be negative')

        if value == None:
            raise serializers.ValidationError('Remaining tickets cannot be empty')


    def validate_ticket_economy_price(self, value):
        if value < 0:
            raise serializers.ValidationError('Ticket economy price cannot be negative')


    def validate_departure_time(self, value):
        if value > self.values('landing_time'):
            raise serializers.ValidationError('Departure time cannot be after landing time')

        if value == self.values('landing_time'):
            raise serializers.ValidationError('Departure time cannot be the same as landing time')
        
        if value == None:
            raise serializers.ValidationError('Departure time cannot be empty')


    def validate_landing_time(self, value):
        if value < self.values('departure_time'):
            raise serializers.ValidationError('Landing time cannot be before departure time')

        if value == self.values('departure_time'):
            raise serializers.ValidationError('Landing time cannot be the same as departure time')
        
        if value == None:
            raise serializers.ValidationError('Departure time cannot be empty')


    def validate_origin_airport(self, value):
        if value == None:
            raise serializers.ValidationError('Origin airport cannot be empty')

        if value == self.values('destination_airport'):
            raise serializers.ValidationError('Origin airport cannot be the same as destination airport')


    def validate_destination_airport(self, value):
        if value == None:
            raise serializers.ValidationError('Destination airport cannot be empty')

        if value == self.values('origin_airport'):
            raise serializers.ValidationError('Destination airport cannot be the same as origin airport')


