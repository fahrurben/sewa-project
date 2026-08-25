from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import IsAuthenticated

from sewa.models.upload_image_model import UploadImageModel
from sewa.serializers.upload_image_serializer import UploadImageSerializer


class ImageUploadView(APIView):
    # authentication_classes = [Authenticated]
    permission_classes = [IsAuthenticated]

    def post(self, request):
        qs_serializer = UploadImageSerializer(data=request.data, context={'request': request})
        if qs_serializer.is_valid():
            instance = qs_serializer.save()
            serializer = UploadImageSerializer(instance=instance)
            return Response(serializer.data, status=status.HTTP_200_OK)
        else:
            return Response({
                'message': qs_serializer.errors,
                'data': None
            },status=status.HTTP_400_BAD_REQUEST)