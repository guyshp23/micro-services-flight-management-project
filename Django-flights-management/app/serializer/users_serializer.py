from rest_framework import serializers
from app.models import User

"""
Serializers to turn queryset objects to JSON data structures
"""

class UsersSerializer(serializers.ModelSerializer):
    class Meta:
        model = User

        # Which fields should be included in the parsed data?
        # Perhaps you would like to exclude some fields?
        fields = (
            'id',
            'username',
        )
