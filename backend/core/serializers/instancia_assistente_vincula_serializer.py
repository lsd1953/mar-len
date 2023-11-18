import re
from django.contrib.auth import get_user_model  # If used custom user model
from rest_framework import serializers
from backend.core.models import Militantes, Instancias, Assistentes




class InstanciaAssistenteVinculaSerializer(serializers.Serializer):
    instancia = serializers.IntegerField()
    assistente = serializers.CharField()


        
    def validate_instancia(self, value):
        if not Instancias.objects.filter(id=value).exists():
            raise serializers.ValidationError(
                'Não existe a instancia informada.'
            )

        return value
    
    def validate_assistente(self, value):
        if not Militantes.objects.filter(id=value).exists():
            raise serializers.ValidationError(
                'Não existe o militante informado como assistente.'
            )

        return value
    
    def validate(self, data):
        if Assistentes.objects.filter(militante=data['assistente'],instancia=data['instancia']).exists():
            raise serializers.ValidationError(
                'Esse militante já é assistente nessa instancia.'
            )

        return data

        
    def create(self, validated_data):
        instancia = Instancias.objects.get(id=validated_data['instancia'])
        militante = Militantes.objects.get(id=validated_data['assistente'])
        assistencia = Assistentes()
        assistencia.militante = militante
        assistencia.instancia = instancia
        assistencia.save()

        return {
                'assistente': validated_data['assistente'],
                'instancia': validated_data['instancia'],
        }

