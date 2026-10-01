from django.conf import settings
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.request import Request
from rest_framework.response import Response


@api_view(['POST'])
@permission_classes([IsAuthenticated])
def logout_view(request: Request):
    is_secure = True if not settings.DEBUG else False

    response = Response()

    response.delete_cookie(
        key="access_token",
        samesite="Lax"  # CSRF protection
    )

    # Store refresh token in secure cookie
    response.delete_cookie(
        key="refresh_token",
        samesite="Lax"
    )

    response.data = {
        "message": "Logout successful",
    }

    return response
