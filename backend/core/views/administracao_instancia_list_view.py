from rest_framework.generics import ListCreateAPIView
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response

from backend.core.models import Instancias, Organizacoes, Administradores
from backend.core.serializers import InstanciasSerializer

class AdministracaoInstanciaListView(ListCreateAPIView):
    queryset = Instancias.objects.all()
    serializer_class = InstanciasSerializer
    permission_classes = [IsAuthenticated]

    def list(self, request):
        organizacao_params = self.request.query_params.get('organizacao', None)
        if not organizacao_params:
            serializer = self.get_serializer(Instancias.objects.none() , many=True)
            return Response(serializer.data)

        organizacoes_administra = Administradores.objects.filter(usuario=request.user, organizacao=organizacao_params)
        organizacoes = Organizacoes.objects.none() if organizacoes_administra.count() < 1 else [administra.organizacao for administra in organizacoes_administra]
        instancias = []
        for organizacao in organizacoes:
            organizacao_instancias = Instancias.objects.filter(organizacao=organizacao)
            for instancia in organizacao_instancias:
                instancias.append(instancia)
           
        serializer = self.get_serializer(instancias, many=True)
        return Response(serializer.data)
    