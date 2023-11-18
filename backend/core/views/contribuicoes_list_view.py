from rest_framework.generics import ListCreateAPIView
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response

from backend.core.models import Contribuicoes, Instancias, Organizacoes, Administradores
from backend.core.serializers import ContribuicoesSerializer

class ContribuicoesListView(ListCreateAPIView):
    queryset = Contribuicoes.objects.all()
    serializer_class = ContribuicoesSerializer
    permission_classes = [IsAuthenticated]

    def list(self, request):
        instancia_params = self.request.query_params.get('instancia', None)
        if not instancia_params:
            serializer = self.get_serializer(Contribuicoes.objects.none() , many=True)
            return Response(serializer.data)

        contribuicoes = Contribuicoes.objects.filter(militante__usuario=request.user, instancia__id=instancia_params)
           
        serializer = self.get_serializer(contribuicoes, many=True)
        return Response(serializer.data)
    