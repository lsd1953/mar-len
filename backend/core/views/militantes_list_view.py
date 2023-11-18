from rest_framework.generics import ListCreateAPIView
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response

from backend.core.models import Militantes, Instancias
from backend.core.serializers import MilitantesSerializer

class MilitantesListView(ListCreateAPIView):
    queryset = Instancias.objects.all()
    serializer_class = MilitantesSerializer
    permission_classes = [IsAuthenticated]

    def list(self, request):
        instancia_parans = self.request.query_params.get('instancia', None)
        if not instancia_parans:
            militantes = Militantes.objects.none()
        else:       
            try:
                instancia = Instancias.objects.get(id = instancia_parans)
                militantes = instancia.militantes.all()
            except Instancias.DoesNotExist:
                militantes = Militantes.objects.none()

        serializer = self.get_serializer(militantes, many=True)
        return Response(serializer.data)
    