import stripe
import os

from sewa.models import TransactionType, ApplicationStatus
from sewa.models.user import User
from sewa.models.application import Application
from rest_framework.exceptions import AuthenticationFailed


def create_checkout_session(current_user: User, application: Application):
    FRONTEND_BASE_URL = os.getenv("FRONTEND_BASE_URL")

    if application.requestor != current_user:
        raise AuthenticationFailed("Unauthorized, you don't have permission to do such action")
    if application.status != ApplicationStatus.PENDING_PAYMENT:
        raise Exception(
            "Wrong application status, cannot checkout the application with status not pending pending payment")

    sub_total = application.monthly_lease_rent
    sub_total += application.deposit_amount if application.property.is_deposit_required else 0

    sub_total_in_cents = int(sub_total * 100)

    line_items = [
        {
            'price_data': {
                'currency': 'idr',
                'unit_amount': sub_total_in_cents,
                'product_data': {
                    'name': "Down payment for lease rent of " + application.property.name,
                },
            },
            'quantity': 1,
        },
    ]

    checkout_session = stripe.checkout.Session.create(
        line_items=line_items,
        mode='payment',  # Use 'subscription' for recurring payments
        success_url=FRONTEND_BASE_URL + '/success/',
        cancel_url=FRONTEND_BASE_URL + '/cancel/',
        metadata={
            'transaction_type': TransactionType.DP,
            'transaction_id': application.id,
        }
    )
    return checkout_session.url
