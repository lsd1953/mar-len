import re
from django.contrib.auth import get_user_model  # If used custom user model
from rest_framework import serializers
from backend.core.models import Militantes, Instancias




class InstanciaMilitanteVinculaSerializer(serializers.Serializer):
    instancia = serializers.IntegerField()
    militante = serializers.CharField()


        
    def validate_instancia(self, value):
        if not Instancias.objects.filter(id=value).exists():
            raise serializers.ValidationError(
                'Não existe a instancia informada.'
            )

        return value
    
    def validate_militante(self, value):
        if not Militantes.objects.filter(codigo_unico=value).exists():
            raise serializers.ValidationError(
                'Não existe o militante informado.'
            )

        return value
    
    def validate(self, data):
        if Militantes.objects.get(codigo_unico=data['militante']).instancias.filter(id=data['instancia']).exists():
            raise serializers.ValidationError(
                'Esse militante já pertence a essa instancia.'
            )

        return data

        
    def create(self, validated_data):
        instancia = Instancias.objects.get(id=validated_data['instancia'])
        militante = Militantes.objects.get(codigo_unico=validated_data['militante'])
        militante.instancias.add(instancia)

        return {
                'militante': validated_data['militante'],
                'instancia': validated_data['instancia'],
        }

