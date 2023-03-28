from rest_framework import serializers
from ..models import Ticket

"""
Serializers to turn queryset objects to JSON data structures
"""

class TicketsSerializer(serializers.ModelSerializer):
    class Meta:
        model = Ticket

        # Which fields should be included in the parsed data?
        # Perhaps you would like to exclude some fields?
        fields = (
            'flight',
            'customer'
        )
