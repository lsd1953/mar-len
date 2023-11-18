from rest_framework import serializers
from backend.core.models import Assistentes
from backend.core.serializers.militantes_serializer import MilitantesSerializer
from backend.core.serializers.funcoes_serializer import FuncoesSerializer



class AssistentesSerializer(serializers.ModelSerializer):

    militante = MilitantesSerializer()
    
    class Meta:
        model = Assistentes
        fields = '__all__'