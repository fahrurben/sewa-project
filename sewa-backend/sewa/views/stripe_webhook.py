import os

import stripe
from django.contrib.auth import get_user_model
from django.http import HttpResponse
from rest_framework import status
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import AllowAny
from rest_framework.response import Response

from config.wsgi import application
from sewa.models import Application, ApplicationStatus, TransactionType
from sewa.services.application_service import create_renter

User = get_user_model()


@api_view(['POST'])
@permission_classes([AllowAny])
def stripe_webhook(request):
    payload = request.body
    STRIPE_WEBHOOK_SECRET = os.getenv("STRIPE_WEBHOOK_SECRET")

    sig_header = request.META.get('HTTP_STRIPE_SIGNATURE')
    event = None

    try:
        event = stripe.Webhook.construct_event(
            payload, sig_header, STRIPE_WEBHOOK_SECRET
        )
    except ValueError as exception:
        # Invalid payload
        return Response(
            {
                "success": False,
                "error": "A severe server error occurred.",
                "code": "server_error"
            },
            status=status.HTTP_500_INTERNAL_SERVER_ERROR
        )
    except stripe.error.SignatureVerificationError as exception:
        # Invalid signature
        return Response(
            {
                "success": False,
                "error": "A severe server error occurred.",
                "code": "server_error"
            },
            status=status.HTTP_500_INTERNAL_SERVER_ERROR
        )

    # Handle the checkout.session.completed event
    if event['type'] == 'checkout.session.completed':
        session_data = event['data']['object'].to_dict()

        # Fulfill the purchase using metadata passed earlier
        transaction_type = session_data.get('metadata', {}).get('transaction_type')
        transaction_id = session_data.get('metadata', {}).get('transaction_id')
        if transaction_type == TransactionType.DP:
            application = Application.objects.get(id=transaction_id)
            application.status = ApplicationStatus.PAID
            application.save()

            create_renter(application)

    return Response({"status": "success"})
