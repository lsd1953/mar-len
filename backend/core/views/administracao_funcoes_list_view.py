from rest_framework.generics import ListCreateAPIView
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response

from backend.core.models import Funcoes, Organizacoes, Administradores
from backend.core.serializers import FuncoesSerializer

class AdministracaoFuncoesListView(ListCreateAPIView):
    queryset = Funcoes.objects.all()
    serializer_class = FuncoesSerializer
    permission_classes = [IsAuthenticated]

    def list(self, request):
        organizacao_params = self.request.query_params.get('organizacao', None)
        if not organizacao_params:
            serializer = self.get_serializer(Funcoes.objects.none() , many=True)
            return Response(serializer.data)

        organizacoes_administra = Administradores.objects.filter(usuario=request.user, organizacao=organizacao_params)
        organizacoes = Organizacoes.objects.none() if organizacoes_administra.count() < 1 else [administra.organizacao for administra in organizacoes_administra]
        funcoes = []
        for organizacao in organizacoes:
            organizacao_funcoes = Funcoes.objects.filter(organizacao=organizacao)
            for funcao in organizacao_funcoes:
                funcoes.append(funcao)
           
        serializer = self.get_serializer(funcoes, many=True)
        return Response(serializer.data)
    