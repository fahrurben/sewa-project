from rest_framework import viewsets
from rest_framework.permissions import DjangoModelPermissions
from rest_framework.parsers import MultiPartParser, FormParser

from sewa.models import AgreementTemplate
from sewa.serializers import AgreementTemplateSerializer


class AgreementTemplateView(viewsets.ModelViewSet[AgreementTemplate]):
    serializer_class = AgreementTemplateSerializer
    queryset = AgreementTemplate.objects.all()
    permission_classes = [DjangoModelPermissions]
    parser_classes = [MultiPartParser, FormParser]

    def get_serializer_context(self):
        context = super().get_serializer_context()
        context.update({'user': self.request.user})
        return context

    def get_queryset(self):
        return AgreementTemplate.objects.filter(author=self.request.user).order_by('title')
