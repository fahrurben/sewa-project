from typing import Any, Dict
import random
import string
from sewa.models.user import User, UserRole
import os
from dotenv import load_dotenv

from django.core.mail import EmailMultiAlternatives
from django.template.loader import render_to_string
from django.utils.html import strip_tags

from rest_framework.reverse import reverse


def generate_verification_code() -> str:
    # Pool of characters: abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789
    characters = string.ascii_letters + string.digits

    # Randomly select 'n' characters and join them into a single string
    return ''.join(random.choices(characters, k=10))


def register(request, data: Dict[str, Any], role: UserRole) -> User:
    verification_code = generate_verification_code()

    user = User.objects.create_user(
        email=data.get('email'),
        password=data.get('password'),
        first_name=data.get('first_name'),
        last_name=data.get('last_name'),
        id_type=data.get('id_type'),
        id_number=data.get('id_number'),
        gender=data.get('gender'),
        birthday=data.get('birthday'),
        province=data.get('province'),
        city=data.get('city'),
        role=role,
        is_admin=True if role == UserRole.ADMIN else False,
        is_active=True,
        verification_code=verification_code,
    )

    send_email_verification(request, user)

    return user


def send_email_verification(request, user):
    noreply_email = os.getenv("NO_REPLY_EMAIL")

    # Set up email metadata
    subject = "Email verification"
    from_email = noreply_email
    to_email = [user.email]

    # Context data to pass into the HTML template
    action_path = reverse('email_verification', query={'verification_code': user.verification_code})
    action_url = request.build_absolute_uri(action_path)
    context = {
        "full_name": user.full_name,
        "action_url": reverse('email_verification', request=request, query={'verification_code': user.verification_code})
    }

    # Render the HTML template into a string string
    html_content = render_to_string("emails/email_verification_template.html", context)

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
