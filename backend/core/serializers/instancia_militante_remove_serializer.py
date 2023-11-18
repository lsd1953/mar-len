import re
from django.contrib.auth import get_user_model  # If used custom user model
from rest_framework import serializers
from backend.core.models import Militantes, Instancias




class InstanciaMilitanteRemoveSerializer(serializers.Serializer):
    instancia = serializers.IntegerField()
    militante = serializers.IntegerField()


        
    def validate_instancia(self, value):
        if not Instancias.objects.filter(id=value).exists():
            raise serializers.ValidationError(
                'Não existe a instancia informada.'
            )

        return value
    
    def validate_militante(self, value):
        if not Militantes.objects.filter(id=value).exists():
            raise serializers.ValidationError(
                'Não existe o militante informado.'
            )

        return value
    
    def validate(self, data):
        if not Militantes.objects.get(id=data['militante']).instancias.filter(id=data['instancia']).exists():
            raise serializers.ValidationError(
                'Esse militante não pertence a essa instancia.'
            )

        return data

        
    def create(self, validated_data):
        instancia = Instancias.objects.get(id=validated_data['instancia'])
        militante = Militantes.objects.get(id=validated_data['militante'])
        militante.instancias.remove(instancia)
        if not militante.usuario and militante.instancias.all().count() == 0:
            militante.delete()

        return {
                'militante': validated_data['militante'],
                'instancia': validated_data['instancia'],
        }

