from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import IsAuthenticated

from backend.core.serializers import InstanciaRecrutamentosAcaoSerializer, RecrutamentosAcoesSerializer
from backend.core.models import RecrutamentosAcoes, Recrutamentos, Instancias


class InstanciaRecrutamentosAcaoView(APIView):

    permission_classes = [IsAuthenticated]

    def post(self, request, format=None):
        serializer = InstanciaRecrutamentosAcaoSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def get(self, request, format='json'):
        instancia_param = request.query_params.get('instancia')
        recrutando_param = request.query_params.get('recrutando')
        try:
            instancia = Instancias.objects.get(id=instancia_param)
        except Instancias.DoesNotExist:
            raise Http404
        
        try:
            recrutando = Recrutamentos.objects.get(id=recrutando_param, instancia_recrutando=instancia)
        except Recrutamentos.DoesNotExist:
            raise Http404
        
        try:
            acoes = RecrutamentosAcoes.objects.filter(recrutamento=recrutando).order_by('-data')
        except RecrutamentosAcoes.DoesNotExist:
            acoes = RecrutamentosAcoes.objects.none()

        serializer = RecrutamentosAcoesSerializer(acoes, many=True)
        return Response(serializer.data)