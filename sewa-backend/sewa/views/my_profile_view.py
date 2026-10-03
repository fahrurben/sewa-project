from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework import status
from rest_framework.request import Request
from rest_framework.response import Response

from sewa.serializers import UserSerializer

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def my_profile_view(request: Request):
    current_user = request.user
    serializer = UserSerializer(instance=current_user)
    return Response(serializer.data, status=status.HTTP_200_OK)

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def update_profile_view(request: Request):
    current_user = request.user
    serializer = UserSerializer(data=request.data)

    if serializer.is_valid():
        user_data = serializer.validated_data
        current_user.first_name = user_data.get('first_name')
        current_user.last_name = user_data.get('last_name')
        current_user.id_type = user_data.get('id_type')
        current_user.id_number = user_data.get('id_number')
        current_user.gender = user_data.get('gender')
        current_user.birthday = user_data.get('birthday')
        current_user.province = user_data.get('province')
        current_user.city = user_data.get('city')
        current_user.save()

        response_serializer = UserSerializer(instance=current_user)
        return Response(response_serializer.data, status=status.HTTP_200_OK)
    else:
        return Response({
            'message': serializer.errors,
            'data': None
        }, status=status.HTTP_400_BAD_REQUEST)
