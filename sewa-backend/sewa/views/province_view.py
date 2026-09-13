from rest_framework import viewsets, mixins

from sewa.models import Province
from sewa.serializers import ProvinceSerializer
from rest_framework.permissions import DjangoModelPermissionsOrAnonReadOnly


class ProvinceView(mixins.ListModelMixin,
                   viewsets.GenericViewSet):

    model = Province
    queryset = Province.objects.all()
    serializer_class = ProvinceSerializer
    permission_classes = [DjangoModelPermissionsOrAnonReadOnly]
    pagination_class = None
