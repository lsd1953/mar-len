from rest_framework import serializers
from backend.core.models import RecrutamentosAcoes



class RecrutamentosAcoesSerializer(serializers.ModelSerializer):
    
    class Meta:
        model = RecrutamentosAcoes
        fields = '__all__'