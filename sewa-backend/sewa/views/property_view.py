from rest_framework import viewsets
from rest_framework.permissions import DjangoModelPermissionsOrAnonReadOnly
from rest_framework.decorators import action
from rest_framework.parsers import MultiPartParser, FormParser
from rest_framework.pagination import LimitOffsetPagination

from sewa.models import Property
from sewa.serializers import PropertySerializer
from rest_framework.response import Response

class PropertyView(viewsets.ModelViewSet[Property]):
    serializer_class = PropertySerializer
    queryset = Property.objects.all()
    permission_classes = [DjangoModelPermissionsOrAnonReadOnly]

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

    @action(detail=False, methods=['get'])
    def search(self, request):
        query_set = Property.objects.order_by('name')

        province_id = self.request.GET.get('province_id')
        regency_id = self.request.GET.get('regency_id')
        lease_rent_min = self.request.GET.get('lease_rent_min')
        lease_rent_max = self.request.GET.get('lease_rent_max')

        if province_id:
            query_set = query_set.filter(province_id=province_id)
        if regency_id:
            query_set = query_set.filter(regency_id=regency_id)
        if lease_rent_min:
            query_set = query_set.filter(rental_cost__gte=lease_rent_min)
        if lease_rent_max:
            query_set = query_set.filter(rental_cost__tte=lease_rent_max)

        paginator = LimitOffsetPagination()
        page = paginator.paginate_queryset(query_set, request)

        serializer = PropertySerializer(page, many=True)
        return paginator.get_paginated_response(serializer.data)
