from django.shortcuts import get_object_or_404
from rest_framework import viewsets
from rest_framework.decorators import action
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response


from sewa.models import Application, ApplicationStatus
from sewa.models.user import UserRole
from sewa.serializers import ApplicationSerializer
from sewa.services.application_service import update_status


class ApplicationView(viewsets.ModelViewSet[Application]):
    serializer_class = ApplicationSerializer
    queryset = Application.objects.all()
    permission_classes = [IsAuthenticated]

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

    @action(detail=True, methods=['post'])
    def update_status(self, request, pk=None):
        status_val = request.POST.get("status")
        reject_reason = request.POST.get("reject_reason")
        application = get_object_or_404(Application, id=pk)
        update_status(request.user, application, status_val, reject_reason)

        return Response({"status": "success"})
