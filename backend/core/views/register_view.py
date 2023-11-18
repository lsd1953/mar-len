from django.contrib.auth import get_user_model  # If used custom user model
from rest_framework import permissions, status
from rest_framework.response import Response
from rest_framework.views import APIView

from backend.core.serializers import UserRegisterSerializer


class RegisterView(APIView):

    model = get_user_model()
    permission_classes = [permissions.AllowAny] 
    serializer_class = UserRegisterSerializer

    def post(self, request, format='json'):
        serializer = UserRegisterSerializer(data=request.data)

        try:
            if serializer.is_valid():
                serializer.save()
                return Response(
                    serializer.data, status=status.HTTP_201_CREATED
                )
            else:
                return Response(
                    serializer.errors, status=status.HTTP_400_BAD_REQUEST
                )
        except Exception as e:
            return Response(e.args, status=status.HTTP_400_BAD_REQUEST)