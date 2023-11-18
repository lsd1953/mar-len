import re
from django.contrib.auth import get_user_model  # If used custom user model
from rest_framework import serializers
from backend.core.models import Militantes, Organizacoes, Instancias




class InstanciaVinculaSerializer(serializers.Serializer):
    organizacao = serializers.IntegerField()
    instancia = serializers.IntegerField()
    militante = serializers.CharField()


    def validate_organizacao(self, value):
        if not Organizacoes.objects.filter(id=value).exists():
            raise serializers.ValidationError(
                'Não existe a organização informada.'
            )

        return value
    
    def validate_militante(self, value):
        if not Militantes.objects.filter(codigo_unico=value).exists():
            raise serializers.ValidationError(
                'Não existe o militante informado.'
            )

        return value
    
    def validate(self, data):

        if not Instancias.objects.filter(id=data['instancia'], organizacao__id=data['organizacao']).exists():
            raise serializers.ValidationError(
                'Não existe a instancia informada.'
            )

        return data
    
    def create(self, validated_data):

        militante = Militantes.objects.get(codigo_unico=validated_data['militante'])
        instancia = Instancias.objects.get(id=validated_data['instancia'])
        militante.instancias.add(instancia)

        return {
                'organizacao': validated_data['organizacao'],
                'instancia': validated_data['instancia'],
                'militante': validated_data['militante']
        }

