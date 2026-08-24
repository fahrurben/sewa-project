from rest_framework import serializers

from sewa.models.property import Property, PropertyImage
from sewa.serializers.agreement_template_serializer import AgreementTemplateSerializer
from sewa.serializers.user_serializer import UserSerializer

class PropertyImageSerializer(serializers.ModelSerializer):
    id = serializers.IntegerField(read_only=True)

    class Meta:
        model = PropertyImage
        fields = (
            'id',
            'property_id',
            'filename',
        )


class PropertySerializer(serializers.ModelSerializer):
    id = serializers.IntegerField(read_only=True)
    owner = UserSerializer(read_only=True)
    agreement_template = AgreementTemplateSerializer(read_only=True)
    images = PropertyImageSerializer(many=True, required=False)

    class Meta:
        model = Property
        fields = (
            'id',
            'owner_id',
            'owner',
            'description',
            'province',
            'city',
            'district',
            'sub_district',
            'postal_code',
            'longitude',
            'latitude',
            'type',
            'furnishing_type',
            'land_area',
            'building_area',
            'total_rooms',
            'total_bathrooms',
            'rental_cost_type',
            'rental_cost',
            'is_deposit_required',
            'deposit_amount',
            'agreement_template_id',
            'agreement_template',
            'images',
            'status',
        )
