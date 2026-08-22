from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework.request import Request

from rest_framework import status

from sewa.models.user import UserRole
from sewa.serializers.register_serializer import RegisterSerializer
from sewa.serializers.user_serializer import UserSerializer
from sewa.services.register_service import register


@api_view(['POST'])
def register_view(request: Request, role: str):
    serializer = RegisterSerializer(data=request.data)

    if UserRole(role) == UserRole.ADMIN:
        return Response(
            {"error": "Wrong role input"},
            status=status.HTTP_400_BAD_REQUEST,
        )

    if serializer.is_valid():
        data = serializer.validated_data
        user = register(request, data, role=UserRole(role))
        user_serializer = UserSerializer(instance=user)

        return Response(user_serializer.data, status=status.HTTP_200_OK)
    else:
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)