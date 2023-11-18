from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from django.http import Http404
from rest_framework.permissions import IsAuthenticated

from backend.core.models import Convites, Instancias
from backend.core.serializers import ConvitesSerializer, InstanciaConviteSerializer


class InstanciaConviteView(APIView):
    permission_classes = [IsAuthenticated]
    
    def get(self, request, pk, format=None):
        try:
            instancia = Instancias.objects.get(id=pk)
        except Instancias.DoesNotExist:
            raise Http404
        
        try:
            convite = Convites.objects.get(instancia=instancia)
            if not convite.valido:
                convite.delete()
                convite = Convites(instancia=instancia)
                convite.save()    

        except Convites.DoesNotExist:
            convite = Convites(instancia=instancia)
            convite.save()

        serializer = ConvitesSerializer(convite)
        return Response(serializer.data)

    
    def post(self, request, format=None):
        if request.user.militante:
            request.data['militante'] = request.user.militante.id
        serializer = InstanciaConviteSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
