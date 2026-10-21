from rest_framework import viewsets
from rest_framework.decorators import action
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response

from sewa.models import Renter
from sewa.models.user import UserRole
from sewa.serializers.renter_serializer import RenterSerializer


class RenterView(viewsets.ModelViewSet[Renter]):
    serializer_class = RenterSerializer
    queryset = Renter.objects.all()
    permission_classes = [IsAuthenticated]

    def get_serializer_context(self):
        context = super().get_serializer_context()
        context.update({'user': self.request.user})
        return context

    def get_queryset(self):
        q = Renter.objects
        if self.request.user.role == UserRole.TENANT:
            q = q.filter(renter=self.request.user)

        q = q.order_by('-created_at')
        return q