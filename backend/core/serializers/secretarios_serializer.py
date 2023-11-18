from rest_framework import serializers
from backend.core.models import Secretariados
from backend.core.serializers.militantes_serializer import MilitantesSerializer
from backend.core.serializers.funcoes_serializer import FuncoesSerializer



class SecretariadosSerializer(serializers.ModelSerializer):

    militante = MilitantesSerializer()
    funcao = FuncoesSerializer()

    
    class Meta:
        model = Secretariados
        fields = '__all__'