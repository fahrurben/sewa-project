from rest_framework import serializers

from sewa.models import Regency


class RegencySerializer(serializers.ModelSerializer):

    class Meta:
        model = Regency
        fields = '__all__'