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
        query_set = Property.objects.filter(owner=self.request.user).order_by('name')

        province_param = self.request.GET.get('province')
        city_param = self.request.GET.get('city')
        min_param = self.request.GET.get('min')
        max_param = self.request.GET.get('max')

        if city_param:
            query_set = query_set.filter(city=city_param)
        elif province_param:
            query_set = query_set.filter(province=province_param)

        if min_param:
            query_set = query_set.filter(rental_cost__gte=min_param)

        if max_param:
            query_set = query_set.filter(rental_cost__lte=max_param)

        return query_set