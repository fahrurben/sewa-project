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
