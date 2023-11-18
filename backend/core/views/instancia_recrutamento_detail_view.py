from django.contrib.auth import get_user_model  # If used custom user model
from rest_framework import permissions, status
from django.http import Http404
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated

from backend.core.serializers import RecrutamentosSerializer
from backend.core.models import Recrutamentos, Instancias

class InstanciaRecrutamentoDetailView(APIView):

    permission_classes = [IsAuthenticated]
    queryset = Recrutamentos.objects.all()


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
        
        serializer = RecrutamentosSerializer(recrutando)
        return Response(serializer.data)