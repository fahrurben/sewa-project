from django.conf import settings
from rest_framework_simplejwt.authentication import JWTAuthentication


class JWTCookieAuthentication(JWTAuthentication):
    def authenticate(self, request):
        # Extract the access token from the cookie
        raw_token = request.COOKIES.get(settings.SIMPLE_JWT.get('AUTH_COOKIE', 'access_token'))

        if raw_token is None:
            return None

        # Validate the token using SimpleJWT's native mechanism
        validated_token = self.get_validated_token(raw_token)
        return self.get_user(validated_token), validated_token