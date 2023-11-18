from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from django.http import Http404
from rest_framework import status

from backend.core.models import DadosMilitantes, Militantes
from backend.core.serializers import DadosMilitanteSerializer


class DadosMilitantesDetailView(APIView):
    permission_classes = [IsAuthenticated]
    queryset = DadosMilitantes.objects.all()
    serializer_class = DadosMilitanteSerializer

    def get_object(self, user) :
        try:
            dados_militante = DadosMilitantes.objects.get(militante__usuario=user)
            return dados_militante
        except DadosMilitantes.DoesNotExist:
            raise Http404
        
    def get(self, request, format=None):
        snippet = self.get_object(request.user)
        serializer = DadosMilitanteSerializer(snippet)
        return Response(serializer.data)
    
    def put(self, request, format=None):
        try:
            militante = Militantes.objects.get(usuario=request.user)
        except Militantes.DoesNotExist:
            raise Http404
        try:
            dados_militante = DadosMilitantes.objects.get(militante=militante)
        except DadosMilitantes.DoesNotExist:
            dados_militante = DadosMilitantes(militante=militante)
            dados_militante.save()

        request.data['militante'] = militante.id

        
            
        serializer = DadosMilitanteSerializer(dados_militante, request.data)
        if serializer.is_valid():
            apelido = request.data.get('apelido', None)
            if apelido:
                militante.apelido = apelido
                militante.save()
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)