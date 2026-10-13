import os
from typing import Any, Dict

from dateutil.relativedelta import relativedelta
from django.core.mail import EmailMultiAlternatives
from django.template.loader import render_to_string
from django.utils.html import strip_tags
from rest_framework.reverse import reverse
from django.db import transaction
from rest_framework.exceptions import ValidationError

from rest_framework.exceptions import AuthenticationFailed
from sewa.models import Property, Application, ApplicationStatus


@transaction.atomic
def create_application(current_user, data: Dict[str, Any]) -> Application:
    property = Property.objects.get(id=data.get("property_id"))

    obj = Application(**data)
    obj.requestor = current_user
    obj.lease_end = data.get("lease_start") + relativedelta(months=data.get("duration"))
    obj.monthly_lease_rent = property.rental_cost
    obj.deposit_amount = property.deposit_amount
    obj.status = ApplicationStatus.REQUESTED

    obj.save()

    send_application_request_email(obj)

    return obj


@transaction.atomic
def update_status(current_user, application: Application, status_val: ApplicationStatus,
                  reject_reason: str = "") -> bool:
    allowed_status = [ApplicationStatus.PENDING_PAYMENT, ApplicationStatus.REJECTED]

    if application.property.owner != current_user:
        raise AuthenticationFailed("Unauthorized, you don't have permission to do such action")

    if status_val is None or status_val not in allowed_status:
        raise ValidationError({"status": "wrong status"})

    if application.status != ApplicationStatus.REQUESTED:
        raise ValidationError({"status": "cannot update, application already approved/rejected"})

    application.status = status_val

    if status_val == ApplicationStatus.REJECTED:
        application.reject_reason = reject_reason

    application.save()
    return True


def send_application_request_email(application):
    noreply_email = os.getenv("NO_REPLY_EMAIL")
    landlord = application.property.owner

    # Set up email metadata
    subject = "New application request received"
    from_email = noreply_email
    to_email = [landlord.email]

    # Context data to pass into the HTML template
    context = {
        "application": application,
    }

    # Render the HTML template into a string string
    html_content = render_to_string("emails/application_request_template.html", context)

    # Strip HTML tags to create a backup plain text version
    text_content = strip_tags(html_content)

    # Create the email instance with the plain text version
    email = EmailMultiAlternatives(
        subject=subject,
        body=text_content,
        from_email=from_email,
        to=to_email
    )

    # Attach the HTML alternative version
    email.attach_alternative(html_content, "text/html")

    # Send the email
    email.send()
