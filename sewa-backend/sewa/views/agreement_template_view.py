from rest_framework import viewsets
from rest_framework.decorators import action, permission_classes
from rest_framework.permissions import DjangoModelPermissions, IsAuthenticated
from rest_framework.parsers import MultiPartParser, FormParser
from rest_framework.response import Response

from sewa.models import AgreementTemplate
from sewa.serializers import AgreementTemplateSerializer


class AgreementTemplateView(viewsets.ModelViewSet[AgreementTemplate]):
    serializer_class = AgreementTemplateSerializer
    queryset = AgreementTemplate.objects.all()
    permission_classes = [DjangoModelPermissions]
    parser_classes = [MultiPartParser, FormParser]

    def get_permissions(self):
        if self.action in ['get_all']:
            permission_classes = [IsAuthenticated]
        else:
            permission_classes = [DjangoModelPermissions]
        return [permission() for permission in permission_classes]

    def get_serializer_context(self):
        context = super().get_serializer_context()
        context.update({'user': self.request.user})
        return context

    def get_queryset(self):
        return AgreementTemplate.objects.filter(author=self.request.user).order_by('title')

    @action(detail=False, methods=['get'])
    def get_all(self, request):
        data = AgreementTemplate.objects.filter(author=request.user).order_by('title').all()
        serializer = AgreementTemplateSerializer(instance=data, many=True)
        return Response(serializer.data)
