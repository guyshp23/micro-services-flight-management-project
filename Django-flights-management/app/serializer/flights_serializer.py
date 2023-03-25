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

    # Consider making multiple functions for each field 
    # (validate_origin_airport, validate_destination_airport, etc.)
    def validate(self, data):
        """
        Validate the data before saving it to the DB.

        Args:
            data (dict): The data to validate.

        Raises:
            ValidationError: If the data is invalid.

        Returns:
            dict: The validated data.
        """
        # Validate the data
        if data['remaining_tickets'] < 0:
            raise serializers.ValidationError('Remaining tickets cannot be negative')
        
        if data['ticket_economy_price'] < 0:
            raise serializers.ValidationError('Ticket economy price cannot be negative')
        
        if data['departure_time'] > data['landing_time']:
            raise serializers.ValidationError('Departure time cannot be after landing time')
        
        if data['departure_time'] == data['landing_time']:
            raise serializers.ValidationError('Departure time cannot be the same as landing time')
        
        if data['origin_airport'] == data['destination_airport']:
            raise serializers.ValidationError('Origin airport cannot be the same as destination airport')
        
        if data['origin_airport'] == None:
            raise serializers.ValidationError('Origin airport cannot be empty')
        
        if data['destination_airport'] == None:
            raise serializers.ValidationError('Destination airport cannot be empty')
        
        if data['departure_time'] == None:
            raise serializers.ValidationError('Departure time cannot be empty')
        
        if data['landing_time'] == None:
            raise serializers.ValidationError('Landing time cannot be empty')

        return data
