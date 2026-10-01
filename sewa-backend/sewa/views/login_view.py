from django.conf import settings
from rest_framework_simplejwt.views import TokenObtainPairView

from sewa.models import User


class CookieTokenObtainPairView(TokenObtainPairView):

    def post(self, request, *args, **kwargs):
        # Generate tokens like normal
        response = super().post(request, *args, **kwargs)

        is_secure = True if not settings.DEBUG else False

        # Extract tokens from response
        access_token = response.data.get("access")
        refresh_token = response.data.get("refresh")

        # Get user data
        user = User.objects.get(email=request.data["email"])

        # Replace response data (remove tokens, add user info)
        response.data = {
            "message": "Login successful",
            "user": {
                "id": user.id,
                "email": user.email,
                "first_name": user.first_name,
                "last_name": user.last_name,
                "full_name": user.full_name,
                "role": user.role,
            }
        }

        # Store access token in secure cookie
        response.set_cookie(
            key="access_token",
            value=access_token,
            httponly=True,  # JavaScript can't access
            secure=is_secure,  # True in production (HTTPS only)
            samesite="Lax"  # CSRF protection
        )

        # Store refresh token in secure cookie
        response.set_cookie(
            key="refresh_token",
            value=refresh_token,
            httponly=True,
            secure=is_secure,  # True in production
            samesite="Lax"
        )

        return response
