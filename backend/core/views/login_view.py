from django.contrib.auth import authenticate
from django.contrib.auth.models import update_last_login

from rest_framework import status
from rest_framework.permissions import AllowAny
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework_simplejwt.tokens import RefreshToken

from backend.core.serializers import UserSerializer


class LoginView(APIView):
    # ignora a permissão
    permission_classes = (AllowAny,)

    def _valid_json(self, data):
        fields = data.keys()
        if 'email' not in fields or 'senha' not in fields:
            return True, 'Invalid json.'

        return False, ''

    def _access_api(self, data):
        email = data['email']
        password = data['senha']
        user = authenticate(username=email, password=password)
        if not user or not user.is_active:
            return None, True, 'Invalid login. Try another login or password'
        else:
            return user, False, ''

    def post(self, request, format='json'):

        error, mens = self._valid_json(request.data)

        if error:
            return Response(
                data={'detail': mens}, status=status.HTTP_400_BAD_REQUEST
            )
        else:
            user, error, mens = self._access_api(request.data)
            if error:
                return Response(
                    data={'detail': mens}, status=status.HTTP_400_BAD_REQUEST
                )
            else:
                serializer = UserSerializer(user)

                refresh = RefreshToken.for_user(user)
                update_last_login(None, user)
                return Response(
                    data={
                        'user': serializer.data,
                        'token': str(refresh.access_token),
                    },
                    status=status.HTTP_200_OK,
                )