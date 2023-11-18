from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import IsAuthenticated

from backend.core.serializers import InstanciaRecrutamentosAlteraSerializer


class InstanciaRecrutamentosAlteraView(APIView):

    permission_classes = [IsAuthenticated]

    def put(self, request, format=None):
        serializer = InstanciaRecrutamentosAlteraSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        