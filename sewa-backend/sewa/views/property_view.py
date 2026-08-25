from rest_framework import viewsets
from rest_framework.permissions import DjangoModelPermissions
from rest_framework.parsers import MultiPartParser, FormParser

from sewa.models import Property
from sewa.serializers import PropertySerializer

class PropertyView(viewsets.ModelViewSet[Property]):
    serializer_class = PropertySerializer
    queryset = Property.objects.all()
    permission_classes = [DjangoModelPermissions]

    def get_serializer_context(self):
        context = super().get_serializer_context()
        context.update({'user': self.request.user})
        return context

    def get_queryset(self):
        return Property.objects.filter(owner=self.request.user).order_by('name')