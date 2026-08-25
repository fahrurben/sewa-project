from rest_framework import serializers
from sewa.models.upload_image_model import UploadImageModel


class UploadImageSerializer(serializers.ModelSerializer[UploadImageModel]):

    class Meta:
        model = UploadImageModel
        fields = ('id', 'image', 'filename')
