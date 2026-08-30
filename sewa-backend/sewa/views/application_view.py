from rest_framework import viewsets
from rest_framework.permissions import IsAuthenticated
from rest_framework.parsers import MultiPartParser, FormParser

from sewa.models import Application
from sewa.models.user import UserRole
from sewa.serializers import ApplicationSerializer

class ApplicationView(viewsets.ModelViewSet[Application]):
    serializer_class = ApplicationSerializer
    queryset = Application.objects.all()
    permission_classes = [IsAuthenticated]
    parser_classes = [MultiPartParser, FormParser]

    def get_serializer_context(self):
        context = super().get_serializer_context()
        context.update({'user': self.request.user})
        return context

    def get_queryset(self):
        q = Application.objects
        if self.request.user.role == UserRole.ADMIN:
            q = Application.objects
        if self.request.user.role == UserRole.LANDLORD:
            q = q.filter(property__owner=self.request.user)
        else:
            q = q.filter(requestor=self.request.user)

        q = q.order_by('-created_at')
        return q
