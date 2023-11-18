from rest_framework.generics import ListCreateAPIView
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response

from backend.core.models import Militantes, Instancias, Recrutamentos
from backend.core.serializers import RecrutamentosSerializer

class InstanciaRecrutamentosListView(ListCreateAPIView):
    queryset = Recrutamentos.objects.all()
    serializer_class = RecrutamentosSerializer
    permission_classes = [IsAuthenticated]

    def list(self, request):
        instancia_parans = self.request.query_params.get('instancia', None)
        if not instancia_parans:
            militantes = Recrutamentos.objects.none()
        else:       
            try:
                instancia = Instancias.objects.get(id = instancia_parans)
                recrutamentos = instancia.recrutamentos.all()
            except Instancias.DoesNotExist:
                militantes = Recrutamentos.objects.none()

        serializer = self.get_serializer(recrutamentos, many=True)
        return Response(serializer.data)
    