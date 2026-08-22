from rest_framework.decorators import api_view
from rest_framework.request import Request
from rest_framework.response import Response
from rest_framework import status

from sewa.models.user import User


@api_view(['GET'])
def email_verification_view(request: Request):
    verification_code = request.GET.get("verification_code")

    if verification_code is None or verification_code == '':
        return Response(
            {"error": "Verification is required"},
            status=status.HTTP_400_BAD_REQUEST,
        )

    user = User.objects.filter(verification_code=verification_code).first()

    if user is None:
        return Response(
            {"error": "Verification code incorrect"},
            status=status.HTTP_400_BAD_REQUEST,
        )

    user.is_verified = True
    user.verification_code = None
    user.save()

    return Response({"status": "success"})
