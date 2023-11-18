from rest_framework.generics import ListCreateAPIView
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response

from backend.core.models import Assistentes, Instancias
from backend.core.serializers import AssistentesSerializer

class AssistentesListView(ListCreateAPIView):
    queryset = Assistentes.objects.all()
    serializer_class = AssistentesSerializer
    permission_classes = [IsAuthenticated]

    def list(self, request):
        instancia_parans = self.request.query_params.get('instancia', None)
        if not instancia_parans:
            assistentes = Assistentes.objects.none()
        else:       
            try:
                instancia = Instancias.objects.get(id = instancia_parans)
                assistentes = instancia.assistentes.all()
            except Instancias.DoesNotExist:
                secretariado = Instancias.objects.none()

        serializer = self.get_serializer(assistentes, many=True)
        return Response(serializer.data)
    