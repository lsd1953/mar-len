from django.middleware.csrf import get_token
from rest_framework import status
from rest_framework.permissions import AllowAny
from rest_framework.response import Response
from rest_framework.views import APIView


class CSRFView(APIView):
    permission_classes = (AllowAny,)

    def get(self, request):
        return Response(
            {'csrfToken': get_token(request)}, status=status.HTTP_200_OK
        )
