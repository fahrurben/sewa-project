from rest_framework import serializers
from sewa.models import Application, ApplicationStatus, Property
from sewa.serializers import UserSerializer, PropertySerializer
from dateutil.relativedelta import relativedelta

from sewa.services.application_service import create_application, update_status


class ApplicationSerializer(serializers.ModelSerializer):
    id = serializers.IntegerField(read_only=True)
    requestor_id = serializers.BigIntegerField(read_only=True)
    requestor = UserSerializer(read_only=True)
    property_id = serializers.BigIntegerField()
    property = PropertySerializer(read_only=True)
    lease_end = serializers.DateField(required=False, allow_null=True)
    monthly_lease_rent = serializers.DecimalField(max_digits=10, decimal_places=2, required=False, allow_null=True, read_only=True)
    deposit_amount = serializers.DecimalField(max_digits=10, decimal_places=2, required=False, allow_null=True, read_only=True)
    status = serializers.ChoiceField(choices=ApplicationStatus.choices, read_only=True)
    status_label = serializers.CharField(source='get_status_display', read_only=True)

    class Meta:
        model = Application
        fields = '__all__'

    def create(self, validated_data):
        current_user = self.context['user']
        application = create_application(current_user, validated_data)

        return application

    def update(self, instance, validated_data):
        current_user = self.context['user']

        property = Property.objects.get(id=validated_data.get("property_id"))

        instance.lease_start = validated_data.get("lease_start")
        instance.lease_end = validated_data.get("lease_start") + relativedelta(months=validated_data.get("duration"))
        instance.monthly_lease_rent = property.rental_cost
        instance.deposit_amount = property.deposit_amount

        instance.save()

        return instance

