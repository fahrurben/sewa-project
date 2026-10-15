import stripe
from django.conf import settings
from django.shortcuts import redirect
import os
from django.shortcuts import get_object_or_404
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status

from sewa.models import Application
from sewa.services.checkout_service import create_checkout_session

class CreateCheckoutSessionView(APIView):
    # authentication_classes = [Authenticated]
    permission_classes = [IsAuthenticated]

    def post(self, request, application_id):
        application = get_object_or_404(Application, id=application_id)

        try:
            checkout_session_url = create_checkout_session(current_user=request.user, application=application)
            return Response({"status": "success", "checkout_url": checkout_session_url})
        except Exception as e:
            return Response(
                {
                    "success": False,
                    "error": "A severe server error occurred.",
                    "code": "server_error"
                },
                status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )