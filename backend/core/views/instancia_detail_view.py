from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from django.http import Http404

from backend.core.models import Instancias, Militantes, Assistentes
from backend.core.serializers import InstanciasSerializer


class InstanciaDetailView(APIView):
    permission_classes = [IsAuthenticated]
    queryset = Instancias.objects.all()
    serializer_class = InstanciasSerializer

    def get_object_assistente(self, pk, user) :
        try:
            militante = Militantes.objects.get(usuario=user)
            assistente = Assistentes.objects.get(militante=militante, instancia__id=pk)
            return assistente.instancia
        except Assistentes.DoesNotExist:
            return None
        except Militantes.DoesNotExist:
            return None
    def get_object(self, pk, user) :
        try:
            militante = Militantes.objects.get(usuario=user)
            return militante.instancias.get(pk=pk)
        except Instancias.DoesNotExist:
            raise Http404
        except Militantes.DoesNotExist:
            raise Http404
        
    def get(self, request, pk, format=None):
        snippet = self.get_object_assistente(pk, request.user)
        if not snippet:
            snippet = self.get_object(pk, request.user)
        serializer = InstanciasSerializer(snippet)
        return Response(serializer.data)