from typing import Any, Dict
from rest_framework import serializers

from sewa.models.user import User, IdType, GenderType

class RegisterSerializer(serializers.Serializer):
    email = serializers.EmailField(max_length=255)
    password = serializers.CharField(max_length=50)
    first_name = serializers.CharField(max_length=255)
    last_name = serializers.CharField(max_length=255)
    id_type = serializers.ChoiceField(choices=IdType.choices)
    id_number = serializers.CharField(max_length=16)
    gender = serializers.ChoiceField(choices=GenderType.choices)
    birthday = serializers.DateField()
    province = serializers.CharField(max_length=5)
    city = serializers.CharField(max_length=5)

    def validate_email(self, value):
        is_exists = User.objects.filter(email__iexact=value).exists()
        if is_exists:
            raise serializers.ValidationError("Email already registered")
        return value