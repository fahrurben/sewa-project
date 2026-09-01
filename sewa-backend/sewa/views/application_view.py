from django.shortcuts import get_object_or_404
from rest_framework import viewsets
from rest_framework.decorators import action
from rest_framework.permissions import IsAuthenticated
from rest_framework.parsers import MultiPartParser, FormParser
from rest_framework.response import Response
from rest_framework import status


from sewa.models import Application, ApplicationStatus
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

    @action(detail=True, methods=['post'])
    def update_status(self, request, pk=None):
        allowed_status = [ApplicationStatus.ACCEPTED, ApplicationStatus.REJECTED]
        status_val = request.POST.get("status")
        reject_reason = request.POST.get("reject_reason")

        application = get_object_or_404(Application, id=pk)

        if application.property.owner != request.user:
            return Response(
                {"error": "Entity Not found"},
                status=status.HTTP_404,
            )

        if status_val is None and status_val not in allowed_status:
            return Response(
                {"error": "Invalid status"},
                status=status.HTTP_400_BAD_REQUEST,
            )

        if application.status != ApplicationStatus.REQUESTED:
            return Response(
                {"error": "Cannot approve or reject again"},
                status=status.HTTP_400_BAD_REQUEST,
            )

        application.status = status_val

        if status_val == ApplicationStatus.REJECTED:
            application.reject_reason = reject_reason

        application.save()

        return Response({"status": "success"})
