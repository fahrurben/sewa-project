from rest_framework import serializers
from django.db import transaction

from sewa.models.property import Property, PropertyImage
from sewa.serializers.agreement_template_serializer import AgreementTemplateSerializer
from sewa.serializers.user_serializer import UserSerializer

class PropertyImageSerializer(serializers.ModelSerializer):
    id = serializers.IntegerField(allow_null=True, required=False)

    class Meta:
        model = PropertyImage
        fields = (
            'id',
            'filename',
        )


class PropertySerializer(serializers.ModelSerializer):
    id = serializers.IntegerField(read_only=True)
    owner_id = serializers.IntegerField(read_only=True)
    owner = UserSerializer(read_only=True)
    agreement_template_id = serializers.BigIntegerField(write_only=True)
    agreement_template = AgreementTemplateSerializer(read_only=True)
    images = PropertyImageSerializer(many=True)

    class Meta:
        model = Property
        fields = (
            'id',
            'owner_id',
            'owner',
            'name',
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

    @transaction.atomic
    def create(self, validated_data):
        current_user = self.context['user']

        images = validated_data.pop('images', [])

        created_obj = Property.objects.create(owner=current_user, **validated_data)

        for image in images:
            PropertyImage.objects.create(property=created_obj, filename=image["filename"])

        return created_obj

    @transaction.atomic
    def update(self, instance, validated_data):
        images = validated_data.pop('images', [])

        for key, value in validated_data.items():
            setattr(instance, key, value)

        instance.save(update_fields=validated_data.keys())

        # Update images
        existing_image_ids = instance.images.all().values_list('id', flat=True)
        update_image_ids = [image.get('id') for image in images]
        deleted_image_ids = set(existing_image_ids).difference(set(update_image_ids))

        if images:
            for image_datum in images:
                if image_datum.get('id') is None:
                    PropertyImage.objects.create(property=instance, **image_datum)
                else:
                    PropertyImage.objects.filter(id=image_datum.get('id')).update(**image_datum)

        if len(deleted_image_ids) > 0:
            PropertyImage.objects.filter(id__in=list(deleted_image_ids)).delete()

        return instance