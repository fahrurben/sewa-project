from rest_framework import viewsets, mixins

from sewa.models import Regency
from sewa.serializers import RegencySerializer
from rest_framework.permissions import DjangoModelPermissionsOrAnonReadOnly


class RegencyView(mixins.ListModelMixin,
                  viewsets.GenericViewSet):

    model = Regency
    serializer_class = RegencySerializer
    permission_classes = [DjangoModelPermissionsOrAnonReadOnly]
    pagination_class = None

    def get_queryset(self):
        province_id = self.request.GET.get('province_id')
        query_set = Regency.objects.filter(province_id=province_id).order_by('name')
        return query_set
