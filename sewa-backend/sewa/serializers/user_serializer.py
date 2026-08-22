from rest_framework import serializers

from sewa.models.user import User


class UserSerializer(serializers.ModelSerializer):

    class Meta:
        model = User
        fields = (
            'id',
            'email',
            'first_name',
            'last_name',
            'full_name',
            'id_type',
            'id_number',
            'gender',
            'birthday',
            'province',
            'city',
        )
