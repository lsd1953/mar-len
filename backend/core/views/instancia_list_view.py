from rest_framework.generics import ListCreateAPIView
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response

from backend.core.models import Militantes, Instancias, Organizacoes, Assistentes
from backend.core.serializers import InstanciasSerializer

class InstanciaListView(ListCreateAPIView):
    queryset = Instancias.objects.all()
    serializer_class = InstanciasSerializer
    permission_classes = [IsAuthenticated]

    def list(self, request):
        
        try:
            militante = Militantes.objects.get(usuario=request.user)
            superior_parans = self.request.query_params.get('superior', None)
            if not superior_parans:
                assistente = self.request.query_params.get('assistente', None)
               
                if not assistente:
                    instancias = militante.instancias.all()
                else:
                    try:
                        assistencias = Assistentes.objects.filter(militante=militante)
                        instancias = []
                        for assistente in assistencias:
                            instancias.append(assistente.instancia)
                    except Assistentes.DoesNotExist:
                        instancias = Instancias.objects.none()                     
            else:  
                organizacao_parans = self.request.query_params.get('organizacao', None)
                try:
                    organizacao = Organizacoes.objects.get(id=organizacao_parans)
                    instancias = Instancias.objects.filter(organizacao=organizacao, superior=superior_parans)
                except Organizacoes.DoesNotExist:
                    instancias = Instancias.objects.none() 

        except Militantes.DoesNotExist:
            instancias = Instancias.objects.none() 
        

        serializer = self.get_serializer(instancias, many=True)
        return Response(serializer.data)
    