from rest_framework import serializers
from app.models import Customer

"""
Serializers to turn queryset objects to JSON data structures
"""

class CustomerSerializer(serializers.ModelSerializer):
    class Meta:
        model = Customer

        # Which fields should be included in the parsed data?
        # Perhaps you would like to exclude some fields?
        fields = '__all__'
