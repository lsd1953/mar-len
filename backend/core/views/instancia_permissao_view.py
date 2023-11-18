from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from django.http import Http404
from rest_framework.permissions import IsAuthenticated


from backend.core.models import Assistentes, Instancias, Secretariados, Militantes


class InstanciaPermissaoView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request, pk, format=None):
        try:
            instancia = Instancias.objects.get(id=pk)
        except Instancias.DoesNotExist:
            raise Http404
        try:
            militante = Militantes.objects.get(usuario=request.user)
        except Militantes.DoesNotExist:
            raise Http404
        
        permissao = {
            'assistente': False,
            'cadastra': False,
            'financeiro': False
        }

        permissao['assistente'] = Assistentes.objects.filter(instancia=instancia, militante=militante).exists()
        permissao['cadastra'] = Secretariados.objects.filter(instancia=instancia, militante=militante, funcao__cadastra=True).exists()
        permissao['financeiro'] = Secretariados.objects.filter(instancia=instancia, militante=militante, funcao__financeiro=True).exists()

        return Response(permissao, status=status.HTTP_200_OK)
