from rest_framework import serializers
from backend.core.models import DadosMilitantes



class DadosMilitanteSerializer(serializers.ModelSerializer):

    apelido = serializers.SerializerMethodField()

    def get_apelido(self, obj):
        return obj.militante.apelido
    
    class Meta:
        model = DadosMilitantes
        fields = '__all__'