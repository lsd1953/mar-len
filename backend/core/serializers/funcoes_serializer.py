from rest_framework import serializers
from backend.core.models import Funcoes



class FuncoesSerializer(serializers.ModelSerializer):


    class Meta:
        model = Funcoes
        fields = '__all__'