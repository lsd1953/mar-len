from rest_framework.generics import ListCreateAPIView
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response

from backend.core.models import Secretariados, Instancias
from backend.core.serializers import SecretariadosSerializer

class SecretariosListView(ListCreateAPIView):
    queryset = Secretariados.objects.all()
    serializer_class = SecretariadosSerializer
    permission_classes = [IsAuthenticated]

    def list(self, request):
        instancia_parans = self.request.query_params.get('instancia', None)
        if not instancia_parans:
            secretariado = Secretariados.objects.none()
        else:       
            try:
                instancia = Instancias.objects.get(id = instancia_parans)
                secretariado = instancia.secretariado.all()
            except Instancias.DoesNotExist:
                secretariado = Instancias.objects.none()

        serializer = self.get_serializer(secretariado, many=True)
        return Response(serializer.data)
    