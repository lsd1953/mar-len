from rest_framework.generics import ListCreateAPIView
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response

from backend.core.models import Organizacoes, Administradores
from backend.core.serializers import OrganizacoesSerializer

class AdministracaoOrganizacaoListView(ListCreateAPIView):
    serializer_class = OrganizacoesSerializer
    permission_classes = [IsAuthenticated]

    def list(self, request):
        organizacoes_administra = Administradores.objects.filter(usuario=request.user)
        organizacoes = Organizacoes.objects.none() if organizacoes_administra.count() < 1 else [administra.organizacao for administra in organizacoes_administra]
            
        serializer = self.get_serializer(organizacoes, many=True)
        return Response(serializer.data)