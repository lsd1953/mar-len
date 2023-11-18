import re
from django.contrib.auth import get_user_model  # If used custom user model
from rest_framework import serializers
from backend.core.models import Recrutamentos, Instancias, RecrutamentosAcoes




class InstanciaRecrutamentosAcaoSerializer(serializers.Serializer):
    instancia = serializers.IntegerField()
    recrutamento = serializers.IntegerField()
    descricao = serializers.CharField()
    tipo = serializers.CharField()
    data = serializers.DateField()
       
    def validate_instancia(self, value):
        if not Instancias.objects.filter(id=value).exists():
            raise serializers.ValidationError(
                'Não existe a instancia informada.'
            )

        return value
    
    def validate_recrutamento(self, value):
        if not Recrutamentos.objects.filter(id=value).exists():
            raise serializers.ValidationError(
                'Não existe o recrutamento informada.'
            )

        return value

    def validate(self, data):
        """
        Check that start is before finish.
        """
        if not Recrutamentos.objects.filter(id=data['recrutamento'], instancia_recrutando_id=data['instancia']).exists():
            raise serializers.ValidationError('Não existe o recrutamento informada.')
        return data
    
    def create(self, validated_data):

        recrutamento = Recrutamentos.objects.get(id=validated_data['recrutamento'], instancia_recrutando_id=validated_data['instancia'])
        acao = RecrutamentosAcoes()
        acao.recrutamento = recrutamento

        acao.descricao = validated_data['descricao']
        acao.tipo = validated_data['tipo']
        acao.data = validated_data['data']

        acao.save()

        return {
                'instancia': validated_data['instancia'],
                'recrutamento': validated_data['recrutamento'],
                'descricao': validated_data['descricao'],
                'tipo': validated_data['tipo'],
                'data': validated_data['data'],
        }
