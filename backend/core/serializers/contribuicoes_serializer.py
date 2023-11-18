from rest_framework import serializers
from backend.core.models import Contribuicoes



class ContribuicoesSerializer(serializers.ModelSerializer):

    referencia_texto = serializers.SerializerMethodField(read_only=True)

    def get_referencia_texto(self, obj):
        return obj.get_referencia_display()

    class Meta:
        model = Contribuicoes
        fields = '__all__'