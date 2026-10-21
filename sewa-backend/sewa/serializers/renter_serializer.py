from rest_framework import serializers

from sewa.models import Renter
from sewa.serializers import UserSerializer, PropertySerializer


class RenterSerializer(serializers.ModelSerializer):
    id = serializers.IntegerField(read_only=True)
    property_id = serializers.BigIntegerField()
    property = PropertySerializer(read_only=True)
    renter_id = serializers.BigIntegerField(read_only=True)
    renter = UserSerializer(read_only=True)

    class Meta:
        model = Renter
        fields = '__all__'