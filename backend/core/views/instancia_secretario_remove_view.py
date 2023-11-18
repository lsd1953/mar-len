from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import IsAuthenticated

from backend.core.serializers import InstanciaSecretarioRemoveSerializer


class InstanciaSecretarioRemoveView(APIView):

    permission_classes = [IsAuthenticated]    

    def post(self, request, format=None):
        serializer = InstanciaSecretarioRemoveSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(status=status.HTTP_204_NO_CONTENT)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        