from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import IsAuthenticated

from backend.core.serializers import FuncoesVinculaSerializer


class AdministracaoFuncoesVinculaView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request, format=None):
        serializer = FuncoesVinculaSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
