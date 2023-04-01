from rest_framework import serializers
from ..models import Airport

class AirportSerializer(serializers.ModelSerializer):
    # country_code = serializers.CharField(source='get_country_code_by_country_name')

    class Meta:
        model  = Airport

        # read_only_fields = (
        #     'country_code',
        #     )

        fields = ['id', 'display_name',
                #    'country_code'
                   ]
